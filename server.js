const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Database connectie
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kiosk_database",
});

// Test route
app.get("/", (req, res) => {
  res.send("API werkt!");
});

// Producten ophalen
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.json(results);
    }
  });
});

app.listen(3000, () => {
  console.log("Server draait op http://localhost:3000");
});
