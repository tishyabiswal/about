let stars = [];
let trails = [];

function setup() {
  createCanvas(windowWidth, windowHeight * 3.70); // Adjust canvas height
  for (let i = 0; i < 600; i++) {
    stars.push(new Star());
  }
}

function draw() {
  clear();
  for (let star of stars) {
    star.update();
    star.display();
  }
  
  for (let trail of trails) {
    trail.update();
    trail.display();
  }
}

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 3);
    this.speed = random(1, 3);
  }

  update() {
    this.x += this.speed;
    if (this.x > width) {
      this.x = 0;
    }
  }

  display() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < 50) {
      this.x += (mouseX - this.x) * 0.01;
      this.y += (mouseY - this.y) * 0.01;
    }
  }
}

class Trail {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 10);
    this.color = color(78, 5, 102, 100);
  }

  update() {
    let speedFactor = dist(pmouseX, pmouseY, mouseX, mouseY) / width; // Calculate speed factor based on mouse movement
    this.size = map(speedFactor, 0, 1, 10, 100);
    this.y += 2;
    if (this.y > height) {
      this.y = 0;
    }
  }
  

  display() {
    stroke(this.color);
    noFill();
    beginShape();
    for (let i = 0; i < 5; i++) {
      let angle = TWO_PI * i / 5 - HALF_PI;
      let xPos = this.x + cos(angle) * this.size;
      let yPos = this.y + sin(angle) * this.size;
      vertex(xPos, yPos);
    }
    endShape(CLOSE);
  }
}

function mouseMoved() {
  trails.push(new Trail(mouseX, mouseY));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 3.5); // Adjust canvas height
}
