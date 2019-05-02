(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller('contatoCtrl', function($scope, $http, loginFactory, config, toaster) {
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

        // Subcategorias
        $http.get(config.subcategoriasConst, {'acao': 'listar'})
        .then(function(response) {
            vm.subcategorias = response.data.lista
        })

        vm.head = {
            "assunto": "Contato via site" ,
            "destino": "bernardo@kiweb.com.br",
            "site": "SuperBichos"
        }
        
        vm.contato = {}
        vm.enviar = function(d) {
            var objData = {
                "acao": "formMail",
                "dados": d,
                "head": vm.head
            }
            $http.get(config.utilConst, objData)
            .then(function(response) {
                if(response.data.status) {
                    toaster.success("Sucesso!", response.data.msg)
                    vm.contato = {}
                    $('.form-control').removeClass(['ng-invalid', 'ng-touched'])
                } else {
                    toaster.error({title: "Erro", body: response.data.msg})
                }
            })
        }
    })
})()