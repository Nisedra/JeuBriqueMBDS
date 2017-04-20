/* jshint esnext: true */

var audioContext = window.AudioContext || window.webkitAudioContext;

var ctx = new audioContext();

/* decodeAudioData */

const snareDrumURL = '/audio/jeu.mp3';



function loadSample(url){
          console.log('done');
    // Cette fonction renvoie  une "promesse", soit avec
    // un succès (appel de resolve()) soit par un echec (erreur ou appel
    // de reject()).
    // Ca permet de traiter le résultat de loadSample() avec des then...
    return new Promise(function(resolve, reject){
        // ICI ON CHARGE UN SON AVEC FETCH
        fetch(url)
        .then((response) => {
            return response.arrayBuffer(); // arrayBuffer = binaire (un son)
                                           // response.arrayBuffer transforme
                                            // la données recue (texte, c'est le mp3
                                            // encodé en texte, HTTP et HTTPS = que du texte,
                                            // ici un encodage base 64)
        })
        .then((buffer) =>{
          // Ici on a du binaire, le vrai mp3. Mais dans un jeu
          // pour que ça puisse être utilisé super vite, sans décodage qui
          // mange du cpu, sans streaming qui fait que le son ne sera
          // peut être pas prêt, on vient de le charger
          // on le décode et on le met en mémoire.
          // la ligne ci-dessous utilise la WebAudio API, standard du W3C
          // et présente dans votre navigateur
            ctx.decodeAudioData(buffer, (decodedAudioData) =>{
              // voilà ici on a le son décodé (equivalent à .wav)
              // la syntaxe => s'appelle "arrow function de ES6
              // et permet une syntaxe simplifiée pour une fonction 
              // sans nom qui renvoie quelque chose.
              
              // resolve ici permet de traiter la réponse avec un then
              // côté appelant, elle est lié à la définition
              // d'une promesse quelques lignes plus haut.
                resolve(decodedAudioData);
            });
        });
    });
}

// GROS AVANTAGE : on peut grouper les fonctions asynchrones qui vont
// charger des fichiers en ajax, et faire des jointures, ICI LA SYNTAXE
// D'UNE TELLE JOINTURE : 
const samples = Promise.all([loadSample(snareDrumURL)])
.then(onSamplesDecoded); // onSamplesDecoded appelé quand les deux fichiers sont
                         // arrivés et ont été décodés

function playSample(buffer){
    // buffer = un son décodé en mémoire
    // on utilise la WebAudio API pour 
    // jouer le son. Voir semaine 1 du MOOC HTML5 part 1
  
    // cree un buffer. Ne peut être joué qu'une seule fois
    // il faut le recréer à chaque fois.
    const bufferSource = ctx.createBufferSource();
    bufferSource.buffer = buffer;
    // ctx.destination = le haut parleur, la sortie audio
    bufferSource.connect(ctx.destination);
  
    // joue le son
    bufferSource.start();
}

function onSamplesDecoded(buffers){
        
        playSample(buffers[0]);
    
}