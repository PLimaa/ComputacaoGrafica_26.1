let angleY = 0;
let angleX = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let isDragging = false;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}

function mousePressed() {
  isDragging = true;
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

function mouseReleased() {
  isDragging = false;
}

function mouseDragged() {
  if (isDragging) {
    angleY += (mouseX - lastMouseX) * 0.01;
    angleX += (mouseY - lastMouseY) * 0.01;
    angleX = constrain(angleX, -0.6, 0.6);
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    redraw();
  }
}

function draw() {
  // Céu
  background(135, 206, 235);

  // Luzes
  ambientLight(80, 80, 80);
  directionalLight(255, 240, 200, -0.5, -1, -0.5);
  pointLight(255, 220, 150, 200, -100, 200);

  // Rotação pelo mouse
  rotateX(angleX);
  rotateY(angleY);

  let s = width * 0.001; // escala base proporcional à largura

  // Chão
  drawGround(s);

  // Grama e Flores
  drawGrass(s);

  // Casa
  drawHouse(s);

  // Árvores
  drawTree(-width * 0.225, 0, -width * 0.037, s * 1.0);
  drawTree( width * 0.200, 0, -width * 0.025, s * 1.2);
  drawTree(-width * 0.175, 0,  width * 0.100, s * 0.85);
  drawTree( width * 0.250, 0,  width * 0.075, s * 0.95);
  drawTree(-width * 0.275, 0,  width * 0.125, s * 1.1);

  // Cerca
  drawFence(s);

  // Nuvens
  drawCloud(-width * 0.150, -height * 0.267,  width * 0.062, s * 1.0);
  drawCloud( width * 0.100, -height * 0.300, -width * 0.100, s * 1.2);
  drawCloud( width * 0.250, -height * 0.250,  width * 0.037, s * 0.9);
  drawCloud(-width * 0.312, -height * 0.283, -width * 0.075, s * 1.1);
  drawCloud( width * 0.375, -height * 0.317,  width * 0.125, s * 0.85);

  // Pássaros
  drawBird(-width * 0.100, -height * 0.217,  width * 0.075,  0.4);
  drawBird( width * 0.062, -height * 0.250, -width * 0.050, -0.3);
  drawBird( width * 0.200, -height * 0.200,  width * 0.100,  0.5);
  drawBird(-width * 0.225, -height * 0.233, -width * 0.025, -0.4);

  // Sol
  drawSun(s);
}

// Chão: plano verde com caminho de terra
function drawGround(s) {
  push();
  translate(0, 80 * s, 0);
  rotateX(HALF_PI);

  // Grama
  fill(86, 160, 60);
  noStroke();
  plane(900 * s, 700 * s);

  // Caminho de terra até a porta
  fill(160, 120, 70);
  push();
  translate(0, 30 * s, 0);
  plane(45 * s, 140 * s);
  pop();

  pop();
}

// Grama e flores ao redor da casa
function drawGrass(s) {
  let grassPositions = [
    [-80, 60], [-60, 50], [80, 55], [100, 70],
    [-110, 65], [120, 50], [-90, 80], [90, 80],
    [130, 60], [-130, 55], [60, 65], [-70, 75]
  ];

  // Hastes de grama
  for (let g of grassPositions) {
    push();
    translate(g[0] * s, 80 * s, g[1] * s);
    stroke(60, 140, 40);
    strokeWeight(2);
    noFill();
    for (let i = -1; i <= 1; i++) {
      push();
      translate(i * 4 * s, 0, 0);
      rotateZ(i * 0.2);
      line(0, 0, 0, 0, -12 * s, 0);
      pop();
    }
    pop();
  }

  // Flores coloridas
  let flowerPos = [
    [-95, 80, 30, [255, 80, 120]],
    [ 85, 80, 40, [255, 200, 50]],
    [-70, 80, 90, [180, 100, 255]],
    [110, 80, 55, [255, 80, 120]],
    [-120, 80, 75, [255, 200, 50]],
    [ 60, 80, 72, [100, 200, 255]]
  ];

  for (let f of flowerPos) {
    drawFlower(f[0] * s, f[1] * s, f[2] * s, f[3], s);
  }
}

// Flor com haste e pétalas
function drawFlower(x, y, z, col, s) {
  push();
  translate(x, y, z);

  // Haste
  stroke(60, 140, 40);
  strokeWeight(2);
  line(0, 0, 0, 0, -14 * s, 0);

  // Pétalas
  translate(0, -14 * s, 0);
  noStroke();
  fill(col[0], col[1], col[2]);
  for (let i = 0; i < 5; i++) {
    push();
    rotateY(i * TWO_PI / 5);
    translate(4 * s, 0, 0);
    ellipsoid(3 * s, 2 * s, 1.5 * s);
    pop();
  }

  // Centro amarelo
  fill(255, 220, 50);
  sphere(3 * s);

  pop();
}

// Casa com telhado, janelas, porta e chaminé
function drawHouse(s) {
  push();

  // Fundação
  push();
  translate(0, 76 * s, 0);
  fill(180, 160, 130);
  noStroke();
  box(130 * s, 8 * s, 100 * s);
  pop();

  // Paredes
  push();
  translate(0, 40 * s, 0);
  fill(240, 220, 185);
  noStroke();
  box(130 * s, 80 * s, 100 * s);
  pop();

  // Parede lateral esquerda (sombra)
  push();
  translate(-65 * s, 40 * s, 0);
  rotateY(HALF_PI);
  fill(200, 170, 140);
  noStroke();
  plane(100 * s, 80 * s);
  pop();

  // Parede lateral direita (sombra)
  push();
  translate(65 * s, 40 * s, 0);
  rotateY(HALF_PI);
  fill(210, 180, 150);
  noStroke();
  plane(100 * s, 80 * s);
  pop();

  // Beiral do telhado
  push();
  translate(0, -3 * s, 0);
  fill(160, 60, 40);
  noStroke();
  box(145 * s, 6 * s, 115 * s);
  pop();

  // Telhado frente
  push();
  translate(0, -27 * s, 30 * s);
  rotateX(-0.72);
  fill(180, 70, 50);
  noStroke();
  box(145 * s, 6 * s, 72 * s);
  pop();

  // Telhado trás
  push();
  translate(0, -27 * s, -30 * s);
  rotateX(0.72);
  fill(165, 65, 45);
  noStroke();
  box(145 * s, 6 * s, 72 * s);
  pop();

  // Topo
  push();
  translate(0, -54 * s, 0);
  fill(140, 55, 35);
  noStroke();
  box(145 * s, 6 * s, 6 * s);
  pop();

  // Tampo lateral direito
  push();
  translate(65 * s, 0, 0);
  fill(155, 60, 40);
  noStroke();
  beginShape();
  vertex(0, -3 * s,  57 * s);
  vertex(0, -3 * s, -57 * s);
  vertex(0, -54 * s,  0);
  endShape(CLOSE);
  pop();

  // Tampo lateral esquerdo
  push();
  translate(-65 * s, 0, 0);
  fill(155, 60, 40);
  noStroke();
  beginShape();
  vertex(0, -3 * s,  57 * s);
  vertex(0, -3 * s, -57 * s);
  vertex(0, -54 * s,  0);
  endShape(CLOSE);
  pop();

  // Janelas
  drawWindow(-35 * s, 30 * s,  51 * s, true,  s);
  drawWindow( 35 * s, 30 * s,  51 * s, true,  s);
  drawWindow(-35 * s, 30 * s, -51 * s, false, s);
  drawWindow( 35 * s, 30 * s, -51 * s, false, s);

  // Porta
  drawDoor(s);

  // Chaminé
  drawChimney(s);

  pop();
}

// Janela com moldura, vidro e parapeito
function drawWindow(x, y, z, isFront, s) {
  push();
  translate(x, y, z);

  // Moldura
  fill(200, 175, 140);
  noStroke();
  box(28 * s, 25 * s, 4 * s);

  // Vidro e divisória
  push();
  translate(0, 0, isFront ? 1.5 * s : -1.5 * s);
  fill(150, 210, 240, 200);
  box(22 * s, 20 * s, 1 * s);
  fill(200, 175, 140);
  box(2 * s, 20 * s, 2 * s);
  box(22 * s, 2 * s, 2 * s);
  pop();

  // Parapeito
  push();
  translate(0, 14 * s, isFront ? 5 * s : -5 * s);
  fill(220, 195, 160);
  box(32 * s, 4 * s, 8 * s);
  pop();

  pop();
}

// Porta com divisorias, maçaneta e degrau
function drawDoor(s) {
  push();
  translate(0, 58 * s, 51 * s);

  // Moldura
  fill(120, 80, 40);
  noStroke();
  box(38 * s, 44 * s, 4 * s);

  // Porta
  push();
  translate(0, 0, 1.5 * s);
  fill(100, 65, 30);
  box(32 * s, 40 * s, 2 * s);

  // Divisorias
  fill(85, 55, 25);
  push(); translate(0, -8 * s, 1 * s); box(26 * s, 10 * s, 1 * s); pop();
  push(); translate(0,  8 * s, 1 * s); box(26 * s, 10 * s, 1 * s); pop();
  pop();

  // Maçaneta
  push();
  translate(12 * s, 0, 4 * s);
  fill(220, 180, 50);
  sphere(3 * s);
  pop();


  pop();
}

// Chaminé 
function drawChimney(s) {
  push();
  translate(40 * s, -55 * s, -20 * s);

  // Corpo
  fill(160, 80, 60);
  noStroke();
  box(22 * s, 40 * s, 22 * s);

  // Topo
  push();
  translate(0, -23 * s, 0);
  fill(130, 65, 50);
  box(28 * s, 6 * s, 28 * s);
  pop();

  // Fumaça
  fill(210, 210, 210, 160);
  push(); translate(0, -38 * s, 0); sphere(8 * s); pop();
  fill(210, 210, 210, 110);
  push(); translate(5 * s, -55 * s, 0); sphere(11 * s); pop();
  fill(210, 210, 210, 70);
  push(); translate(-4 * s, -72 * s, 0); sphere(14 * s); pop();

  pop();
}

// Árvore com tronco, 3 camadas de copa e frutas
function drawTree(x, y, z, sc) {
  push();
  translate(x, 80 * sc, z);

  // Tronco
  push();
  translate(0, -30 * sc, 0);
  fill(100, 65, 30);
  noStroke();
  cylinder(8 * sc, 60 * sc);
  pop();

  // Copa inferior
  push();
  translate(0, -60 * sc - 15 * sc, 0);
  rotateX(PI);
  fill(40, 130, 50);
  noStroke();
  cone(38 * sc, 40 * sc);
  pop();

  // Copa do meio
  push();
  translate(0, -60 * sc - 40 * sc, 0);
  rotateX(PI);
  fill(50, 150, 55);
  noStroke();
  cone(28 * sc, 36 * sc);
  pop();

  // Copa superior
  push();
  translate(0, -60 * sc - 62 * sc, 0);
  rotateX(PI);
  fill(60, 170, 60);
  noStroke();
  cone(18 * sc, 28 * sc);
  pop();

  // Frutas vermelhas
  for (let i = 0; i < 5; i++) {
    push();
    let ang = i * TWO_PI / 5;
    translate(cos(ang) * 22 * sc, -70 * sc, sin(ang) * 22 * sc);
    fill(220, 60, 60);
    noStroke();
    sphere(4 * sc);
    pop();
  }

  pop();
}

// Cerca com postes, travessas e portão
function drawFence(s) {
  let posts  = [-80, -60, -40, -20, 20, 40, 60, 80];
  let zFront = 90 * s;

  // Postes
  for (let x of posts) {
    push();
    translate(x * s, 62 * s, zFront);
    fill(220, 200, 170);
    noStroke();
    box(5 * s, 35 * s, 5 * s);

    // Pontinha
    push();
    translate(0, -22 * s, 0);
    cone(4 * s, 10 * s);
    pop();
    pop();
  }

  // Tabua superior
  push();
  translate(0, 55 * s, zFront);
  fill(200, 180, 150);
  noStroke();
  box(175 * s, 4 * s, 4 * s);
  pop();

  // Tabua inferior
  push();
  translate(0, 68 * s, zFront);
  fill(200, 180, 150);
  noStroke();
  box(175 * s, 4 * s, 4 * s);
  pop();

  // Portão
  push();
  translate(0, 62 * s, zFront);
  fill(180, 130, 70);
  noStroke();
  box(35 * s, 4 * s, 4 * s);
  push(); translate(0, 12 * s, 0); box(35 * s, 4 * s, 4 * s); pop();
  push(); rotateZ(0.4); box(28 * s, 3 * s, 3 * s); pop();
  pop();
}

// Nuvem
function drawCloud(x, y, z, s) {
  push();
  translate(x, y, z);
  noStroke();
  fill(255, 255, 255, 230);

  sphere(22 * s);
  push(); translate(-28 * s, 4 * s, 0); sphere(15 * s); pop();
  push(); translate( 28 * s, 4 * s, 0); sphere(17 * s); pop();

  pop();
}

// Pássaro com corpo, cabeça, asas e cauda
function drawBird(x, y, z, wingAng) {
  push();
  translate(x, y, z);

  // Corpo
  fill(30, 20, 20);
  noStroke();
  push(); scale(1, 0.6, 0.5); sphere(6); pop();

  // Cabeça e bico
  push();
  translate(6, -2, 0);
  sphere(3.5);
  push();
  translate(4, 0, 0);
  rotateZ(HALF_PI);
  fill(255, 180, 50);
  cone(1.5, 5);
  pop();
  pop();

  // Asa esquerda
  push();
  translate(-2, 0, 0);
  rotateX(-wingAng * 1.5);
  rotateZ(0.2);
  fill(40, 30, 30);
  scale(1, 0.3, 1);
  ellipsoid(14, 3, 5);
  pop();

  // Asa direita
  push();
  translate(-2, 0, 0);
  rotateX(wingAng * 1.5);
  rotateZ(-0.2);
  fill(40, 30, 30);
  scale(1, 0.3, 1);
  ellipsoid(14, 3, 5);
  pop();

  // Cauda
  push();
  translate(-8, 1, 0);
  rotateZ(-0.3);
  scale(1, 0.4, 0.6);
  ellipsoid(6, 3, 3);
  pop();

  pop();
}

// Sol com brilho e raios
function drawSun(s) {
  push();
  translate(width * 0.312, -height * 0.367, -width * 0.125);

  // Brilho externo
  fill(255, 240, 100, 80);
  noStroke();
  sphere(38 * s);

  // Sol
  fill(255, 220, 50);
  sphere(28 * s);

  // Raios
  fill(255, 235, 80, 150);
  for (let i = 0; i < 8; i++) {
    push();
    let ang = i * TWO_PI / 8;
    rotateZ(ang);
    translate(42 * s, 0, 0);
    scale(1, 0.3, 0.3);
    sphere(10 * s);
    pop();
  }

  pop();
}