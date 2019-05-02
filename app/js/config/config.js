const app = angular.module('myApp')

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, wipImageZoomConfigProvider) {
    $urlRouterProvider.otherwise("/")

    $stateProvider
        .state("inicio", { // Ok
            url: "/",
            templateUrl: "views/home.html",
            controller: "homeCtrl",
            controllerAs: "vm"
        })
        .state("sobre", { // Ok
            url: "/sobre",
            templateUrl: "views/sobre.html",
            controller: "sobreCtrl",
            controllerAs: "vm"
        })
        .state("contato", { // Ok
            url: "/contato",
            templateUrl: "views/contato.html",
            controller: "contatoCtrl",
            controllerAs: "vm"
        })
        .state("login", { // Ok
            url: "/login",
            templateUrl: "views/login.html",
            controller: "loginCtrl",
            controllerAs: "vm"
        })
        .state("produto", { // Ok
            url: "/produto/:id",
            templateUrl: "views/produto.html",
            controller: "produtoCtrl",
            controllerAs: "vm"
        })
        .state("carrinho", {
            url: "/carrinho",
            templateUrl: "views/carrinho.html",
            controller: "carrinhoCtrl",
            controllerAs: "vm"
        })
        .state("meus-dados", {
            url: "/meus-dados",
            templateUrl: "views/dashboard/dados.html",
            controller: "dadosCtrl",
            controllerAs: "vm"
        })
        .state("meus-pedidos", {
            url: "/meus-pedidos",
            templateUrl: "views/dashboard/pedidos.html",
            controller: "pedidosCtrl",
            controllerAs: "vm"
        })
        .state("faq", { // Ok
            url: "/faq",
            templateUrl: "views/faq.html",
            controller: "faqCtrl",
            controllerAs: "vm"
        })
        .state("busca", {
            url: "/busca?q?categoria?precoMinimo?precoMaximo?secao",
            templateUrl: "views/busca.html",
            controller: "buscaCtrl",
            controllerAs: "vm"
        })

    $locationProvider.html5Mode(true)

    //Wip Zoom Config
    wipImageZoomConfigProvider.setDefaults({
        immersiveMode: 0,
        immersiveModeMessage: '',
        "zoomLevel": 2.5,
    })
})