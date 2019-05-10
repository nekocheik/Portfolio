import {viewPort} from "./viewPort";

var animation = function (params) {
  var  titleProjet = document.querySelector('.projects h2')
  viewPort( titleProjet , 'top' , function(respons){
    titleProjet.classList.add('transtision')
  }, function () {
    titleProjet.classList.remove('transtision')
  })
}

export{animation}