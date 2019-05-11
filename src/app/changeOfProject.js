
import { projects  } from './project'; 
import { renderNavProject } from './renderNavProject';  
var numberProject = 0 ;

function changeOfProject() {
  renderChangeOfProject();
}

function renderChangeOfProject() {
  var project = document.querySelector('.project')
  project.classList.add('back');
  setTimeout(() => {
    project.innerHTML = "";
    numberProject++;
    
    if ( numberProject > projects.length - 1) {
      numberProject = 0
    }
    
    var view = ChangeOfProjectView(projects[numberProject]);
    project.appendChild(view.illustrationOfProject)
    project.appendChild(view.titlOfProject);
    setTimeout( ()=>{
      renderNavProject(project)
      
      project.classList.remove('back');
      project.classList.add('come');
      setTimeout( ()=>{
        project.classList.remove('come');
      }, 60)
    }, 500 )
  }, 500);
}

var ChangeOfProjectView = function(project) {
  var view = {
    img : document.createElement('img'),
    titlOfProject : document.createElement('div'),
    illustrationOfProject : document.createElement('div'),
    render: function() {
      this.img.src = project.assets.pesentation;
      this.illustrationOfProject.appendChild(this.img);
      this.titlOfProject.innerHTML = `<h3 class='${project.modifier}'>${project.title}</h3> <h4 class="type__of__projet" >${project.subTitle}</h4>`;
    },
  }
  
  view.illustrationOfProject.className = 'illustration__of__project';
  view.titlOfProject.className = 'title__of__project';
  view.render();
  return view
}


export{ changeOfProject , numberProject }