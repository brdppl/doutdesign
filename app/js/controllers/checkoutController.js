(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller('checkoutCtrl', function ($scope, $http, loginFactory, $timeout, config) {
        const vm = this

        loginFactory.verificaLogin()
    
        vm.dados = {}
        vm.retorno = {}

        function listar() {
            var objData = {
                "acao": "listar"
            }        
            //Pedidos
            $http.get(config.carrinhoConst, objData)
            .then(function onSuccess(response) {
                vm.carrinho = response.data.lista
            })
        }
        listar()

        vm.getTotal = function(){
            var total = 0
            for(var i = 0; i < vm.carrinho.length; i++){
                var product = vm.carrinho[i]
                total += (product.preco * product.quantidade)
            }
            return total
        }

        vm.realizar = function(d){
            vm.retorno = {}
            vm.retorno.loader = true		
            var objData = {
                "acao": "salvar",
                "pagamento": d
            }
            $http.get('json/status.json', objData)
            .then(function onSuccess(response) {
                vm.retorno = response.data
            })
        }

        vm.delay = function(url) {
            $timeout(function(){
                location.href = url
            }, 300 )
        }
    })
})()