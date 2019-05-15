import { setTimeout } from "timers";
import { renderNavProject } from "./renderNavProject";
import { cursor } from "./cursor" ;
import {SrollPosition } from "./scroll";
import { animation } from "./animation";
// import { menuBurger} from "./MenuBurger";


animation();
// new menuBurger();
if ( window.innerWidth > 800 ) {
  cursor();
}


let srollPosition = new SrollPosition( document.querySelector('.sroll__barre') );
srollPosition.detectScroll()