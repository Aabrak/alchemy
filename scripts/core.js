let par = [];
for (let i = 0; i < 400; i++) {
    par.push(new Particle(Rand()*3, Rand()*3, 10));
}
par[0].color = "#00f";

let loop = () => {

    clearCanvas();

    // console.log(SmoothingKernel(5, 50));
    
    for (let i = 0; i < par.length; i++) {
        
        par[i].render();
        
        par[i].burn();
        par[i].parentBounce(c);
        par[i].parentIsolate(c);
        
        (holding == 1 && getDistance(mou, par[i]) > 1 && getDistance(mou, par[i]) < settings.vortexSize) ? par[i].applyForce(angleComparator(par[i], mou), rng1.value/20) : false;
        // (holding == 0 && getDistance(mou, par[i]) < 100) ? par[i].applyForce(angleComparator(par[i], mou), -rng1.value) : false;
        
        for (let j = 0; j < par.length; j++) {          
            (i != j) ? par[i].denseForce(par[j]) : false;
        }
        
        // Vizual(par[0].vel);
        
        // par[i].radius = rng2.value;
        
        par[i].velocity();
        // par[i].friction();
        
    }

    fps++;
    window.requestAnimationFrame(loop);

}
window.requestAnimationFrame(loop);

// PC ----------------
document.addEventListener("keydown", (event) => {
    if (event.keyCode === 32) {
        for (let i = 0; i < par.length; i++) {
            par[i].freakOut(50);
        }
        return;
    }
});

document.addEventListener("mousemove", (event) => {
    mou.x = event.clientX;
    mou.y = event.clientY;
    return;
});

document.addEventListener("mousedown", (event) => {
    holding = 1;
    return;
});

document.addEventListener("mouseup", (event) => {
    holding = 0;
    return;
});

document.addEventListener("wheel", (event) => {
    event.deltaY < 0 ? settings.vortexSize+=20 : settings.vortexSize-=20;
    Vizual(settings.vortexSize);
    return;
});


// MOBILE ----------------
document.addEventListener("touchstart", (event) => {
    for (let i = 0; i < par.length; i++) {
        par[i].vx = RandXY();
        par[i].vy = RandXY();
    }
    return;
});