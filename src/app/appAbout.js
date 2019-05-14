import { cursor } from "./cursor" ;
import { menuBurge} from "./MenuBurger";
import { InfinitScroll } from "./infinitScroll";
import { ViewPort } from "./viewPort";
menuBurge();

var infinitScroll = new InfinitScroll();
infinitScroll.detecteLimitScroll();
if ( window.innerWidth > 800 ) {
  console.log(window.innerWidth)
  cursor();
}


