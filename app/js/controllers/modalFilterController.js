(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller('modalFilterCtrl', function($uibModalInstance, $http, config, $state, items, $stateParams) {
        const vm = this

        vm.sliderPreco = JSON.parse(JSON.stringify(items))

        // Categorias
        $http.get(config.categoriasConst, {'acao': 'listar'})
        .then(function(response) {
            vm.categorias = response.data.lista
        })

        // Price range
        vm.sliderPreco = {
            minValue: 0,
            maxValue: 5000,
            options: {
                floor: 0,
                ceil: 5000,
                step: 10,
                translate: function(value, sliderId, label) {
                    switch (label) {
                    case 'model':
                        return 'R$' + Number(value).toLocaleString('pt-BR');
                    case 'high':
                        return 'R$' + Number(value).toLocaleString('pt-BR');
                    default:
                        return 'R$' + Number(value).toLocaleString('pt-BR');
                    }
                }
            }
        }

        let urlCategoria = $stateParams.categoria
        if(!urlCategoria) {
            vm.categoria = ''
        } else {
            vm.categoria = urlCategoria
        }

        let precoMinimo = $stateParams.precoMinimo
        if(precoMinimo) {
            vm.sliderPreco.minValue = precoMinimo
        } else {
            vm.sliderPreco.minValue = 0
        }

        let precoMaximo = $stateParams.precoMaximo
        if(precoMaximo) {
            vm.sliderPreco.maxValue = precoMaximo
        } else {
            vm.sliderPreco.maxValue = 5000
        }

        vm.ok = function (categoria, precoMinimo, precoMaximo) {
            vm.categoria = categoria
            if(precoMinimo === 0) {
                vm.sliderPreco.minValue = null    
            } else {
                vm.sliderPreco.minValue = precoMinimo
            }
            if(precoMaximo === 5000) {
                vm.sliderPreco.maxValue = null    
            } else {
                vm.sliderPreco.maxValue = precoMaximo
            }
            $state.go('busca', ({categoria: vm.categoria, precoMinimo: vm.sliderPreco.minValue, precoMaximo: vm.sliderPreco.maxValue}))
            $uibModalInstance.close()
        }

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel')
        }
    })
})()