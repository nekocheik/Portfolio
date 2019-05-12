class ViewPort {
  constructor( element , elementPartTouch = 'top' , bodyPartTouch  = 'bottom' ){
    this.element = element ;
    this.body = {
      bottom: element.getBoundingClientRect().bottom,
      left: element.getBoundingClientRect().left ,
      right: element.getBoundingClientRect().right ,
      top: element.getBoundingClientRect().top ,
    }
    
    this.screen = {
      positionScreenBottom : null ,
      positionScreenTop : null,
    }
    
    this.elementPartTouch = elementPartTouch ;
    this.screenPartTouch = bodyPartTouch ;
    
    this.topNegatif()
    
  }
  
  detectViewport( callback ){
    window.addEventListener('scroll', (event)=>{

      this.screen.positionScreenBottom =  window.pageYOffset + window.innerHeight ;
      this.screen.positionScreenTop  =  window.pageYOffset ;
      
      if ( this.elementPartTouch  === 'top') {
        if (this.screenPartTouch  === 'bottom') {
          if ( this.body.top <= this.screen.positionScreenBottom ) {
            return callback(true)
          }else{
            return callback(false)
          }
        }else{
          if ( this.body.top >= this.screen.positionScreenBottom ) {
            return callback(true)
          }else{
            return callback(false)
          }
        }
      }else{
        if ( this.screenPartTouch  === 'bottom') {
          console.log( this.body.bottom <= this.screen.positionScreenBottom  ,  this.body.bottom , this.screen.positionScreenBottom)
          if ( this.body.bottom <= this.screen.positionScreenBottom ) {
            return callback(true)
          }else{
            return callback(false)
          }
        }else{
          if ( this.body.bottom <= this.screen.positionScreenTop ) {
            return callback(true)
          }else{
            return callback(false)
          }
        }
      }
    })
  }
  
  topNegatif(){
    if ( this.body.top < 0 ) {
      this.body.top =  String(this.body.top) ;
      this.body.top = this.body.top.substr(1);
      this.body.top = Number( this.body.top )
      this.body.bottom = this.body.bottom + this.body.top  ;
    }
  }
}












// var viewPort = function(element , touch , callback , callbackinvers ){
//   window.addEventListener('scroll', function(event){
//     let positionScreenBottom  =  window.pageYOffset + window.innerHeight ;
//     let positionScreenTop =  window.pageYOffset ;
//     let top = element.clientHeight + window.innerHeight;
//     // console.log(positionScreenBottom  >= top  , positionScreenBottom  , top  )
//     if (touch === 'top') {
//       if (  positionScreenBottom  <= top ) {
//         callback(true)
//       }else{
//         callback(false)
//       }
//     }else{
//       if (  positionScreenBottom  >= top ) {
//         callback(true)
//       }else{
//           callback(false)
//       }
//     }
//   })
// }


export{ViewPort}