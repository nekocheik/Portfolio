 var menuBurge = function(){
  var nav = document.querySelector('nav');
  nav.addEventListener('click', function(){
    let p =  nav.querySelectorAll('p');
    if(p[0].classList.value[0] !== 'active'){
      for (let i = 0; i < p.length; i++) {
        p[i].classList.add('active')
      }
      nav.querySelector('.croi').classList.add('active')
    }
  } , true)
  
  nav.querySelector('.croi').addEventListener('click', function(){
    let p =  nav.querySelectorAll('p');
    for (let i = 0; i < p.length; i++) {
      p[i].classList.remove('active')
    }
    nav.querySelector('.croi').classList.remove('active')
  }, true )
  
  window.addEventListener('scroll', function ( event ) {
    let p = nav.querySelector('p');
    if ( p.className === 'active' ) {
      nav.classList.add('move')
    }
    window.clearTimeout( isScrolling );
    let isScrolling = setTimeout(function() {
      nav.classList.remove('move')
    }, 1000);
  }, false);
}

export{ menuBurge}