let par = [];
par.push(new Particle(Rand()*3, Rand()*3, 30));
par.push(new Particle(Rand()*3, Rand()*3, 30));
par.push(new Particle(Rand()*3, Rand()*3, 30));
par.push(new Particle(Rand()*3, Rand()*3, 30));
par.push(new Particle(Rand()*3, Rand()*3, 30));
par.push(new Particle(Rand()*3, Rand()*3, 30));
par.push(new Particle(Rand()*3, Rand()*3, 30));
par.push(new Particle(Rand()*3, Rand()*3, 30));
par.push(new Particle(Rand()*3, Rand()*3, 30));

let loop = () => {

    clearCanvas();

    for (let i = 0; i < par.length; i++) {
        par[i].render();
        par[i].parentBounce(c);
        par[i].parentIsolate(c);
        par[i].velocity();
    }

    window.requestAnimationFrame(loop);

}
window.requestAnimationFrame(loop);

document.addEventListener("keydown", (event) => {
    if (event.keyCode === 32) {
        for (let i = 0; i < par.length; i++) {
            par[i].vx = RandXY();
            par[i].vy = RandXY();
        }
        return;
    }
});

document.addEventListener("touchstart", (event) => {
        for (let i = 0; i < par.length; i++) {
            par[i].vx = RandXY();
            par[i].vy = RandXY();
        }
        return;
});