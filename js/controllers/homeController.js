(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller('homeCtrl', function($scope, $http, loginFactory, config) {
        const vm = this

        loginFactory.verificaLogin()
        
        //Banners
        vm.loadBanner = false
        vm.bannerHome = []
        $http.get(config.bannersConst, {'acao': 'listar'})
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

        vm.loadProdutos1 = false
        function listar() {
            var objData = {
                "acao": "listar"
            }
            $http.get(config.produtosConst, objData)
            .then(function onSuccess(response) {
                vm.produtos = response.data.lista
                vm.loadProdutos1 = true
            })
        }
        listar()

        vm.productsLimit = 12
        vm.moreProducts = function() {
            vm.productsLimit += 12
        }
        
        //Marcas
        vm.loadMarcas = false
        $http.post(config.marcasConst, {'acao': 'listar'})
        .then(function (response) {
            vm.marcas = response.data.lista
            vm.loadMarcas = true
        })

        // Slick
        vm.breakpoints = [
            {
                breakpoint: 10000,
                settings: {
                    prevArrow: '<a class="left carousel-control"><i class="fas fa-chevron-left"></i></a>',
                    nextArrow: '<a class="right carousel-control"><i class="fas fa-chevron-right"></i></a>'
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    prevArrow: '<a class="left carousel-control"><i class="fas fa-chevron-left"></i></a>',
                    nextArrow: '<a class="right carousel-control"><i class="fas fa-chevron-right"></i></a>'
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow: '<a class="left carousel-control"><i class="fas fa-chevron-left"></i></a>',
                    nextArrow: '<a class="right carousel-control"><i class="fas fa-chevron-right"></i></a>'
                }
            }
        ]
    })
})()