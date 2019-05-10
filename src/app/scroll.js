import {  changeOfProject  } from './changeOfProject';
import {viewPort} from './viewPort';

function scrollCK() {
  let element = document.querySelector('.type__of__projet');
  viewPort ( element , 'bottom' , (start)=>{
    if (start) {
      ///______________________________________________scroll
      var scrollBarre = document.querySelector('.sroll__barre');
      var delta = -100 ;
      var memo = 0 ;
      var numberResizing = 0;
      
      scrollBarre.style.transform = `translateX( ${delta}vw)`
      document.addEventListener("mousewheel",  function(event){
        numberResizing++;
        if( delta < 0 ){
          delta = delta + ( event.deltaY / 3);
          if (delta >= 0 ) {
            delta = 0 ;
            changeOfProject()
          }if (delta < -100 ) {
            delta = -100
          }
          scrollBarre.style.transform = `translateX( ${delta}vw)`
          clearInterval(resizeBarreIterval);
        }
        
        setTimeout(( ) => {
          memo++;
          if (  numberResizing <= memo ) {
            resizeBarreIterval =  setInterval( () =>{
              resizeBarre()
            }  , 10 )
          }
        } , 400 )
        
      })
      
      var resizeBarreIterval =  setInterval( () =>{
        resizeBarre()
      }  , 100 )
      
      function resizeBarre() {
        if( delta > -100 ){
          delta = delta - 2 ;
          scrollBarre.style.transform = `translateX( ${delta}vw)`
        }
      }
      
      
      let startClientY  ;
      document.addEventListener('touchstart' , function(evnt){
        startClientY = evnt.changedTouches[0].clientY ;
        document.addEventListener('touchmove' , function(event){
          let touchDelta = ( event.changedTouches[0].clientY - startClientY );
          if (touchDelta < -1 ) {
            touchDelta = touchDelta.toString();
            touchDelta = touchDelta.replace(/-/, ' ')
            touchDelta = ( Number(touchDelta) / 100 ) * 30;
          }else{
            return
          }
          if( delta < 0 ){
            delta = delta + touchDelta ;
            if (delta > 0 ) {
              delta = 0 ;
              changeOfProject();
            }if (delta < -100 ) {
              delta = -100
            }
            scrollBarre.style.transform = `translateX( ${delta}vw)`
          }
        })
        document.addEventListener('touchend' , function(e){
          startClientX = e.changedTouches[0].clientX
        })
      });
    }
  }) 
}

export{ scrollCK }