import { setTimeout } from "timers";

///______________________________________________scroll
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
    }if (delta < -100 ) {
      delta = -100
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
  } , 10 )
  
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

let startClientX  ;
document.addEventListener('touchstart' , function(evnt){
  startClientX = evnt.changedTouches[0].clientX ;
  document.addEventListener('touchmove' , function(event){
    numberResizing++;
    let touchDelta = ( event.changedTouches[0].clientX - startClientX );
    //console.log(touchDelta)
    if (touchDelta < -1 ) {
      touchDelta = touchDelta.toString();
      touchDelta = touchDelta.replace(/-/, ' ')
      touchDelta = Number(touchDelta) / 100 ;
    }else{
      return
    }
    
    if( delta < 0 ){
      console.log(touchDelta)
      delta = delta + touchDelta ;
      if (delta > 0 ) {
        delta = 0 ;
      }if (delta < -100 ) {
        delta = -100
      }
      scrollBarre.style.transform = `translateX( ${delta}vw)`
      clearInterval(resizeBarreIterval);
    }
    
  })
  document.addEventListener('touchend' , function(e){
    startClientX = e.changedTouches[0].clientX
  })
});

