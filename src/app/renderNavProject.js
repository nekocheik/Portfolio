import { projects } from './project'; 
import { changeOfProject , numberProject }from './changeOfProject'; 
var renderNavProject = function (project){
  let nav = document.querySelector('.nav__project p');
  console.log(numberProject)
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




export{ renderNavProject }