(function() {
    'use strict'

    const app = angular.module('myApp')

    app.factory('loginFactory', ['$http', '$rootScope', 'config', function ($http, $rootScope, config) {
        var dataOp = {}
        
        dataOp.verificaLogin = function () {
            var objData = {
                "acao": "verificaLogin"
            }
            $http.get(config.loginConst, objData)
            .then(function onSuccess(response) {
                $rootScope.Login = response.data
                
                // RegEx primeiro nome
                $rootScope.firstName = $rootScope.Login.dados.nome.split(/(\s+)/)[0]
            })
        }
        return dataOp
    }])
})()