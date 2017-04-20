class Brique extends ObjetGraphique{
  constructor(x, y,width,height) {
    // appel du constructeur hérité
	 super(x, y);
	 this.width= width;
     this.height= height;
   
  }
  
  draw(ctx) {
   
    ctx.save(); 
	
    ctx.translate(this.x, this.y);
    
	ctx.beginPath();
	
	ctx.fillStyle ="rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")"; 
	
    ctx.fillRect(this.x,this.y,this.width,this.height);
    
    ctx.fill();
    
    ctx.restore();
    
    
  }
  
  
} 