(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller('newsletterCtrl', function($scope, $http, loginFactory, config, toaster) {
        const vm = this

        loginFactory.verificaLogin()
        
        vm.head = {
            "assunto": "Contato via site" ,
            "destino": "bernardo@kiweb.com.br",
            "site": "SuperBichos"
        }
        
        vm.newsletter = {}
        vm.enviar = function(d) {
            var objData = {
                "acao": "formMail",
                "dados": d,
                "head": vm.head
            }
            $http.post(config.utilConst, objData)
            .then(function(response) {
                if(response.data.status) {
                    toaster.success("Sucesso!", response.data.msg)
                    vm.newsletter = {}
                    $('.form-control').removeClass(['ng-invalid', 'ng-touched'])
                } else {
                    toaster.error({title: "Erro", body: response.data.msg})
                }
            })
        }
    })
})()