//Game States
var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,monster,fruitGroup,enemyGroup, score,r,randomFruit, position;
var swordImg , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImg;
var gameOverSound ,knifeSwoosh;

function preload(){
  
  swordImg = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  
    gameOverSound = loadSound("gameover.mp3");
  knifeSwoosh = loadSound("knifeSwooshSound.mp3");
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImg);
   sword.scale=0.7
  
  
  
  //collider for sword
  sword.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  knifeSwoosh.play();     
  
  
  if(gameState===PLAY){
    
    //Call fruits and Enemy function
    fruits();
    Enemy();
    
    // Move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    // Increase the score if sword touching the fruit
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      
      
       knifeSwooshSound.play();
      
      score=score+2;
    }
    else
    {
      
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        
        gameOverSound.play();
        
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        
        
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
      
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
      }
    }
  }
  
  
  drawSprites();
  
  //display the score
  text("Score : "+ score,300,30);
}


function Enemy(){
  if(World.frameCount%200===0){
    alien =createSprite(400,200,20,20);
    alien.addAnimation("moving", monsterImage);
    alien.y=Math.round(random(100,300));
    alien.velocityX=-(8+(score/10));
    alien.setLifetime=50;
    
    enemyGroup.add(alien);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    console.log(position)
     //using random variable change the position of fruit, to make it more challenging
    
   
    if(position===1)
    {
    
    fruit.x=400;
    fruit.velocityX=7;
    console.log(fruit.velocity)
    }
//     else
//     {
//       if(position===2){
      
//       fruit.x=0;
      
//       //Increase the velocity of fruit after score 4 or 10
//       fruit.velocityX=7+(score/4);
//       }
//     }
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}