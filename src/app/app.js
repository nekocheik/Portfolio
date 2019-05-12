import { setTimeout } from "timers";
import { renderNavProject } from "./renderNavProject";

import {SrollPosition } from "./scroll";
import { animation } from "./animation";
import { menuBurge} from "./MenuBurger";


animation();
menuBurge();

let srollPosition = new SrollPosition( document.querySelector('.sroll__barre') );
srollPosition.detectScroll()

//  animation: rotationCircle 20s infinite  ;

var svg = document.querySelectorAll('#circleWhite g')

console.log(svg)



var mouse = function(){
  window.addEventListener('mousemove', (event)=>{
    let elipse = document.querySelector('.cursor.cursor__Two') ;
    let cicle = document.querySelector('.cursor__one') ;

    givPotionPointer( cicle , event )
    givPotionPointer( elipse , event )

  }) 
}

let givPotionPointer = function ( element , event ){
  let x =  event.clientX  - ( element.getBoundingClientRect().width / 2 ) ;
  let y =  window.pageYOffset + event.clientY  - ( element.getBoundingClientRect().height / 2 )
  
  element.style.left = `${x}px`
  element.style.top = `${y}px`
}


mouse();

// console.log( srollPosition  )


// document.addEventListener('mousemove', function(event){
//   const x = event.pageX;
//   const y = event.pageY;

//   const target = document.querySelector('.projects')
//   const targetCoords = target.getBoundingClientRect()

//   const targetX = targetCoords.left + ( target.offsetWidth / 2);
//   const targetY = targetCoords.top + ( target.offsetHeight / 2);

//   console.log(targetCoords)

//   const angleX = ( targetY - y ) / 105 ;
//   const angleY = ( targetX - x ) / 105 ;

//   target.style.transform = "rotateX("+ angleX +"deg) rotateY("+ angleY +"deg)"

// })
