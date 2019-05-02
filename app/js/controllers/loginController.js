(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller('loginCtrl', function($scope, $http, loginFactory, config, toaster, $state) {
        const vm = this

        loginFactory.verificaLogin()
        
        //Banners
        vm.loadBanner = false
        vm.bannerHome = []
        $http.post(config.bannersConst, {'acao': 'listar'})
        .then(function (response) {
            vm.bannerHome = response.data.lista
            vm.loadBanner = true
        })

        // Categorias
        $http.post(config.categoriasConst, {'acao': 'listar'})
        .then(function(response) {
            vm.categorias = response.data.lista
        })

        // Subcategorias
        $http.post(config.subcategoriasConst, {'acao': 'listar'})
        .then(function(response) {
            vm.subcategorias = response.data.lista
        })

        vm.openEsqueciSenha = function() {
            $('#modalEsqueciSenha').modal('show')
        }
        
        vm.dados = {}
        vm.usuario = {}
        vm.esqueci = {}

        vm.logar = function(d) {
            var objData = {
                "acao": "logar",
                "usuario": d
            }
            $http.post(config.clientesConst, objData)
            .then(function(response) {
                if(response.data.status) {
                    toaster.success("Sucesso!", response.data.msg)
                    vm.usuario = {}
                    $state.go('inicio')
                } else {
                    toaster.error({title: "Erro", body: response.data.msg})
                }
            })
        }

        vm.cadastrar = function(d) {
            var objData = {
                "acao": "cadastrar",
                "dados": d
            }
            $http.post(config.clientesConst, objData)
            .then(function(response) {
                if(response.data.status) {
                    toaster.success("Sucesso!", response.data.msg)
                    vm.dados = {}
                    $('.form-control').removeClass(['ng-invalid', 'ng-touched'])
                } else {
                    toaster.error({title: "Erro", body: response.data.msg})
                }
            })
        }

        vm.recuperar = function(d) {
            if (!(d.email) || d.email === ''){
                toaster.error({title: "Erro", body: response.data.msg})
                return false
            }

            var objData = {
                "acao": "senha",
                "esqueci": d
            }
            $http.post(config.clientesConst, objData)
            .then(function(response) {
                if(response.data.status) {
                    toaster.success("Sucesso!", response.data.msg)
                    vm.esqueci = {}
                    $('#modalEsqueciSenha').modal('hide')
                } else {
                    toaster.error({title: "Erro", body: response.data.msg})
                }
            })
        }


        // Busca cep
        vm.buscaCep = function(d) {
            const objData = {
                'acao': 'buscaCep',
                'cep': d
            }
            $http.post(config.utilConst, objData)
            .then(function(response) {
                vm.dados.logradouro = response.data.logradouro
                vm.dados.bairro = response.data.bairro
                vm.dados.cidade = response.data.cidade
                vm.dados.uf = response.data.uf
            })
        }
    })
})()