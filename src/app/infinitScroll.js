import { ViewPort } from "./viewPort";
import { prependListener } from "cluster";

class InfinitScroll {
  constructor(){
    this.elements = document.querySelectorAll('.images');
    this.scaleDeformation = 0 ;
    this.container = document.querySelector('.galerie__images');
    this.cloneImage()
    // this.detecteLimitScroll();
    // this.clearDeformation();
  }
  cloneImage(){
    let allImage = document.querySelectorAll('.galerie__images .images');
    let cln = allImage[0].cloneNode(true)
    let cln2 = allImage[0].cloneNode(true)
    this.container.appendChild(cln)
    this.container.appendChild(cln2)
    console.log(cln)
  }

  detecteLimitScroll(){
    window.addEventListener('scroll' , ()=>{
      if ( this.scaleDeformation < 1) {
        this.scaleDeformation  = 1 ;
        this.deformpation()
      }
      let allImage = document.querySelectorAll('.galerie__images .images');
      let images = allImage[0];
      let imagesMemo = allImage[2];
      let veiwport = new ViewPort( imagesMemo , 'bottom' , 'top'  )
      veiwport.detectViewport((callback)=>{
        if (callback) {
        this.container.appendChild(images);
        }
      })
    })
  }
  deformpation(){
    
  }
  clearDeformation(){
    setInterval(() => {
    }, 100);
  }
}


export { InfinitScroll } 