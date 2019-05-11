import {ViewPort} from "./viewPort";



var animation = function (params) {
  let  titleProjet = document.querySelector('.projects h2')
  let viewPort = new ViewPort(titleProjet) ;
  viewPort.detectViewport( function(callback){
    if( callback ){
      titleProjet.classList.add('transtision')
    }else{
      titleProjet.classList.remove('transtision')
    }
  })

}

export{animation}