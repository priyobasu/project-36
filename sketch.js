//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImage1,dogImage2;
var fedTime, lastFed;
var foodObj;
var feed,addFood;
function preload()
{

dogImage1=loadImage("images/dog.png");
dogImage2=loadImage("images/happydog.png");
}

function setup() {
  createCanvas(1000,400);
  database=firebase.database();
  foodObj=new Food();

  dog=createSprite(800,200,150,150);
  dog.addImage(dogImage1);
  dog.scale=0.25;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46, 139, 87);

  foodObj.display();
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 +" PM ",350,30);
  }
  else if(lastFed==0){
    text("Last Feed: 12 AM ",350,30);

  }
  else{
    text("Last Feed : "+lastFed+" AM ",350,30);
  }
  
  drawSprites();
  }
  


function readStock(data)
{
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog()
{
  dog.addImage(dogImage2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  food:foodObj.getFoodStock(),
  FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
   food:foodS 
  })
}













