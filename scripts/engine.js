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
var mouX;
var mouY;
var clickX;
var clickY;
var pussy = 1;

////
////	Functions
////

// Permanent randomizer
let Rand = () => {
	value = Math.floor(Math.random() * (100 - 20) + 20);
	return value;
};

let RandXY = () => {
	value = Math.floor(Math.random() * (200 - 10) + 10);
    console.log(value);
	return value-100;
};

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