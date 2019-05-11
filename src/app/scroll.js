import {  changeOfProject  } from './changeOfProject';


class SrollPosition  {
  
  constructor( element ){
    this.element = element ;
    this.positionX = -100;
    this.numberMove = 0 ;
    this.memoNumberMove = this.numberMove ;
    this.inversion = false;
  };
  detectScroll(){
    
    this.element.style.transform = `translateX( ${this.positionX}vw)`;
    this.inversionPosition();
    this.detectSwipe()
    
    document.addEventListener("mousewheel", (event)=>{
      if( this.positionX < 0 ){
        this.positionX = this.positionX + ( event.deltaY / 3);
        if (this.positionX >= 0 ) {
          this.positionX = 0 ;
          changeOfProject()
        }if (this.positionX < -100 ) {
          this.positionX = -100
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
        document.addEventListener('touchmove' , (event)=>{
          this.inversion = false;
          let touchDelta = ( event.changedTouches[0].clientY - startClientY );
          if (touchDelta < 0 ) {
            touchDelta = touchDelta.toString();
            touchDelta = touchDelta.replace(/-/, ' ')
            touchDelta = ( Number(touchDelta) / 100 ) * 30;
          }else{
            return
          }
          if( this.positionX < 0 ){
            this.positionX = this.positionX + touchDelta ;
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
      })
    }
    
    checkInversionPosition(positionX){
      positionX = positionX ;
      setTimeout(()=>{
        console.log(positionX , this.positionX)
        if (positionX = this.position || this.positionX === 0 ) {
          this.inversion = true;
        }
      }, 1500)
    }
    
  };
  
  
  
  export{ SrollPosition  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  