var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var road = new Image();
var auto = new Image();


road.src = "img/road.jpg";
auto.src = "img/auto.png";

//Position of auto
var xPos = 200;
var yPos = 500;
var startSpeed = 1;
//Move auto
document.addEventListener("keydown", moveAuto);

function moveAuto(e){
    switch(e.keyCode){
        case 37: //left
            xPos -= 20; 
            break;
        case 38: //top
            yPos -= 20;
            break;
        case 39: //right
            xPos += 20;
            break;
        case 40: //bottom
            yPos += 20;
            break;
    }
}




function draw(){
    ctx.drawImage(road, 0, 0);
    ctx.drawImage(auto, xPos, yPos, 30, 50);
    yPos -= startSpeed;
    requestAnimationFrame(draw);
};

auto.onload = draw;