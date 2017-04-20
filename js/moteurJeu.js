window.onload = init;
let game;
let canvas;

function init() {
    canvas = document.querySelector("#myCanvas");
    game = new MoteurJeu();
    game.start();
}

function MoteurJeu() {

    let canvas;
    let ctx;
    let width;
    let height;
	
	let tableauxDesBrique = [];
    let tableauxDesBalles = [];
    let niveau = 1;
    let etat = "gameStart";
    let score = 0;
    let bar;
	

	function creerDesBrique(nbBriqueligne,nbBriquecol){

		let width_brique = 98;
        let height_brique = 15; 
		let x=75;
		let y=15;
		let padding= 30;
		
        for (let ii = 0; ii < nbBriquecol; ii++) {          
			for (let ii2 = 0; ii2 < nbBriqueligne; ii2++) {           
				
				let brique = new Brique((ii*x+padding),(ii2*y+padding),width_brique,height_brique);
				
				// pas de collision
				// on la rajoute au tableau des balles
				 tableauxDesBrique.push(brique); 					
			}			
        }		
    }

    function creerDesBalles(nbBalles){
        for (let i = 0; i < nbBalles; i++) {
            let x = Math.random() * width; // Math.random() renvoie un nombre entre 0 et 1
            let y = Math.random() * height;
            let rayon = 8; // rayon entre 2 et 12            
			
			  let vx = 5; // entre 1 et 5
            let vy = 9;
		  
            /*if (B % 2 == 0)
              couleur = "rgb(" + 255 + "," + 0 + "," + 0 + ")";//*/
		  if( score<4 && score>=2){
			  niveau++;
			   vx = 11; // entre 1 et 5
				 vy = 9;
				 
		  }
		  
            

            let b = new Balle(x, y, rayon, "couleur", vx, vy);
            if (b.y < bar.y - 100) {
                // pas de collision
                // // on la rajoute au tableau des balles
                tableauxDesBalles.push(b);
            } else {
                // on décrémente i pour "annuler" ce tour
                // de boucle
                i--;
               
            }
        }
    } 
	



    function mainLoop(time){
        measureFPS(time);
        //console.log(this);
        ctx.clearRect(0, 0, width, height);
        ctx.save();
        ctx.fillStyle="white";
        ctx.fillRect(0,height-100,width,20);
        ctx.restore();
        bar.draw(ctx);
		if(tableauxDesBrique.length==0){
			etat="gameOver";
			}
        switch (etat) {
            case "gameStart":
                gameStart(ctx);
                break;

            case "deroulement":
                update(ctx);
                break;

            case "gameOver":
                gameEnd(ctx);
                break;

            default:
                break;
        }//*/

        //testeCollisionMonstreAvecMurs();
        
        requestAnimationFrame(mainLoop);//
    }
	
    function gameStart(ctx){
        displayMessage(ctx, "Niveau:"+niveau+" Appuyer sur 'espace' pour commencer");
        dessinerEtDeplacerLesBalles();
		dessinerBriques();

    }

    function update(ctx){
        dessinerEtDeplacerLesBalles();
		
		dessinerBriques();
		
        if (score > 0) {
            message = "Score : " + score;
            displayMessage(ctx, message);
			if(score==2){
				
				 messageA = "Niveau " + 2 + " atteint";
				displayMessage2(ctx, messageA,300);
			}
        }
		testerCollisionBriqueAvecBalles();
        testerCollisionBarAvecBalles();


    }

    function gameEnd(ctx){
		
        displayMessage(ctx, "Game Over votre score : "+score+ "  et 'espace' pour rejouer");
        dessinerEtDeplacerLesBalles();
		
    }

    function initNiveau(){
        bar.x = width / 2;
        bar.y = height - 100;
        tableauxDesBalles = [];
        tableauxDesBrique = [];
        //creerDesBalles(10);
		creerDesBrique(5,5);
		
        score = 0;
		niveau = 1;
    }

    function testerCollisionBarAvecBalles(){
        tableauxDesBalles.forEach(function (b, index, tab) {

            if (circRectsOverlap(0, bar.y,
                bar.x, 1,
                b.x, b.y, b.rayon)
                ||
                circRectsOverlap(bar.x + bar.width, bar.y,
                    width - (bar.x + bar.width), 1,
                    b.x, b.y, b.rayon)
            ) {
                // console.log("collision");
                b.vy = -b.vy;
                if (!b.etatSuivant()) {
                    tableauxDesBalles.splice(index, 1);
                }
            }
        });

    }
	
	
	
	 function testerCollisionBriqueAvecBalles(){
		tableauxDesBrique.forEach(function(br,indexx,tab){
        tableauxDesBalles.forEach(function (b, index,tab) {

			if (circRectsOverlap(br.x, br.y,
					   br.width, br.height,
					   b.x, b.y, b.rayon)) {
					   b.vy = -b.vy;	
				if (circRectsOverlap(br.x, br.y,
						   br.width, br.height,
						   b.x+1, b.y, b.rayon))b.vx = -b.vx;	
						   					   
				if (circRectsOverlap(br.x, br.y,
						   br.width, br.height,
						   b.x-1, b.y, b.rayon))b.vx = -b.vx;
						   
					console.log("collision balle et brique");
					tableauxDesBrique.splice(indexx, 1);
				  
			}
		
        });
		});
		

    }
	
    function dessinerEtDeplacerLesBalles(){

        tableauxDesBalles.forEach(function (b, index, tab) {
            b.draw(ctx);
            if (etat == "deroulement")
                b.move();
            testeCollisionBalleAvecMurs(b,index);
        });
    }
	function dessinerBriques(){
		
        tableauxDesBrique.forEach(function (bb, index, tab) {
            bb.draw(ctx);
            
        });
		
    }
	

    function testeCollisionBalleAvecMurs(b,index){
        if (((b.x + b.rayon) > width) || ((b.x - b.rayon) < 0)) {
            b.vx = -b.vx;

        }
        if (((b.y - b.rayon) < 0)) {
            b.vy = -b.vy;
        }

        if ((b.y + b.rayon) > height) {
            score++;
            tableauxDesBalles.splice(index, 1);
        }
    }
    function testeCollisionMonstreAvecMurs(){
        if ((monstre.x + monstre.width) > canvas.width) {
            monstre.x = canvas.width - monstre.width;
            monstre.v = -monstre.v;
        } else if (monstre.x < 0) {
            monstre.x = 0;
            monstre.v = -monstre.v;
        }
    }

    function displayMessage(ctx, message){
        if (message != null) {
            let fontSize = 20;
            ctx.save();
            ctx.font = fontSize + 'px Courier';
			ctx.fillStyle="white"

            ctx.fillText(message, 150, 40);
            ctx.restore();
        }
    }
	function displayMessage2(ctx, message,x){
        if (message != null) {
            let fontSize = 20;
            ctx.save();
            ctx.font = fontSize + 'px Courier';
			ctx.fillStyle="white"

            ctx.fillText(message, x, 40);
            ctx.restore();
        }
    }

    function timeOutFunction(){
        creerDesBalles(1);
		
        if(etat=="deroulement"){
            setTimeout(timeOutFunction, 3000/niveau);
        }
    }

    function setEtat(newEtat){
        etat = newEtat;
        if(newEtat=="deroulement"){
            setTimeout(timeOutFunction, 3000/niveau);
        }
    }

    function getEtat(){
        return etat;
    }
	 function getCanvas(){
        return canvas;
    }

    function positionBar(position){
        bar.x = position;
    } 

    function start(){
        console.log("la page est chargée");
        initFPS();
        canvas = document.querySelector("#myCanvas");
        this.canvas = canvas;
        console.log(canvas);
        // console.log(canvas);
        width = canvas.width;
        height = canvas.height; // pratique de les avoir globaux
        ctx = canvas.getContext('2d'); // autre possibilité 'webgl' pour la 3D
        // creerDesBalles(10);
		
        bar = new Bar(width / 2, height - 100, "black", 0, 0, 100, 20)

        creerLesEcouteurs();

        initNiveau();
		
        requestAnimationFrame(mainLoop);
    }

   

    return {
		
        start: start,
        getEtat: getEtat,
        setEtat: setEtat,
        initNiveau: initNiveau,
        getCanvas: getCanvas,
        positionBar: positionBar,
		onSamplesDecoded:onSamplesDecoded
    }


}