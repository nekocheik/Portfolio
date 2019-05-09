import {renderChangeOfProject , projects ,  numberProject } from './app';

var renderNavProject = function (project){
  let nav = document.querySelector('.nav__project p');
  console.log(nav)
  nav.classList.add('trasition__back');
  setTimeout(()=>{
    nav.innerHTML = "" ;
    nav.className = "trasition__come";
    setTimeout(()=>{
      nav.innerHTML = numberProject + 1;
      nav.className = "";
    }, 200)
  }, 400)

}




export{renderNavProject}