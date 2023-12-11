////
////	Values
////

// Canvas vars
const can = document.getElementById("c");
const ctx = can.getContext("2d");
const img = document.getElementById("imug");

// Const values
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
const uiMenu = document.getElementById("ui-menu");
const rng1 = document.getElementById("rng1");
const rng2 = document.getElementById("rng2");
const rng3 = document.getElementById("rng3");
const rng4 = document.getElementById("rng4");

// Global Vars
var mou = {
    x: 1,
    y: 1,
}
var clickX;
var clickY;
var holding = 0;
var settings = {
    gravity: 1,
    beep: 0,
}
var box = {
    x: can.width/2,
    y: can.height/2,
    width: 100,
    height: 100,
}
var fps = 1;

////
////	Functions
////

// Something something cubic
let SmoothingKernel = (radius, dst) => {
	value = Math.max(0, radius - dst);
	return value * value * value;
}

// Permanent randomizer
let Rand = () => {
	value = Math.floor(Math.random() * (100 - 20) + 20);
	return value;
};

let randRange = (r) => {
	value = Math.floor(Math.random() * r);
	return value-r/2;
};

// Randomizer -100 to 100
let RandXY = () => {
	value = Math.floor(Math.random() * (200 - 10) + 10);
	return value-100;
};

// Get same value of same percentage
let ruleOfThree = (x1, xMax, yMax) => {
    let x = x1;
    if(x1 < 1) {
        x = -x1;
    }
    return Math.floor(x * xMax / yMax);
}

// Window resize (full)
let ResizeWindow = () => {
	let width = can.width = window.innerWidth;
	let height = can.height = window.innerHeight;
};
ResizeWindow();

// Clean canvas
let clearCanvas = () => {
	ctx.clearRect(0, 0, can.width, can.height);
}

// Drawing Rectangle
let drawRec = (x, y, size, color="#C0F") => {
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill();
    
    ctx.strokeStyle = "#000";
    ctx.stroke();
};

// Drawing Circle
let drawCircle = (x, y, radius, color="#C0F") => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "#000";
    ctx.stroke();
};


// GEOMETRY

// Find angle between two entities
let angleComparator = (ent1, ent2) => {

	let adj = ent2.x - ent1.x;

	let opp = ent2.y - ent1.y;

	let tanA = Math.atan(opp / adj);

	let angle = tanA * 180/Math.PI;
	
	if (adj > 0) {
		
		return angle;

	} else if (adj < 0) {

		return angle + 180;

	}

};

// Get distance between two entities
let getDistance = (ent1, ent2) => {

	let adj = ent2.x - ent1.x;
	let opp = ent2.y - ent1.y;

	let hyp = Math.hypot(adj, opp);

	return hyp;

};


// PHYSICS

// Apply Force
let applyForce = (ent, ang, mag) => {
    ent.vx = Math.cos(ang * (Math.PI/180))*mag;
    ent.vy = Math.sin(ang * (Math.PI/180))*mag;
};

