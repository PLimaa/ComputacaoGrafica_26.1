function setup() {
    createCanvas(windowWidth, windowHeight);
    let margin=0.1;
    let sz= min(height, width) * (1-margin);
    let x = (width-sz)/2;
    let y = (height-sz)/2;
    background(220);
    fill(255,0,0);
    rect(x,y,sz,sz);

}

