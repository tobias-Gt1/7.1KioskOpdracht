const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Database connectie
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kiosk_database' 
});

// Test route
app.get('/', (req, res) => {
  res.send('API werkt!');
});

async function tableExists(connection, tableName) {
  const [rows] = await connection.query('SHOW TABLES LIKE ?', [tableName]);
  return rows.length > 0;
}

async function tableColumns(connection, tableName) {
  const [rows] = await connection.query(`SHOW COLUMNS FROM ${tableName}`);
  return rows.map((row) => row.Field);
}

function firstAvailable(columns, candidates) {
  return candidates.find((name) => columns.includes(name)) || null;
}

async function buildProductsQuery(connection) {
  const productsColumns = await tableColumns(connection, 'products');
  const hasImages = await tableExists(connection, 'images');
  const hasCategories = await tableExists(connection, 'categories');

  const selects = ['p.*'];
  const joins = [];

  if (hasCategories) {
    const categoriesColumns = await tableColumns(connection, 'categories');
    const categoryIdColumn = firstAvailable(categoriesColumns, ['category_id', 'id']);
    const categoryNameColumn = firstAvailable(categoriesColumns, ['name', 'category_name', 'title']);

    if (productsColumns.includes('category_id') && categoryIdColumn && categoryNameColumn) {
      joins.push(`LEFT JOIN categories c ON c.${categoryIdColumn} = p.category_id`);
      selects.push(`c.${categoryNameColumn} AS category_name`);
    }
  }

  if (hasImages) {
    const imagesColumns = await tableColumns(connection, 'images');
    const productsImageIdColumn = firstAvailable(productsColumns, ['image_id', 'imageId']);
    const imageIdColumn = firstAvailable(imagesColumns, ['image_id', 'id']);

    if (productsImageIdColumn && imageIdColumn) {
      joins.push(`LEFT JOIN images i ON i.${imageIdColumn} = p.${productsImageIdColumn}`);

      const absoluteUrlColumn = firstAvailable(imagesColumns, ['image_url', 'url', 'path', 'file_path']);
      const fileNameColumn = firstAvailable(imagesColumns, ['file_name', 'filename', 'name']);

      if (absoluteUrlColumn) {
        selects.push(`i.${absoluteUrlColumn} AS image_url`);
      } else if (fileNameColumn) {
        selects.push(`CONCAT('/assets/', i.${fileNameColumn}) AS image_url`);
      }
    }
  }

  if (!selects.some((part) => part.includes('AS image_url'))) {
    selects.push('NULL AS image_url');
  }

  return `SELECT ${selects.join(', ')} FROM products p ${joins.join(' ')}`;
}

// Producten ophalen
app.get('/products', async (req, res) => {
  try {
    const connection = db.promise();
    const sql = await buildProductsQuery(connection);
    const [results] = await connection.query(sql);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Kon producten niet ophalen',
      details: err.message
    });
  }
});

app.listen(3000, () => {
  console.log('Server draait op http://localhost:3000');
});