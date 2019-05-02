(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller('pedidosCtrl', function ($scope, $http, loginFactory, config) {
        const vm = this

        loginFactory.verificaLogin()
    
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
        
        //Usuário
        $http.get(config.clientesConst, {'acao':'meusdados'})
        .then(function (response) {
            vm.usuario = response.data.dados
        })
        
        vm.retorno = {}
        vm.dados = {}
        
        function listar() {
            var objData = {
                "acao": "listar"
            }        
            //Pedidos
            $http.get(config.pedidosConst, objData)
            .then(function onSuccess(response) {
                vm.pedidos = response.data.lista
            })
        }
        listar()

        vm.logout = function(){
            var objData = {
                "acao": "logout" 
            }
            $http.get(config.clientesConst, objData)
            .then(function onSuccess(response) {
                location.href = './'
            })
        }
        
        vm.orderByField = 'idPedido'
        vm.reverseSort = false
        vm.pageSize = '5'
        vm.pagination = {
            current: 1
        }

        // Detalhes do pedido
        vm.detalhes = function(user) {
            vm.dados = user
            $('#modalPedido').modal('show')
        }
    })
})()