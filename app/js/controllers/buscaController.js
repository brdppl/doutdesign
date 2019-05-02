(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller('buscaCtrl', function ($scope, $http, loginFactory, config, $stateParams, $state, $uibModal, $rootScope) {
        const vm = this

        loginFactory.verificaLogin()

        // Recebe os parametros da busca pelo input
        let urlBusca = $stateParams.q
        vm.buscaCampo = urlBusca
    
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
            vm.isLoading = true
            var objData = {
                "acao": "listar"
            }
            $http.get(config.produtosConst, objData)
            .then(function (response) {
                vm.produtos = response.data.lista
                vm.isLoading = false
            })
        }
        listar()
    
        vm.scrollTop = function() {
            $('html, body').animate({scrollTop: $('.produtos').offset().top }, 750, 'easeInOutExpo')
        }

        // Order
        vm.order = function(val) {
            vm.ordenacao = val
        }

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
                        return 'R$' + Number(value).toLocaleString('pt-BR')
                    case 'high':
                        return 'R$' + Number(value).toLocaleString('pt-BR')
                    default:
                        return 'R$' + Number(value).toLocaleString('pt-BR')
                    }
                }
            }
        }

        // Recebe os paramatros pela busca por categorias
        let urlCategoria = $stateParams.categoria
        if(!urlCategoria) {
            vm.categoria = ''
        } else {
            vm.categoria = urlCategoria
        }

        let secao = $stateParams.secao
        if(!secao) {
            vm.secao = ''
        } else {
            vm.secao = secao
        }

        let precoMinimo = $stateParams.precoMinimo
        vm.minPrice = $stateParams.precoMinimo
        if(precoMinimo) {
            vm.sliderPreco.minValue = precoMinimo
        } else {
            vm.sliderPreco.minValue = 0
        }

        let precoMaximo = $stateParams.precoMaximo
        vm.maxPrice = $stateParams.precoMaximo
        if(precoMaximo) {
            vm.sliderPreco.maxValue = precoMaximo
        } else {
            vm.sliderPreco.maxValue = 5000
        }

        vm.minFilter = function(p) {
            return p.preco >= vm.sliderPreco.minValue
        }
        vm.maxFilter = function(p) {
            return p.preco <= vm.sliderPreco.maxValue
        }

        vm.filtrar = function(categoria, precoMinimo, precoMaximo) {
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
        }

        vm.limparBusca = function(val) {
            $state.go('busca', ({q: val}))
        }
        vm.limparFiltro = function(val) {
            $state.go('busca', ({categoria: val}))
        }
        vm.limparPrecoMin = function(val) {
            $state.go('busca', ({precoMinimo: val}))
        }
        vm.limparPrecoMax = function(val) {
            $state.go('busca', ({precoMaximo: val}))
        }
        vm.limparSecao = function(val) {
            $state.go('busca', ({secao: val}))
        }

        // Modal filter
        vm.openModalFilter = function(parentSelector) {
            var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/modals/modalFilter.html',
                controller: 'modalFilterCtrl',
                controllerAs: 'vm',
                windowClass: 'modal-filter',
                size: 'lg',
                appendTo: parentElem,
                resolve: {
                    items: function () {
                        return vm.sliderPreco
                    }
                }
            })

            modalInstance.rendered.then(function () {
                $rootScope.$broadcast('rzSliderForceRender') //Force refresh sliders on render. Otherwise bullets are aligned at left side.
            })
        }

    })
})()