class Food {
    constructor(){
    this.foodStock=0;
    this.image=loadImage("milk.png")
    }
  
   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }
  
   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }
  
    getFoodStock(){
      return this.foodStock;
    }

    /*bedroom(){
      background(sleeI,200,300);
    }

    garden(){
      background(dogAI,200,300);
    }

    washroom(){
      background(washI,200,300);
    }*/

    
  
    display(){
      var x=100,y=150;
      
      imageMode(CENTER);
   
      
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=100;
            y=y+60;
          }
          image(this.image,x,y,60,60);
          x=x+30;
        }
      }
    }
  }