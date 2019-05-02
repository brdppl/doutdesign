(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller('produtoCtrl', function($scope, $http, loginFactory, config, $stateParams, $timeout, $state, toaster) {
        const vm = this

        loginFactory.verificaLogin()
        
        var url = Number($stateParams.id)

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

        // Frete
        // $http.get('json/frete.json')
        // .then(function(response) {
        //     vm.frete = response.data.lista
        // })

        vm.loadFotos = false
        vm.loadFotos2 = false
        vm.loadOutros = false
        function listar() {
            var objData = {
                "acao": "listar"
            }
            $http.get(config.produtosConst, objData)
            .then(function (response) {
                vm.produtos = response.data.lista
                vm.loadFotos = true
                vm.loadFotos2 = true
                vm.loadOutros = true

                vm.produto = vm.produtos.filter(function(user) {
                    return user.idProduto === url
                })[0]
            })
        }
        listar()


        vm.addCarrinho = function(p){
            var objData = {
                "acao": "add",
                "dados": p
            }
            $http.get(config.comprasConst, objData)
            .then(function(response) {
                if(response.data.status) {
                    toaster.success('Sucesso!', response.data.msg)
                    $state.go('carrinho')
                } else {
                    toaster.error('Erro', response.data.msg)
                }
            })
        }


        // CEP
        vm.showFrete = false
        vm.loading = false
        vm.calcularFrete = function(cep, peso) {
            var objData = {
                "acao": "calculaFrete",
                "cep": cep,
                "peso": peso
            }
            $http.get(config.freteConst, objData)
            .then(function(response) {
                console.log(response.data)
                vm.loading = true
                // if(response.data.status) {
                //     vm.loading = false
                //     vm.showFrete = true
                // }
                $timeout(function() {
                    vm.loading = false
                    vm.showFrete = true
                }, 1000)
            })
        }

        //Slick config
        vm.config = [
            {
                breakpoint: 10000,
                settings: {
                    arrows: true,
                    autoplay: false,
                    fade: true,
                    adaptiveHeight: true,
                    asNavFor: '.slider-nav'
                }
            }
        ]
        vm.config2 = [
            {
                breakpoint: 10000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    asNavFor: '.slider-for',
                    centerMode: true,
                    focusOnSelect: true
                }
            }
        ]
        vm.configOutros = [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    })
})()