class Particle {

    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.radius = radius;
        this.color = color;

        console.log("A particle has been created!")
        this.render();
    }

    render() {
        // drawCircle(this.x, this.y, this.radius, this.color);
        ctx.drawImage(imug, this.x, this.y, this.radius*5, this.radius*5);
    }
    
    
    // Keeps the particle in said parent (Rectangle)
    parentBounce(parent) {
        if(this.x+this.radius > parent.width || this.x-this.radius < 0) {
            this.vx = -this.vx;
        }
        if(this.y+this.radius > parent.height) {
            this.vy = -this.vy;
        }
        if(this.y-this.radius < 0) {
            this.vy = -this.vy;
        }
    }
    parentIsolate(parent) {
        this.x+this.radius > parent.width ? this.x = parent.width-this.radius*1.01 : false;
        this.x-this.radius < 0 ? this.x = 0+this.radius*1.01 : false;
        this.y+this.radius > parent.height ? this.y = parent.height-this.radius*1.01 : false;
        this.y-this.radius < 0 ? this.y = 0+this.radius*1.01 : false;
    }
    
    velocity() {
        this.x += this.vx;
        this.y += this.vy;

        this.vx*=0.97;
        this.vy*=0.97;
    }

}