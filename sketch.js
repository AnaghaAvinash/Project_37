var database,dog1,dog,dog2,stock,stockI,stockB,vaccineSI,vaccineS;
var position,feed,add, foodobject, Feedtime, Lastfeed=0,vaccineSB;
var sleepI,sleepB,sleep,homeI,homeB,home,vaccineI,vaccine,vaccineB;
var dogAI,dogA,playB,washI,washB,wash;

function preload(){
  dog1 = loadImage("dogImg.png");
  dog2 = loadImage("dogImg1.png");
  stockI = loadImage("Food Stock.png");	
  vaccineSI = loadImage("dogVaccination.png");
  bgi = loadImage("back.png");
  sleepI = loadImage("Bed Room.png");
  homeI = loadImage("Living Room.png");
  vaccineI = loadImage("Injection.png");
  dogAI = loadImage("Garden.png");
  washI = loadImage("Wash Room.png");
}

function setup() {

  createCanvas(500,650);
  
  database = firebase.database();

  foodobject=new Food();

  stock = createSprite(250,290,10,10);
  vaccineS = createSprite(250,300,10,10);
  sleep = createSprite(250,350,10,10);
  home = createSprite(250,350,10,10);
  vaccine = createSprite(300,550,10,10);
  dogA = createSprite(250,300,10,10);
  wash = createSprite(250,300,10,10);

  stock.visible = false;
  vaccine.visible = false;
  vaccineS.visible = false;
  sleep.visible = false;
  home.visible = false;
  dogA.visible = false;
  wash.visible = false;
  
  var dog3 = database.ref('Food');
  dog3.on("value", readPosition);

  dog = createSprite(250,540,10,10);
  dog.addImage(dog1);
  dog.scale=0.3;

  feed = createButton("FEED DOG");
  feed.position(745,10);
  feed.mousePressed(FeedDog);

  add = createButton("ADD FOOD");
  add.position(640,10);
  add.mousePressed(AddFood);

  stockB = createButton("FOOD STOCK");
  stockB.position(520,10);
  stockB.mousePressed(CheckStock);

  vaccineSB = createButton("VACCINE SCHEDULE");
  vaccineSB.position(360,10);
  vaccineSB.mousePressed(vacine);

  sleepB = createButton("PUT DOG TO SLEEP");
  sleepB.position(360,40);
  sleepB.mousePressed(sleepF);

  homeB = createButton("TAKE DOG HOME");
  homeB.position(360,70);
  homeB.mousePressed(homeF);

  vaccineB = createButton("VACCINATE DOG");
  vaccineB.position(720,40);
  vaccineB.mousePressed(vaccineF);

  playB = createButton("TAKE DOG TO GARDEN");
  playB.position(520,70);
  playB.mousePressed(playF);

  washB = createButton("TAKE DOG TO WASHROOM");
  washB.position(520,40);
  washB.mousePressed(washF);
} 


function draw(){
  
  background(bgi);
  fill(255,255,254);
  textSize(15);

  foodobject.display();
  
  fedtime=database.ref('FeedTime');
  fedtime.on("value",function(data){ Lastfeed=data.val(); });
 if(Lastfeed>=12){
   last = createButton("LAST FED : " + Lastfeed%12 + "PM ")
   last.position(720,70);
 }else if(Lastfeed  ==0 ){
   last = createButton("LAST FED:12AM ")
   last.position(720,70)
 }else{
   last= createButton("LAST FED : " + Lastfeed + "AM ")
   last.position(720,70);
 }


 /*currentTime = hour();
if(currentTime==(Lastfeed+1)){
  update("Playing");
  foodobject.garden();

}else if(currentTime==(Lastfeed+2)){
  update("Sleeping");
  foodobject.bedroom();
}else if(currentTime>(Lastfeed+2)&&currentTime<=(Lastfeed+4)){
  update("Bathing");
  foodobject.washroom();
}else{
  update("Hungry");
  foodobject.display();
}

if(gameState!="Hungry"){
feed.hide();
add.hide();
dog.remove();
}else{
  feed.show();
  add.show();
  dog.addImage(dog2);
}*/
 



 drawSprites();

 }

function readPosition(data){
  
  position = data.val();
  foodobject.updateFoodStock(position);

  
}


function writePosition(w){
  if(w>0){
    w=w-1
  }else{
    w=0
   
  }

  database.ref('/').set({
    'Food': w
  });

}


function AddFood(){
  position++
  stock.visible=false;
  vaccineS.visible = false;
  vaccine.visible = false;
  dogA.visible = false;
  sleep.visible = false;
  home.visible = false;
  wash.visible = false;
  dog.visible = true;
  
  database.ref('/').update({
  Food:position
  
});
}


function FeedDog(){
  dog.addImage(dog2);
  stock.visible=false;
  vaccineS.visible = false;
  vaccine.visible = false;
  dogA.visible = false;
  sleep.visible = false;
  home.visible = false;
  wash.visible = false;
  dog.visible = true;
  
  foodobject.updateFoodStock(foodobject.getFoodStock()-1)
  database.ref('/').update({
  Food:foodobject.getFoodStock(),
  FeedTime:hour()
 });
}

function CheckStock(){
  feed.visible=false;
  vaccineS.visible = false;
  vaccine.visible = false;
  dogA.visible = false;
  sleep.visible = false;
  home.visible = false;
  wash.visible = false;
  dog.visible = true;
stock.visible = true;
stock.addImage(stockI);
stock.scale = 0.75;


}
 
function vacine(){
  stock.visible=false;
  feed.visible = false;
  vaccine.visible = false;
  dogA.visible = false;
  sleep.visible = false;
  home.visible = false;
  wash.visible = false;
  dog.visible = true;
  vaccineS.visible = true;
  vaccineS.addImage(vaccineSI);
  vaccineS.scale=0.5;

  
}

function sleepF(){
  stock.visible=false;
  feed.visible = false;
  vaccine.visible = false;
  dogA.visible = false;
  feed.visible = false;
  dog.visible = false;
  home.visible = false;
  wash.visible = false;
  vaccineS.visible = true;
  sleep.visible = true;
  sleep.addImage(sleepI);
}

function homeF(){
  stock.visible=false;
  feed.visible = false;
  vaccine.visible = false;
  dogA.visible = false;
  sleep.visible = false;
  dog.visible = false;
  wash.visible = false;
  vaccineS.visible = true;
  home.visible = true;
  home.addImage(homeI);
}

function vaccineF(){
  stock.visible=false;
  feed.visible = false;
  dogA.visible = false;
  sleep.visible = false;
  home.visible = false;
  wash.visible = false;
  dog.visible = true;

  vaccineS.visible = false;
  vaccine.visible = true;
  vaccine.addImage(vaccineI);
  vaccine.scale = 0.2;
  dog.addImage(dog1);
}

function playF(){
  stock.visible=false;
  feed.visible = false;
  vaccine.visible = false;
  dogA.visible = false;
  sleep.visible = false;
  home.visible = false;
  wash.visible = false;
  vaccineS.visible = true;
  dog.visible = false;
  dogA.visible = true;
  dogA.addImage(dogAI);
}

function washF(){
  stock.visible=false;
  feed.visible = false;
  vaccine.visible = false;
  dogA.visible = false;
  sleep.visible = false;
  home.visible = false;
  dog.visible = false;
  vaccineS.visible = true;
  wash.visible = true;
  wash.addImage(washI);
}


