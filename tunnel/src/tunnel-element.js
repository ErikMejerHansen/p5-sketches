class TunnelElement {
  constructor(r, p, intersectDist, path) {
    this.pathStart = path[0];
    this.pathMiddle = path[1];
    this.pathEnd = path[2];
    this.r = r;
    this.p = p;
    this.intersectDist = intersectDist;
    this.position = createVector(0, 0, 0);
    this.updatePosition();
    console.log("z:", this.position.z);
  }

  project(x) {
    // Single point perspective: https://math.stackexchange.com/questions/2305792/3d-projection-on-a-2d-plane-weak-maths-ressources/2306853#2306853
    let res = x * (this.intersectDist / this.position.z);
    return res;
  }

  updatePosition() {
    if (this.p <= 1) {
      p5.Vector.lerp(this.pathStart, this.pathMiddle, this.p, this.position);
    } else if (this.p > 1 && this.p <= 2) {
      p5.Vector.lerp(this.pathMiddle, this.pathEnd, this.p - 1, this.position);
    } else {
    }
  }

  show() {
    noFill();
    stroke("rgba(200, 0, 255, 0.12)");
    strokeWeight(15);
    ellipse(
      this.project(this.position.x),
      this.project(this.position.y),
      this.project(this.r * 2),
      this.project(this.r * 2)
    );

    stroke("rgba(200, 0, 255, 1)");
    strokeWeight(1);
    ellipse(
      this.project(this.position.x),
      this.project(this.position.y),
      this.project(this.r * 2),
      this.project(this.r * 2)
    );
  }

  move(amount) {
    if (this.p > 2) {
      this.p = 0;
    }
    this.p += amount;
    this.updatePosition();
  }
}
