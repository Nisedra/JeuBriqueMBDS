function creerLesEcouteurs() {
  // Touches, sur window
  window.addEventListener('keydown', toucheEnfoncee);
  // window.addEventListener('keyup', toucheRelachee);
  
  // Ecouteurs de souris, on peut mettre sur le canvas
 
}

function creerLesEcouteursCanvas() {
  /*game.canvas.addEventListener('mouseup', boutonSourisRelache); 
 game.canvas.addEventListener('mousedown', boutonSourisEnfonce); //*/
 game.getCanvas().addEventListener('mousemove', sourisDeplacee); 
}


function retirerLesEcouteurs(){
  
  // Ecouteurs de souris, on peut mettre sur le canvas
 /*game.canvas.removeEventListener('mouseup', boutonSourisRelache); 
 game.canvas.removeEventListener('mousedown', boutonSourisEnfonce); //*/
 game.getCanvas().removeEventListener('mousemove', sourisDeplacee);
}
/*
function boutonSourisEnfonce(evt) {
  //console.log("bouton enfoncé");
  // Ca depend du sens !!!
  monstre.v = monstre.v *5;
}
function boutonSourisRelache(evt) {
  //console.log("bouton relache");
  monstre.v = Math.sign(monstre.v);
}//*/
function sourisDeplacee(evt) {
  // La ligne suivante tient compte des propriétés
  // du canvas (bordure, pos, marges etc.)
  let rect = game.getCanvas().getBoundingClientRect();
  let mx = evt.clientX - rect.left;
  let my = evt.clientY - rect.top;
  
  //console.log("mouse move x = " + mx + " y = " + my);
  game.positionBar(mx);
  
}
function toucheEnfoncee(evt) {
    //console.log("touche enfoncee key = " + evt.key);
  switch(evt.key) {
    /*case 'ArrowRight' :
      //console.log("fleche à droite");
      monstre.v = 1;  // CA VA LE FAIRE ALLER A DROITE
                      // CAR ON VA TESTER CA 60 fois
                      // PAR SECONDE DANS LA BOUCLE
                      // D'ANIMATION
      break;
    case 'ArrowLeft' :
      //console.log("fleche à gauche");
      monstre.v = -1;
      break;//*/
    case ' ' :
    //console.log(game.Etat);
    console.log(game);
      if(game.getEtat()=="gameStart"){
        creerLesEcouteursCanvas();
        game.setEtat("deroulement");
      }
      else if(game.getEtat()=="gameOver"){
        
        game.initNiveau();
        game.setEtat("gameStart");
      }
      break;
  }
}

function toucheRelachee(evt) {
    //console.log("touche relachee");
  monstre.vx = 0;
}
