import { cursor } from "./cursor" ;
import {SrollPosition } from "./scroll";
import { animation } from "./animation";
import { menuBurge} from "./MenuBurger";



menuBurge();



// console.log( srollPosition  )


// document.addEventListener('mousemove', function(event){
//   const x = event.pageX;
//   const y = event.pageY;

//   const target = document.querySelector('.projects')
//   const targetCoords = target.getBoundingClientRect()

//   const targetX = targetCoords.left + ( target.offsetWidth / 2);
//   const targetY = targetCoords.top + ( target.offsetHeight / 2);


//   const angleX = ( targetY - y ) / 105 ;
//   const angleY = ( targetX - x ) / 105 ;

//   target.style.transform = "rotateX("+ angleX +"deg) rotateY("+ angleY +"deg)"

// })

























import { projects  } from './project'; 

var Theproject = function ( numberProject ){
  let main =  document.querySelector('main') ;
  let name = document.querySelector('.name__and__profession')

  name.innerHTML = '';
  
  TweenLite.to(".circlesWhite", 5, 
  {css:{    
    animation: 'rotationCircle initial initial' ,
    zIndex: '-100',
  },
  ease:Power2.easeOut});
  //////////
  TweenLite.to("#Ellipse_14 circle", 3, 
  {css:{    
    strokeDasharray: '10px' ,
    transitionDuration: '100ms' ,
  },
  ease:Power2.easeOut});
  
  TweenLite.to("#Ellipse_13", 3, 
  {css:{    
    strokeDasharray: '3259px',
    strokeDashoffset: '3259px',
    animation: 'write 3s forwards',
  },
  ease:Power2.easeOut});
  
  TweenLite.to("#Ellipse_12", 3, 
  {css:{    
    strokeDasharray: '1991px',
    strokeDashoffset: '1991px',
    animation: 'write 3s forwards',
  },
  ease:Power2.easeOut});
  
  TweenLite.to("#Ellipse_11", 3, 
  {css:{    
    strokeDasharray: '1301px',
    strokeDashoffset: '1301px',
    animation: 'write 3s forwards',
  },
  ease:Power2.easeOut});
  
  
  
  
  
  
  
  
if ( window.innerWidth < 800  ) {
    TweenLite.to(".circle", 3, 
    {css:{    
      top: "-100px",
      animation : "circleGoCenter 0s" ,
      position: 'sticky',
    }, 
    ease:Power2.easeOut});
  }else{
    TweenLite.to(".circle", 3, 
    {css:{    
      top: "-300px",
      width: "40vw",
      height: "40vw",
      animation : "circleGoCenter 0s" ,
    }, 
    ease:Power2.easeOut});
}
  
  setTimeout(() => {
    document.querySelector('body').id = "page__project";
    main.innerHTML = '';
  }, 3000);
  setTimeout(() => {
    
    var view = viewPoject( numberProject );
    main.append(view.project)
  }, 3500 );

}

function viewPoject( numberProject ){
  
  var view = {
    project : document.createElement('div'),
    titlOfProject : document.createElement('div'),
    description : document.createElement('section') ,
    descriptionText :  document.createElement('section') ,
    descriptionSkills :  document.createElement('div'),
    ul : document.createElement('ul'),
    button :  document.createElement('section'), 
    illustrationOfProject : document.createElement('div'),
    render: function() {
      this.titlOfProject.innerHTML = `<h1 class="${projects[numberProject].modifier}">${projects[numberProject].title}</h1><h2 class="type__of__projet" >${projects[numberProject].subTitle}</h2>`;
      this.descriptionText.innerHTML = `<p>${projects[numberProject].description}</p>`;
      projects[numberProject].skills.forEach(element => {
        this.ul.innerHTML += `<li>${element}</li>` ;
      });
      this.button.innerHTML = `<a><p>${projects[numberProject].button}</p></a>`
      
      this.descriptionSkills.append(view.ul)
      this.descriptionText.append( view.descriptionSkills )
      
      
      this.description.append( view.descriptionText )
      
      this.titlOfProject.append( view.description )
      this.project.append( view.titlOfProject )
    },
  }
  
  
  view.project.className = "project" ;
  view.titlOfProject.className = "title__of__project";
  view.descriptionText.className = "description__text" ;
  view.description.className = "description";
  view.descriptionSkills.className = "description__skills";
  
  view.render();
  return view ;
}



export{ Theproject }