
import { projects  } from './project'; 

var Theproject = function ( numberProject ){
  
  let main =  document.querySelector('main') ;
  main.innerHTML = '';
  

  var view = viewPoject( numberProject );
  main.append(view.project)

  document.querySelector('body').id = "page__project";


}

function viewPoject( numberProject ){

  var view = {
    project : document.createElement('div'),
    titlOfProject : document.createElement('div'),
    description : document.createElement('section') ,
    descriptionText :  document.createElement('section') ,
    descriptionSkills :  document.createElement('div'),
    ul : document.createElement('ul'),
    button :  document.createElement('section'), 
    illustrationOfProject : document.createElement('div'),
    render: function() {
     this.titlOfProject.innerHTML = `<h1 class="${projects[numberProject].modifier}">${projects[numberProject].title}</h1><h2 class="type__of__projet" >${projects[numberProject].subTitle}</h2>`;
     this.descriptionText.innerHTML = `<p>${projects[numberProject].description}</p>`;
     projects[numberProject].skills.forEach(element => {
      this.ul.innerHTML += `<li>${element}</li>` ;
     });
     this.button.innerHTML = `<a><p>${projects[numberProject].button}</p></a>`
    },
  }


  view.project.className = "project" ;
  view.titlOfProject.className = "title__of__project";
  view.descriptionText.className = "description__text" ;
  view.description.className = "description";
  view.descriptionSkills.className = "description__skills";

  view.descriptionSkills.append(view.ul)
  view.descriptionText.append( view.descriptionSkills )


  view.description.append( view.descriptionText )
  
  view.titlOfProject.append( view.description )
  view.project.append( view.titlOfProject )
  
  view.render();
  return view ;
}



export{ Theproject }