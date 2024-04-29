class Particle {

    constructor(x, y, radius, color, mass) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = 0;
        this.vy = 0;
        this.vel = 0;
        this.density = radius*4;
        this.mass = mass;
        this.color = color;
        this.repelForce = 10;

        console.log("A particle has been created!")
        this.render();
    }

    render() {
        drawCircle(this.x, this.y, this.radius, this.color);
    }
    
    // Keeps the particle in said parent (Rectangle)
    parentBounce(parent) {
        if(this.x+this.radius > parent.width || this.x-this.radius < 0) {
            this.vx = -this.vx;
        }
        if(this.y+this.radius > parent.height) {
            this.vy = -this.vy;

            // Lose momentum on parent collision
            this.vx *= 0.4;
            this.vy *= 0.4;
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
        this.gravity();
        // this.applyForce(0, 10)

        let tempVx = this.vx;
        let tempVy = this.vy;
        this.vx < 1 ? tempVx = -tempVx : false;
        this.vy < 1 ? tempVy = -tempVy : false;
        this.vel = tempVx + tempVy ;
    }

    friction() {
        // NEED TO OPTIMIZE !!
        // if(this.vel > 0.01) {
            this.vx*=0.97;
            this.vy*=0.97;
        // }
    }

    vortex(x, y, amp) {
        this.x > x ? this.vx-=amp : this.vx+=amp;
        this.y > y ? this.vy-=amp : this.vy+=amp;
    }

    applyForce(ang, mag) {
        applyForce(this, ang, mag);
    }

    freakOut(mag) {
        this.applyForce(Math.floor(Math.random()*360), mag);
    }

    burn() {
        // if(this.vel > 0.1) {
            this.color = `rgb( ${Math.floor(this.vel*10)}, ${Math.floor(this.vel*20)}, ${Math.floor(this.vel*25)} )`;
        // }
    }

    gravity() {
        // this.y > 0.1 ? this.vy += settings.gravity/4 : this.vy = 0;
        this.applyForce(90, settings.gravity/4);
    }

    denseForce(ent) {
        if(getDistance(this, ent) <= this.density) {
            this.friction();
            let pushForce = this.repelForce*this.density/getDistance(this, ent);
            // pushForce = SmoothingKernel(this.radius, getDistance(this, ent));
            this.applyForce(angleComparator(this, ent), -pushForce/40);
        }
    }

}