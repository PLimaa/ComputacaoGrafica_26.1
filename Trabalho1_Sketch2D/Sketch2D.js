function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  noStroke();
  
  // Céu
  fill(135, 206, 235);
  rect(0, 0, width, height * 0.6); 
  
  // Mar
  fill(0, 105, 148);
  rect(0, height * 0.6, width, height * 0.2); 
  
  
  // Vulcão 
  let vulcaoX = width * 0.75;
  let vulcaoY = height * 0.6; 
  fill("#562918");
  noStroke();
  triangle(vulcaoX - 150, vulcaoY,      
           vulcaoX + 150, vulcaoY,      
           vulcaoX, vulcaoY - 100);    

  // Cratera 
  fill(60, 60, 70);
  ellipse(vulcaoX, vulcaoY - 95, 10, 7);
  
  //Fumaca
  fill('grey')
  circle(vulcaoX+3, vulcaoY-103,10)
  circle(vulcaoX+13, vulcaoY-110,20)
  circle(vulcaoX+25, vulcaoY-119,30)
  circle(vulcaoX+45, vulcaoY-130,40)

  
  // Espuma Mar
  fill(255, 255, 255, 150); 
  ellipse(width / 2, height * 0.8, width * 1.2, 20);
  
  // Areia
  fill(242, 210, 169);
  rect(0, height * 0.8, width, height * 0.2); 

  // Pinguim 
  let pX = width * 0.55;
  let pY = height * 0.8; 
  
  // Corpo e Cabeça
  fill(0);
  ellipse(pX, pY, 60, 80);        
  ellipse(pX, pY-40, 45, 45);   
  
  // Barriga
  fill(255);
  ellipse(pX, pY + 5, 45, 60);
  
  // Olhos e Bico
  fill(255);
  circle(pX - 8, pY - 45, 7);
  circle(pX + 8, pY - 45, 7);
  fill(255, 165, 0);
  triangle(pX, pY - 38, pX - 5, pY - 33, pX + 5, pY - 33); 
  
  // Pés
  ellipse(pX - 15, pY + 38, 18, 10);
  ellipse(pX + 15, pY + 38, 18, 10);
  
  //Sol
  let solX = width * 0.15;
  let solY = height * 0.15;
  fill('yellow');
  noStroke(); // 
  circle(solX, solY, 100);

  //Raios
  stroke('yellow');
  strokeWeight(5);

  // Raio para CIMA 
  line(solX, solY - 60, solX, solY - 90);
  
  // Raio para BAIXO
  line(solX, solY + 60, solX, solY + 90);
  
  // Raio para ESQUERDA
  line(solX - 60, solY, solX - 90, solY);
  
  // Raio para DIREITA
  line(solX + 60, solY, solX + 90, solY);
  
  // Raios Diagonais
  line(solX + 45, solY + 45, solX + 65, solY + 65); 
  line(solX - 45, solY - 45, solX - 65, solY - 65); 
  line(solX + 45, solY - 45, solX + 65, solY - 65); 
  line(solX - 45, solY + 45, solX - 65, solY + 65);
  
  //Nuvens
  noStroke();
  fill('white');
  circle(width* 0.4, solY+60, 70);
  circle(width* 0.47, solY+60, 70);
  circle(width* 0.54, solY+60, 70);
  
  circle(width* 0.57, solY-40, 70);
  circle(width* 0.64, solY-40, 70);
  circle(width* 0.71, solY-40, 70);
  
  circle(width* 0.76, solY+40, 70);
  circle(width* 0.83, solY+40, 70);
  circle(width* 0.90, solY+40, 70);
  
  //Passaros
  stroke(50); 
  strokeWeight(2);
  noFill(); 
  
  // Passaro 1
  let pass1X = solX + width*0.3;
  let pass1Y = solY;
  arc(pass1X, pass1Y, 40, 20, PI, 0); 
  arc(pass1X + 35, pass1Y, 40, 20, PI, 0);
  
  // Passaro 2
  let pass2X = solX + width*0.6;
  let pass2Y = solY - 60;
  arc(pass2X, pass2Y, 20, 10, PI, 0); 
  arc(pass2X + 18, pass2Y, 20, 10, PI, 0);
  
  // Passaro 3
  let pass3X = solX + width*0.75;
  let pass3Y = solY + 75;
  arc(pass3X, pass3Y, 30, 15, PI, 0); 
  arc(pass3X + 25, pass3Y, 30, 15, PI, 0);
  
  // Frango 
  let fX = width* 0.35; 
  let fY = height * 0.82;
  
  // Guarda-Sol
  let gsX = fX - (width*0.19);
  let gsY = fY + 20; 
  
  // Sombra
  fill(0, 0, 0, 50); 
  noStroke();
  ellipse(gsX, gsY +20, 120, 30); 
  
  //Cabo
  fill('#80421C');
  rect(gsX - 4, gsY - 180, 8, 200); 
  
  // Topo
  fill('#701CC5'); 
  ellipse(gsX, gsY - 180, 190, 60); 
  
  // Corpo e Pescoço
  fill(255); 
  ellipse(fX, fY, 35, 90);        
  fill(255); 
  ellipse(fX, fY - 50, 20, 70);  
  
  // Cabeça
  fill(255); 
  circle(fX, fY - 85,40)
  
  // Olhos
  fill(255);
  stroke(0); 
  strokeWeight(1);
  ellipse(fX - 8, fY - 90, 15, 18); 
  ellipse(fX + 8, fY - 90, 15, 18); 
  
  // Pupilas
  noStroke();
  fill(0);
  circle(fX - 8, fY - 90, 5);
  circle(fX + 8, fY - 90, 5);
  
  // Bico
  fill(255, 140, 0); 
  triangle(fX, fY - 82, fX - 8, fY - 78, fX + 8, fY - 78); 
  
  // Crista
  fill(220, 20, 60);
  circle(fX - 5, fY - 105, 12)
  circle(fX + 2, fY - 108, 12)
  circle(fX + 8, fY - 105, 12)
  
  // Barbela
  ellipse(fX, fY - 73, 15, 10);
  
  // Asas
  fill(255, 250, 240);
  push();
  translate(fX - 18, fY);
  rotate(radians(15)); 
  ellipse(0, 0, 15, 60);
  pop();
  
  push();
  translate(fX + 18 , fY);
  rotate(radians(-15)); 
  ellipse(0, 0, 15, 60);
  pop();

  //  Pés
  fill('yellow')
  ellipse(fX - 14, fY+50 , 25, 12);
  ellipse(fX + 14, fY+50 , 25, 12);
  
  // Prancha Pinguim  
  fill(255, 100, 0); 
  push();
  translate(pX + 40, pY - 20); 
  rotate(radians(10)); 
  ellipse(0, 0, 40, 150); 
  fill(255, 200, 0);
  rect(-2, -75, 4, 150); 
  pop();
  
  // Prancha Frango
  fill(100, 80, 50); 
  push();
  translate(fX - 45, fY - 20); 
  rotate(radians(-15)); 
  ellipse(0, 0, 45, 160); 
  noStroke();
  pop();
  
  // Palmeira
  let palmX = width * 0.85; 
  let palmY = height * 0.95; 
  
  //Tronco
  fill('#80421C');
  noStroke();
  quad(palmX - 15, palmY,      // Base esquerda
       palmX + 15, palmY,      // Base direita
       palmX + 5, palmY - height*0.45, // Topo direito 
       palmX - 5, palmY - height*0.45);// Topo esquerdo 
  
  //Folhas
  push();
  translate(palmX, palmY - height*0.45); 
  fill('#285C19');
  
  // Folhas da Direita
  push();
  for (let i = 0; i < 4; i++) {
    rotate(radians(30)); 
    ellipse(60, 0, 130, 35); 
  }
  pop();

  // Folhas da Esquerda
  push();
  for (let i = 0; i < 4; i++) {
    rotate(radians(-30));
    ellipse(-60, 0, 130, 35); 
  }
  pop();
  pop();
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

