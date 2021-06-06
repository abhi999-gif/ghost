var door , doorImg , doorGroup,
climber , climberImg , climberGroup , 
tower , towerImg , invisibleBlockGroup , 
invisibleGroup , ghost , ghostImg;
var gameState = "play"

function preload (){
  towerImg = loadImage("tower.png")
   doorImg = loadImage("door.png")
  climberImg = loadImage("climber.png")
   ghostImg = loadImage("ghost-standing.png")
  
}
function setup (){
  createCanvas(600,600)
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
    tower.velocityY = 6;
  
    ghost = createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
    ghost.scale = 0.2;
  
  climberGroup = new Group();
   doorGroup = new Group();
   invisibleBlockGroup = new Group();
}

function draw (){
  if (gameState === "play"){
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
     if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
     if(keyDown("space")){
      ghost.velocityY = -6
    }
    
     ghost.velocityY = ghost.velocityY + 0.8
    
    
      if(tower.y > 400){
      tower.y = 300
  }
    spawnDoors();
    
    if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }
    
      if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
        gameState = "end"
    }
    
  
  drawSprites();
}

}

if (gameState === "end"){
  fill("red")
  textSize = 30
  text("Game Over",200,200)
}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 300 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height =  2 ;                   
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorGroup.add(door);
    invisibleBlock.debug = true;
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}


