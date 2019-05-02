(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller('atendimentoCtrl', function ($scope, $http, loginFactory, config) {
        const vm = this

        loginFactory.verificaLogin()
    
        //Banners
        vm.loadBanner = false
        vm.bannerHome = []
        $http.get(config.bannersConst, {'acao': 'listar'})
        .then(function (response) {
            vm.bannerHome = response.data.lista
            vm.loadBanner = true
        })

        // Categorias
        $http.get(config.categoriasConst, {'acao': 'listar'})
        .then(function(response) {
            vm.categorias = response.data.lista
        })
        
        function listar() {
            var objData = {
                "acao": "listar"
            }
            $http.get(config.conteudoConst, objData)
            .then(function (response) {
                vm.conteudo = response.data.lista
            })
        }
        listar()
    })
})()