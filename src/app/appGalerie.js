import { cursor } from "./cursor" ;
import { menuBurger} from "./MenuBurger";
import { InfinitScroll } from "./infinitScroll";
import { ViewPort } from "./viewPort";
new menuBurger();

var infinitScroll = new InfinitScroll();
infinitScroll.detecteLimitScroll();
if ( window.innerWidth > 800 ) {
  console.log(window.innerWidth)
  cursor();
}


