var viewPort = function(element , touch , callback , callbackinvers ){
  window.addEventListener('scroll', function(event){
    let positionScreenBottom =  window.pageYOffset + window.innerHeight ;
    let positionScreenTop =  window.pageYOffset ;
    let top = element.clientHeight + window.innerHeight;
    // console.log(positionScreenBottom  >= top  , positionScreenBottom  , top  )
    if (touch === 'top') {
      if (  positionScreenBottom  <= top ) {
        callback(true)
      }else{
        callback(false)
      }
    }else{
      if (  positionScreenBottom  >= top ) {
        callback(true)
      }else{
          callback(false)
      }
    }
  })
}

export{viewPort}