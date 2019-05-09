import { setTimeout } from "timers";
import { renderNavProject } from "./renderNavProject";


var nav = document.querySelector('nav');
nav.addEventListener('click', function(){
  let p =  nav.querySelectorAll('p');
  if(p[0].classList.value[0] !== 'active'){
    for (let i = 0; i < p.length; i++) {
      p[i].classList.add('active')
    }
    nav.querySelector('.croi').classList.add('active')
  }
} , true)

nav.querySelector('.croi').addEventListener('click', function(){
  let p =  nav.querySelectorAll('p');
  for (let i = 0; i < p.length; i++) {
    p[i].classList.remove('active')
  }
  nav.querySelector('.croi').classList.remove('active')
}, true )

window.addEventListener('scroll', function ( event ) {
  let p = nav.querySelector('p');
  if ( p.className === 'active' ) {
    nav.classList.add('move')
  }
  window.clearTimeout( isScrolling );
  let isScrolling = setTimeout(function() {
    nav.classList.remove('move')
  }, 1000);
}, false);

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
    if (delta >= 0 ) {
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
      resizeBarreIterval =  setInterval( () =>{
        resizeBarre()
      }  , 10 )
    }
  } , 400 )
  
})

var resizeBarreIterval =  setInterval( () =>{
  resizeBarre()
}  , 100 )

function resizeBarre() {
  if( delta > -100 ){
    delta = delta - 2 ;
    scrollBarre.style.transform = `translateX( ${delta}vw)`
  }
}


let startClientX  ;
document.addEventListener('touchstart' , function(evnt){
  startClientX = evnt.changedTouches[0].clientX ;
  document.addEventListener('touchmove' , function(event){
    let touchDelta = ( event.changedTouches[0].clientX - startClientX );
    if (touchDelta < -1 ) {
      touchDelta = touchDelta.toString();
      touchDelta = touchDelta.replace(/-/, ' ')
      touchDelta = Number(touchDelta) / 100 ;
    }else{
      return
    }
    if( delta < 0 ){
      delta = delta + touchDelta ;
      if (delta > 0 ) {
        delta = 0 ;
        changeOfProject();
      }if (delta < -100 ) {
        delta = -100
      }
      scrollBarre.style.transform = `translateX( ${delta}vw)`
    }
  })
  document.addEventListener('touchend' , function(e){
    startClientX = e.changedTouches[0].clientX
  })
});


var numberProject = 0 ;
var projects = [
  {
    title : 'ARMANI',
    type : 'Projet personnel' ,
    numberProject : '1',
    subTitle : 'Projet : intégration',
    description: `Réaliser un redesign du site Armani dans le quel j’ai du fair le design des pages News , Produits et de la home page.
    J’ai aussi intégré de tout le site en Mobile first responsive. `,
    skills : ['xd' , 'JavaScript' , 'Rellax' , 'Html' , 'Sass'] ,
    assets : {
      pesentation : require('../assets/MontreConnecter.svg')
    },
    modifier : 'armani'
  },
  {
    title : 'SO’COMPTOIR',
    type : 'Projet école' ,
    numberProject : '2',
    subTitle : 'Projet : UI / UI',
    description: `Réaliser un redesign pour un site 
    E-commer de vente de salade en ligne.</br>
    Pour ce projet nous étions une équipe de 4 dans la quelle j’étais Chef de projet `,
    skills : ['xd' , 'illustrator'] ,
    assets : {
      pesentation : require('../assets/logoSocomptoir.svg') ,
    },
    modifier : 'so_comptoir'
  },{
    title : 'SPACE-INVADERS',
    type : 'Projet personnel' ,
    numberProject : '3',
    subTitle : 'Projet : Javascript',
    description: `Réaliser la création d’un jeu original en JavaScript.
    J’ai fait Le jeu en Canvas JavaScript natif sans l’utilisation d’aucune librairie .
    Avec l’ajout d’éléments de gamplay qui ne sont pas dans le jeu original  `,
    skills : ['JavaScript' , 'Canvas' , 'Html' , 'Sass'] ,
    assets : {
      pesentation : require('../assets/alien.svg') ,
    },
    modifier : 'space_invaders'
  }
]



function changeOfProject() {
  renderChangeOfProject();
}

function renderChangeOfProject() {
  var project = document.querySelector('.project')
  project.classList.add('back');
  setTimeout(() => {
    project.innerHTML = "";
    numberProject++;
    
    if ( numberProject > projects.length - 1) {
      numberProject = 0
    }
    
    var view = ChangeOfProjectView(projects[numberProject]);
    project.appendChild(view.illustrationOfProject)
    project.appendChild(view.titlOfProject);
    setTimeout( ()=>{
      renderNavProject(project)
      
      project.classList.remove('back');
      project.classList.add('come');
      setTimeout( ()=>{
        project.classList.remove('come');
      }, 40)
    }, 500 )
  }, 500);
}

var ChangeOfProjectView = function(project) {
  var view = {
    img : document.createElement('img'),
    titlOfProject : document.createElement('div'),
    illustrationOfProject : document.createElement('div'),
    render: function() {
      this.img.src = project.assets.pesentation;
      this.illustrationOfProject.appendChild(this.img);
      this.titlOfProject.innerHTML = `<h3 class='${project.modifier}'>${project.title}</h3> <h4 class="type__of__projet" >${project.subTitle}</h4>`;
    },
  }
  
  view.illustrationOfProject.className = 'illustration__of__project';
  view.titlOfProject.className = 'title__of__project';
  view.render();
  return view
}



export{renderChangeOfProject , projects ,  numberProject }