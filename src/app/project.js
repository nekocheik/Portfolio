
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
      pesentation : require('../assets/MontreConnecter.svg'),
      image0fProject : [ require('../assets/projets/armani/home__page.png') ,
      require('../assets/projets/armani/page_produits.png') ],
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
    E-commerce d’un bar à salade.
    Pour ce projet nous étions une équipe de quatre dans laquelle j’étais Chef de projet.
    Les maquette ……  `,
    skills : ['xd' , 'illustrator'] ,
    assets : {
      pesentation : require('../assets/logoSocomptoir.svg') ,
      image0fProject : [ 
      require('../assets/projets/so-comptoir/Page-S’inscrire.svg') ,  require('../assets/projets/so-comptoir/Home_page.svg') ,      require('../assets/projets/so-comptoir/Plan de travail – 1.svg')  ],
    },
    link : require('../pages/So__comptoir.html') , 
    button : 'REGARDER LES MAQUETTES' ,
    modifier : 'so_comptoir'
  },{
    title : 'SPACE-INVADERS',
    type : 'Projet personnel' ,
    numberProject : '3',
    subTitle : 'Projet : Javascript',
    description: `Réaliser la création d’un jeu rétro en JavaScript. 
    </br>
    J’ai fait le jeu en Canvas ainsi qu’en JavaScript natif sans l’usage d’aucune librairie . En ajoutant des fonctionnalités
    non présentes dans le jeu original.  `,
    skills : ['JavaScript' , 'Canvas' , 'Html' , 'Sass'] ,
    link : '',
    assets : {
      pesentation : require('../assets/alien.svg') ,
      image0fProject : [ require('../assets/projets/space-invaders/portrait.svg')  ],
    },
    button : 'JOUER AU JEU' ,
    modifier : 'space_invaders'
  }
]


export{ projects  }

