import {  changeOfProject  } from './changeOfProject';
import { ViewPort } from "./viewPort";

class SrollPosition  {
  
  constructor( element ){
    this.element = element ;
    this.positionX = -100;
    this.numberMove = 0 ;
    this.memoNumberMove = this.numberMove ;
    this.inversion = false;
    this.waitTime = false ;
  };
  detectScroll(){
    
    let viewPort = new ViewPort( document.querySelector('body') , 'bottom' , 'bottom' ) ;
    let bottomPage = false ;
    
    this.element.style.transform = `translateX( ${this.positionX}vw)`;
    this.inversionPosition();
    this.detectSwipe()
    
    document.addEventListener("mousewheel", (event)=>{
      
      viewPort.detectViewport( (callback)=>{
        if( callback ){
          bottomPage = true ;
        }
      })
      
      if (!bottomPage) {
        return
      }
      
      
      if( this.positionX < 0 ){
        this.positionX = this.positionX + ( event.deltaY );
        
        if (this.positionX >= 0 &&  !this.waitTime  ) {
          this.positionX = 0 ;
          changeOfProject()
          
          this.waitTime = true
          setTimeout(()=>{
            this.waitTime = false ; 
          }, 1500)
          
        }if (this.positionX < -100 ) {
          this.positionX = -100
        }if ( this.positionX >= 0 ) {
          this.positionX = 0 ;
        }
        this.element.style.transform = `translateX( ${this.positionX}vw)`
        this.inversion = true;
      }
    })};
    
    inversionPosition(){
      setInterval(() => {
        if (this.inversion) {
          if (this.positionX > -100 ) {
            this.positionX = this.positionX - 0.3;
            this.element.style.transform = `translateX( ${this.positionX}vw)`
          }else{
            this.inversion = false;
          }
        }
      }, 10);
    };
    
    
    detectSwipe(){
      
      document.addEventListener('touchstart' , (evnt)=>{
        let startClientY = evnt.changedTouches[0].clientY ;
        let viewPort = new ViewPort( document.querySelector('body') , 'bottom' , 'bottom' ) ;
        let bottomPage = false ;
        
        document.addEventListener('touchmove' , (event)=>{
          
   
          viewPort.detectViewport( (callback)=>{
            if( callback ){
              bottomPage = true ;
            }
          })
      
          if (!bottomPage) {
            return
          }

          this.inversion = false;
          let touchDelta = event.changedTouches[0].clientY  - startClientY ;
          
          if (touchDelta < 0 ) {
            touchDelta = touchDelta.toString();
            touchDelta = touchDelta.replace(/-/, ' ')
            touchDelta = ( Number(touchDelta) / 100 ) * 100;
          }else{
            return
          }
          if( this.positionX < 0 ){
            this.positionX = this.positionX + 5;
            if (this.positionX > 0 ) {
              this.positionX = 0 ;
              changeOfProject();
            }if ( this.positionX < -100 ) {
              this.positionX = -100
            }
            this.element.style.transform = `translateX( ${this.positionX}vw)`
            this.checkInversionPosition(this.positionX)
          }
        });
        
        document.addEventListener('touchstart' , (event)=>{
          startClientY = 0 ;
        })
      })
    }
    
    checkInversionPosition(positionX){
      positionX = positionX ;
      setTimeout(()=>{
        if (positionX = this.position || this.positionX === 0 ) {
          this.inversion = true;
        }
      }, 1500)
    }
    
  };
  
  
  
  export{ SrollPosition  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  