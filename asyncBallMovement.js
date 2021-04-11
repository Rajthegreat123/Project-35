var balloon, database, position;

var back, backImg, balloonImg;

function preload(){
    backImg = loadImage("images/Hot Air Ballon-01.png")
    balloonImg = loadImage("images/Hot Air Ballon-03.png")
}

function setup() {
    database = firebase.database();
    console.log(database);
    createCanvas(625, 416.75);
    back = createSprite(310, 210, 510, 500)
    back.addImage("back", backImg);
    back.scale = 0.25


    balloon = createSprite(250, 250, 10, 10);
    balloon.addImage("balloon", balloonImg);
    balloon.scale = 0.25;

    var BalloonPosition = database.ref('Balloon/Position');
    BalloonPosition.on("value", readPosition, showError);
}

function draw() {
    background("white");
    if (position !== undefined) {
        if (keyDown(LEFT_ARROW || A)) {
            writePosition(-10, 0);
        }
        else if (keyDown(RIGHT_ARROW || D)) {
            writePosition(10, 0);
        }
        else if (keyDown(UP_ARROW || W)) {
            writePosition(0, -10);
            balloon.scale = balloon.scale + 0.01;
        }
        else if (keyDown(DOWN_ARROW || S)) {
            writePosition(0, +10);
            balloon.scale = balloon.scale - 0.01;
        }
        console.log(balloon.scale);
        drawSprites();
        text("Press arrow keys to move around!", 20, 20);
        textSize(20);
        fill("black");
    }
}

function readPosition(data) {
    position = data.val();
    console.log(position.x);

    balloon.x = position.x;
    balloon.y = position.y;
}

function writePosition(x, y) {
    database.ref('Balloon/Position').set({
        'x': position.x + x,
        'y': position.y + y
    });
}

function showError(){
    console.log("error writing to the database.");
}
