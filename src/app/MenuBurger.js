class menuBurger {
  
  constructor(){
    this.navMenu = document.querySelector('nav');
    this.buttonCloseMenu =  document.querySelector('nav .croi');
    this.buttons = undefined;
    this.links = undefined;
    this.bool = false;
    this.quryButtonAndLink()
    this.openMenu();
    this.closeMenu();
  }
  quryButtonAndLink(){
    this.buttons = this.navMenu.querySelectorAll('p');
    this.links = this.navMenu.querySelectorAll('a');
  }
  openMenu(){
    this.links.forEach( button => {
      button.addEventListener( 'click', (e)=>{
        if ( this.buttonCloseMenu.className !== 'croi active'){
    
          this.links.forEach( link  => { link.classList.add('active') });
          this.buttons.forEach( button => { button.classList.add('active')});
          
          this.buttonCloseMenu.classList.add('active')
        }
      } , true);
    });
  }
  closeMenu(){
    this.buttonCloseMenu.addEventListener('click', ()=>{
      if ( this.buttonCloseMenu.className === 'croi active') {
        this.links.forEach( link  => { link.classList.remove('active') });
        this.buttons.forEach( button => { button.classList.remove('active')});
        this.buttonCloseMenu.classList.remove('active')
      }
    })
  }
  move(){
    window.addEventListener('scroll', function ( event ) {
      let p = nav.querySelector('p');
      if ( p.className === 'active' ) {
        nav.classList.add('move')
        var navLinks = document.querySelectorAll('nav a');
        navLinks.forEach( link => { link.classList.remove('active') });
      }
    })
  }
}


































//  var menuBurge = function(){
//   var nav = document.querySelector('nav');
//   nav.addEventListener('click', function(){
//     let p =  nav.querySelectorAll('p');
//     if(p[0].classList.value[0] !== 'active'){
//       for (let i = 0; i < p.length; i++) {
//         p[i].classList.add('active')
//       }
//       nav.querySelector('.croi').classList.add('active')
//       toogleLink()
//     }
//   } , true)

//   nav.querySelector('.croi').addEventListener('click', function(){
//     let p =  nav.querySelectorAll('p');
//     for (let i = 0; i < p.length; i++) {
//       p[i].classList.remove('active')
//       if( p[0].classList.value[0] !== 'active' ){
//         toogleLink();
//       }
//     }
//     nav.querySelector('.croi').classList.remove('active')
//   }, true )

//   window.addEventListener('scroll', function ( event ) {
//     let p = nav.querySelector('p');
//     if ( p.className === 'active' ) {
//       nav.classList.add('move')
//       var navLinks = document.querySelectorAll('nav a');
//       navLinks.forEach( link => { link.classList.remove('active') });
//     }

//     window.clearTimeout( isScrolling );

//     let isScrolling = setTimeout( ()=> {
//       nav.classList.remove('move');
//       var navLinks = document.querySelectorAll('nav a');
//       navLinks.forEach( link => { link.classList.remove('active') });
//     }, 1000);

//   }, true);

// }


// var toogleLink = function(){
//   var navLinks = document.querySelectorAll('nav a');
//   for (let index = 0; index < navLinks.length; index++) {
//     navLinks[index].classList.toggle('active')
//   }
// }
export{ menuBurger }