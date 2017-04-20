class Bar extends ObjetGraphique {
    constructor(x, y, couleur, vx, vy,width,height) {
        // appel du constructeur hérité
        super(x, y, couleur, vx, vy);
        this.width= width;
        this.height= height;
    }
    move() {
        this.x += this.vx;
    }
    draw(ctx) {
       
        ctx.save(); 
        ctx.translate(this.x, this.y);

        // On dessine en 0,0
        ctx.fillStyle = this.couleur;
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.restore();

    }
}