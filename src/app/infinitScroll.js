import { ViewPort } from "./viewPort";
import { prependListener } from "cluster";

class InfinitScroll {
  constructor(){
    this.detecteLimitScroll()
  }
  detecteLimitScroll(){
    window.addEventListener('scroll' , ()=>{

      let allImage = document.querySelectorAll('.galerie__images .images');
      let container = document.querySelector('.galerie__images');
      let images = allImage[0];
      let imagesMemo = allImage[1];

      let main = document.querySelector('main')
      let veiwport = new ViewPort( imagesMemo , 'top' , 'top'  )
      veiwport.detectViewport((callback)=>{
        if (callback) {
        // let image = images ;
        // images.remove();
        container.appendChild(images)
        }
      })
    })
  }
}


export { InfinitScroll } 