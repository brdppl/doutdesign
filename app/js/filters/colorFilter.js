(function() {
    'use strict'

    const app = angular.module('myApp')

    app.filter('colorFilter', function() {
        return function(input) {
            if(input === 'Enviado' || input === 'Confirmado'){
                return 'verde'
            }
            if (input === 'Realizado'|| input === 'Aguardando') {
                return 'laranja'
            }
            if (input === 'Cancelado') {
                return 'vermelho'
            }
        }
    })
})()