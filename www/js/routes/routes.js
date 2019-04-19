appRoutes.config(function($stateProvider,$urlRouterProvider){

  $stateProvider

    .state("app", {
      url: "/app",
      abstract: true,
      templateUrl: "templates/app.html",
      controller: "AppCtrl"
    })

    .state("app.home", {
      url: "/home",
      views: {
        contents: {
          templateUrl: "templates/home.html",
          controller: "HomeCtrl"
        }
      }
    })

  $urlRouterProvider.otherwise("/app/home");
});