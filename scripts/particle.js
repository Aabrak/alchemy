class Particle {

    constructor(x, y, radius, color, mass) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = 0;
        this.vy = 0;
        this.vel = 0;
        this.density = radius*2;
        this.mass = mass;
        this.color = color;

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

        let tempVx = this.vx;
        let tempVy = this.vy;
        this.vx < 1 ? tempVx = -tempVx : false;
        this.vy < 1 ? tempVy = -tempVy : false;
        this.vel=tempVx+tempVy;
    }

    friction() {
        // if(this.vel > 1) {
            this.vx*=0.995;
            this.vy*=0.995;
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
        if(this.vel > 0.1) {
            this.color = `rgba(${Math.floor(this.vel*8)}, 100, 200)`;
        }
    }

    gravity() {
        this.y > 0.1 ? this.vy += settings.gravity : this.vy = 0;
    }

    denseForce(ent) {
        if(getDistance(this, ent) <= this.density*0.92) {
            let pushForce = this.density - getDistance(this, ent);
            this.applyForce(angleComparator(this, ent), -pushForce/4);
        }
    }

}