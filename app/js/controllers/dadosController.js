(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller('dadosCtrl', function ($scope, $http, loginFactory, toaster, config, $state) {
        const vm = this

        loginFactory.verificaLogin()
        
        vm.usuario = {}
        
        function listar() {
            var objData = {
                "acao": "meusdados"
            }
            //Usuário
            $http.get(config.clientesConst, objData)
            .then(function onSuccess(response) {
                vm.usuario = response.data.dados
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
        
        vm.salvar = function(d){
            var objData = {
                "acao": "atualizar",
                "dados": d
            }
            $http.get(config.clientesConst, objData)
            .then(function onSuccess(response) {
                if(response.data.status) {
                    toaster.success('Sucesso!', response.data.msg)
                    $state.reload()
                } else {
                    toaster.error('Erro', response.data.msg)
                }
            })
        }
        
        vm.recuperar = function(d){
            if (!(vm.esqueci.senha) || vm.usuario.senha != vm.esqueci.senha){
                toaster.error('Erro', 'Senha atual inválida!')
                return false
            }

            if (vm.esqueci.novaSenha != vm.esqueci.novaSenha2){
                toaster.error('Erro', 'Repita as senhas corretamente!')
                return false
            }
            
            vm.usuario.senha = vm.esqueci.novaSenha
            var objData = {
                "acao": "atualizar",
                "dados": vm.usuario
            }
            $http.get(config.clientesConst, objData)
            .then(function onSuccess(response) {
                if(response.data.status) {
                    toaster.success('Sucesso!', response.data.msg)
                } else {
                    toaster.error('Erro', response.data.msg)
                }
            })
        }
    })
})()