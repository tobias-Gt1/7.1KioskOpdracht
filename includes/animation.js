// Animation for the start screen under the logo
// Uses GSAP + PixiJS; avoids GSAP premium plugins by custom splitting

(function () {
  // Helpers
  const select = (e) => document.querySelector(e);
  const stage = select(".stage");
  const actionsEl = document.querySelector(".actions");

  // Register GSAP Pixi plugin
  gsap.registerPlugin(PixiPlugin);

  // Create PIXI app (white background to match kiosk theme)
  const app = new PIXI.Application({
    width: 0,
    height: 0,
    backgroundAlpha: 0, // transparent canvas so only circles are visible
    antialias: true,
  });

  let tl = null;
  const circD = 44; // circle diameter (smaller)
  const circOffsetX = 0.11111; // circle2/3 x offset
  const circOffsetY = 0.15873; // circle2/3 y offset
  // Accent colors matching kiosk palette
  const color1 = 0xff7520; // Orange
  const color2 = 0xffb181; // LightOrange
  const color3 = 0xdeff78; // LightGreen
  const animDuration = 2.0; // slower breathing

  function initPixi() {
    gsap.set(stage, { autoAlpha: 1 });
    stage.appendChild(app.view);
    // Ensure canvas fills stage container
    Object.assign(app.view.style, {
      display: "block",
      width: "100%",
      height: "100%",
    });

    // Stop Pixi ticker; drive via GSAP
    app.ticker.stop();
    gsap.ticker.add(() => {
      app.ticker.update();
    });
  }

  function buildGrid(cols, rows) {
    app.stage.removeChildren();
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const container = new PIXI.Container();
        const circContainer1 = new PIXI.Container();
        const circContainer2 = new PIXI.Container();
        const circContainer3 = new PIXI.Container();

        const circle1 = new PIXI.Graphics();
        circle1
          .beginFill(color1, 1)
          .drawCircle(0, 0, circD / 2)
          .endFill();
        circle1.blendMode = PIXI.BLEND_MODES.MULTIPLY;
        circContainer1.addChild(circle1);
        circContainer1.x = 0;
        circContainer1.y = 0;
        container.addChild(circContainer1);

        const circle2 = new PIXI.Graphics();
        circle2
          .beginFill(color2, 1)
          .drawCircle(0, 0, circD / 2)
          .endFill();
        circle2.blendMode = PIXI.BLEND_MODES.MULTIPLY;
        circContainer2.addChild(circle2);
        circContainer2.x = -circOffsetX * circD;
        circContainer2.y = circOffsetY * circD;
        container.addChild(circContainer2);

        const circle3 = new PIXI.Graphics();
        circle3
          .beginFill(color3, 1)
          .drawCircle(0, 0, circD / 2)
          .endFill();
        circle3.blendMode = PIXI.BLEND_MODES.MULTIPLY;
        circContainer3.addChild(circle3);
        circContainer3.x = circOffsetX * circD;
        circContainer3.y = circOffsetY * circD;
        container.addChild(circContainer3);

        app.stage.addChild(container);

        // Position the 3-circle container
        container.x = i * circD + circD / 2 + i * 2;
        container.y = j * circD + circD / 2 + j * 2;
      }
    }
    app.stage.x = 2;
  }

  function animate(cols, rows) {
    if (tl) tl.kill();
    tl = gsap.timeline({ delay: 0.2 });

    // Grid appear + breathing
    tl.from(app.stage.children, {
      pixi: { scale: 0, rotation: 360 },
      duration: 3,
      ease: "power4",
      stagger: {
        each: 0.12,
        grid: [cols, rows],
        from: [0, 1],
      },
    }).to(
      app.stage.children,
      {
        duration: animDuration,
        ease: "sine.inOut",
        stagger: {
          each: 0.12,
          repeat: -1,
          yoyo: true,
          grid: [cols, rows],
          from: [0, 1],
          onStart: function () {
            gsap.to(this.targets()[0].children, {
              pixi: { scale: 0.12 },
              duration: animDuration,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          },
        },
      },
      0.1,
    );
  }

  function sizeAndRender() {
    const w = window.innerWidth;
    const h = Math.max(200, window.innerHeight);
    // Resize stage container and renderer
    stage.style.height = h + "px";
    app.renderer.resize(w, h);

    // Compute dynamic grid size to fill the canvas
    const cell = circD + 2; // include spacing
    const cols = Math.ceil(w / cell);
    const rows = Math.ceil(h / cell);
    buildGrid(cols, rows);
    animate(cols, rows);
  }

  window.addEventListener("resize", sizeAndRender);
  window.addEventListener("load", () => {
    initPixi();
    sizeAndRender();
  });
})();
