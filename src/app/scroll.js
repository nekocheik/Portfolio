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
            this.positionX = this.positionX - 0.1;
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
            this.inversion = true;
          }
        });
      })
    }
    
  };
  
  
  
  
//   document.addEventListener('touchstart' , function(evnt){
//     startClientY = evnt.changedTouches[0].clientY ;
//     document.addEventListener('touchmove' , function(event){
//       let touchDelta = ( event.changedTouches[0].clientY - startClientY );
//       if (touchDelta < -1 ) {
//         touchDelta = touchDelta.toString();
//         touchDelta = touchDelta.replace(/-/, ' ')
//         touchDelta = ( Number(touchDelta) / 100 ) * 30;
//       }else{
//         return
//       }
//       if( delta < 0 ){
//         delta = delta + touchDelta ;
//         if (delta > 0 ) {
//           delta = 0 ;
//           changeOfProject();
//         }if (delta < -100 ) {
//           delta = -100
//         }
//         scrollBarre.style.transform = `translateX( ${delta}vw)`
//       }
//     })
//     document.addEventListener('touchend' , function(e){
//       startClientX = e.changedTouches[0].clientX
//     })
//   });
// }
// }) 
// }




export{ SrollPosition  };















