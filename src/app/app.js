import { setTimeout } from "timers";

var scrollBarre = document.querySelector('.sroll__barre');
var delta = -100 ;
var memo = 0 ;
var numberResizing = 0;

scrollBarre.style.transform = `translateX( ${delta}vw)`
document.addEventListener("mousewheel",  function(event){
  numberResizing++;
  if( delta < 0 ){
    delta = delta + ( event.deltaY / 3);
    if (delta > 0 ) {
      delta = 0 ;
      changeOfProject()
    }
    scrollBarre.style.transform = `translateX( ${delta}vw)`
    clearInterval(resizeBarreIterval);
  }

  setTimeout(( ) => {
    memo++;
    if (  numberResizing <= memo ) {
      console.log( numberResizing , memo )
      resizeBarreIterval =  setInterval( () =>{
        resizeBarre()
      }  , 10 )
    }
  } , 2000 )
  
})

var resizeBarreIterval =  setInterval( () =>{
  resizeBarre()
}  , 100 )

function resizeBarre() {
  if( delta > -100 ){
    delta = delta - 1 ;
    scrollBarre.style.transform = `translateX( ${delta}vw)`
  }
}

var numberProject = 0 ;
var projects = {
  Armani : {
    title : 'ARMANI',
    type : 'Projet personnel' ,
    numberProject : '1',
    subTitle : 'Projet : intégration',
    description: `Réaliser un redesign du site Armani dans le quel j’ai du fair le design des pages News , Produits et de la home page.
    J’ai aussi intégré de tout le site en Mobile first responsive. `,
    skills : ['xd' , 'JavaScript' , 'Rellax' , 'Html' , 'Sass'] ,
    assets : [ require('../assets/armani__home__page.png'),]
  },
  SOCOMPTOIR : {
    title : 'SO’COMPTOIR',
    type : 'Projet école' ,
    numberProject : '2',
    subTitle : 'Projet : UI / UI',
    description: `Réaliser un redesign pour un site 
    E-commer de vente de salade en ligne.</br>
    Pour ce projet nous étions une équipe de 4 dans la quelle j’étais Chef de projet `,
    skills : ['xd' , 'illustrator'] ,
    assets : [ require('../assets/armani__home__page.png'),]
  }
}

function changeOfProject (){

}