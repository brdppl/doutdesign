(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller('headerCtrl', function($scope, $http, loginFactory, config, $rootScope, $transitions, $state) {
        const vm = this
        const mobileScreen = $(window).width() < 768;

        $transitions.onExit({}, function () {
            vm.status = {
                isCollapsed: true,
                isopen: false
            }
            $rootScope.backdrop = false
            $('.header-mobile, .second-step, .carrinho-sidebar').removeClass('opened')
            vm.q = ''
        })
        
        loginFactory.verificaLogin()
        
        vm.status = {
            isopen: false,
            isopen2: false,
            isopen3: false,
            isopen4: false,
            isCollapsed: true
        }

        $http.get(config.categoriasConst, {'acao': 'listar'})
        .then(function(response) {
            vm.categorias = response.data.lista
        })

        function listar() {
            var objData = {
                'acao': 'listar'
            }
            $http.get(config.carrinhoConst, objData)
            .then(function(response) {
                vm.carrinho = response.data.lista
            })
        }
        listar()

        // Navbar fixed
        $(document).on("scroll",function(){
            if($(document).scrollTop()>150){
                $('.header').addClass('solid')
            } else {
                $('.header').removeClass('solid')
            }
        })

        // Header mobile
        $rootScope.openHeader = function() {
            if(vm.status.isCollapsed) {
                vm.status.isCollapsed = false
                $rootScope.backdrop = true
                vm.step1 = true
                vm.step2 = false
                $('.header-mobile').addClass('opened')
            } else {
                vm.status.isCollapsed = true
                $rootScope.backdrop = false
                $('.header-mobile, .second-step').removeClass('opened')
            }
        }

        vm.step1 = true
        vm.step2 = false
        vm.showOptions = function(val) {
            vm.category = val
            vm.step1 = false
            vm.step2 = true
            $('.second-step').addClass('opened')
        }
        vm.backOptions = function() {
            vm.step1 = true
            vm.step2 = false
            $('.second-step').removeClass('opened')
        }


        // Pesquisa
        vm.openCloseSearch = function() {
            $('#modalSearch').modal('show')
            $('#modalSearch').on('shown.bs.modal', function () {
                $('input').focus()
            })
        }

        vm.buscar = function(q) {
            $state.go('busca', {q})
        }


        // Carrinho
        $rootScope.hideShowCarrinho = function() {
            if(!vm.status.isopen) {
                vm.status.isopen = true
                $rootScope.backdrop = true
                $('.carrinho-sidebar').addClass('opened')
            } else {
                vm.status.isopen = false
                $rootScope.backdrop = false
                $('.carrinho-sidebar').removeClass('opened')
            }
        }


        // Backdrop
        $rootScope.backdropClick = function() {
            if($rootScope.backdrop) {
                vm.status = {
                    isopen: false,
                    isCollapsed: true
                }
                $rootScope.backdrop = false
                $('.header-mobile, .carrinho-sidebar').removeClass('opened')
            }
        }
    })
})()