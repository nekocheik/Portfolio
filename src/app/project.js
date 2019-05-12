
var projects = [
  {
    title : 'ARMANI',
    type : 'Projet personnel' ,
    numberProject : '1',
    subTitle : 'Projet : intégration',
    description: `Réaliser un redesign du site Armani dans le quel j’ai du fair le design des pages News , Produits et de la home page.
    J’ai aussi intégré de tout le site en Mobile first responsive. `,
    skills : ['xd' , 'JavaScript' , 'Rellax' , 'Html' , 'Sass'] ,
    assets : {
      pesentation : require('../assets/MontreConnecter.svg')
    },
    button : 'VISITER LE SITE' ,
    modifier : 'armani'
  },
  {
    title : 'SO’COMPTOIR',
    type : 'Projet école' ,
    numberProject : '2',
    subTitle : 'Projet : UI / UI',
    description: `Réaliser un redesign pour un site 
    E-commer de vente de salade en ligne.</br>
    Pour ce projet nous étions une équipe de 4 dans la quelle j’étais Chef de projet `,
    skills : ['xd' , 'illustrator'] ,
    assets : {
      pesentation : require('../assets/logoSocomptoir.svg') ,
    },
    link : require('../pages/So__comptoir.html') , 
    button : 'REGARDER LES MAQUETTES' ,
    modifier : 'so_comptoir'
  },{
    title : 'SPACE-INVADERS',
    type : 'Projet personnel' ,
    numberProject : '3',
    subTitle : 'Projet : Javascript',
    description: `Réaliser la création d’un jeu original en JavaScript.
    J’ai fait Le jeu en Canvas JavaScript natif sans l’utilisation d’aucune librairie .
    Avec l’ajout d’éléments de gamplay qui ne sont pas dans le jeu original  `,
    skills : ['JavaScript' , 'Canvas' , 'Html' , 'Sass'] ,
    link : '',
    assets : {
      pesentation : require('../assets/alien.svg') ,
    },
    button : 'JOUER AU JEU' ,
    modifier : 'space_invaders'
  }
]


export{ projects  }

