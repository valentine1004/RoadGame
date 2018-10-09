var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var road = new Image();
var car1 = new Image();
var car2 = new Image();
var car3 = new Image();
var auto = new Image();


road.src = "img/road.jpg";
car1.src = "img/car1.png";
car2.src = "img/car2.png";
car3.src = "img/car3.png";
auto.src = "img/auto.png";

//Создание других машинок
var cars = [];

cars[0] = {
    x: 0,
    y: 20
}

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
    for(var i = 0; i < cars.length; i++){
        ctx.drawImage(car1, cars[i].x, cars[i].y, 30, 50);
        ctx.drawImage(car2, 400, 200, 30, 50);
        ctx.drawImage(car3, 250, 260, 30, 50);
        cars[i].y++;
    }
    
    ctx.drawImage(auto, xPos, yPos, 30, 50);
    // yPos -= startSpeed;
    requestAnimationFrame(draw);
};

auto.onload = draw;