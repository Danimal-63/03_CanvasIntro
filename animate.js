/**
 *  handleShipAnimation moves the ship based on its direction and
 *    keyboard control
 *
 */
function handleShipAnimation() {
  if (CONTROLS.ship.forward) {
    var radians = (Math.PI / 180) * SPACE_SHIP.rotation,
        cos = Math.cos(radians),
        sin = Math.sin(radians);
    SPACE_SHIP.x += SPACE_SHIP.speed * sin;
    SPACE_SHIP.y +=  SPACE_SHIP.speed * cos;
  }
  if (CONTROLS.ship.backward) {
    var radians = (Math.PI / 180) * SPACE_SHIP.rotation,
        cos = Math.cos(radians),
        sin = Math.sin(radians);
    SPACE_SHIP.x -= SPACE_SHIP.speed * sin;
    SPACE_SHIP.y -=  SPACE_SHIP.speed * cos;
  }
  if (CONTROLS.ship.rotateClockwise) {
    SPACE_SHIP.rotation -= 4;
  }
  if (CONTROLS.ship.rotateCounterClockwise) {
    SPACE_SHIP.rotation += 4;
  }

  // Check if asteroid is leaving the boundary, if so, switch sides
  if (SPACE_SHIP.x > GAME.canvas.width) {
    SPACE_SHIP.x = 0;
  } else if (SPACE_SHIP.x < 0) {
    SPACE_SHIP.x = 600;
  } else if (SPACE_SHIP.y > GAME.canvas.height) {
    SPACE_SHIP.y = 0;
  } else if (SPACE_SHIP.y < 0) {
    SPACE_SHIP.y = 300;
  }
}
//creats and object of size hieght 20 and length 20 and NEW_OBJECT.x,NEW_OBJECT.y,20,20
function RenderNewObject(context) {
context.fillRect(NEW_OBJECT.x,NEW_OBJECT.y,20,20);
}
// moves the object in a diagonal resetting when it hits the border
function HandleNewObjectMovement() {
  NEW_OBJECT.x+=2;
  NEW_OBJECT.y+=1;
  if (NEW_OBJECT.x>GAME.canvas.width) {
    NEW_OBJECT.x=0;
  }else if (NEW_OBJECT.y>GAME.canvas.height) {
    NEW_OBJECT.y=0;
  }
}


function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  if (GAME.started) {

    // 1 - Reposition the objects
    handleShipAnimation();
    HandleNewObjectMovement();

    // 2 - Clear the CANVAS
    context.clearRect(0, 0, 600, 300);

    // 3 - Draw new items
    RenderSpaceship(context);
    RenderNewObject(context);
    RenderNewObject(context);

  } else {
    context.font = "30px Arial";
    context.fillText("Game Over      Level " + GAME.level, 135, 200);
  }
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(HandleNewObjectMovement);

window.requestAnimationFrame(runGame);
