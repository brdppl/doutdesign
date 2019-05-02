(function() {
    'use strict'

    const app = angular.module('myApp')

    app.run(function ($rootScope, $http, $location, $timeout, $state, $transitions, config) {
        const mobileScreen = $(window).width() < 768

        $transitions.onEnter({}, function () {
            document.body.scrollTop = document.documentElement.scrollTop = 0
            $('body').addClass('animated fadeIn')
        })
        $transitions.onExit({}, function () {
            $('body').removeClass('animated fadeIn')
            $('#modalSearch').modal('hide')
        })
    
        $transitions.onSuccess({ exiting: 'busca' }, function() { // Saindo da pagina de busca
            if(!$state.is('busca')) {
                $rootScope.q = ''
                $rootScope.categoria = null
                document.getElementById('search').value = ''
            }
        })
    
        var wow = new WOW ({
            mobile: true
        })
        wow.init()
        
        $rootScope.$state = $state

        $http.get(config.subcategoriasConst, {'acao': 'listar'})
        .then(function(response) {
            $rootScope.subcategorias = response.data.lista
        })
    
        $rootScope.sidebarCategorias = false
        if(mobileScreen) {
            $rootScope.openSideMenu = function(user) {
                if($rootScope.sidebarCategorias === true) {
                    $rootScope.closeSideMenu()
    
                    $timeout(function() {
                        $rootScope.sidebarCategorias = true
                        $rootScope.parent = user
                    }, 200)
                } else {
                    $rootScope.sidebarCategorias = true
                    $rootScope.parent = user
                }
            }
    
            $rootScope.closeSideMenu = function() {
                $rootScope.sidebarCategorias = false
                $rootScope.parent = ''
            }
        }
        
        // Contatos
        $http.get('json/contatos.json').then(function(response) {
            $rootScope.contatos = response.data
        })
    
        // Estados
        var apiIBGE = 'https://servicodados.ibge.gov.br/api/v1/localidades'
        $http.get(apiIBGE+'/estados')
        .then(function(response) {
            $rootScope.estados = response.data
        })
    
    
        // Campo de pesquisa
        $rootScope.q = ''
        $rootScope.pesquisar = function(val) {
            if($state.is('busca')) {
                $state.go('busca', ({q: val}))
    
                $timeout(function() {
                    $rootScope.q = val
                }, 200)
            } else {
                $state.go('busca', ({q: val}))
    
                $timeout(function() {
                    $rootScope.q = val
                }, 200)
            }
        }
        
        
        //Login
        //$rootScope.Login = {status:false, tipo:0, dados:{}}
        $rootScope.Login = {status:true, tipo:1, dados:{}}
        $rootScope.dadosLogin = {}
        $rootScope.retorno = {}
        $rootScope.logar = function(d) {
            var objData = {
                "acao": "logar",
                "dados": d
            }
            $http.get(config.loginConst, objData)
            .then(function onSuccess(response) {
                $rootScope.retorno = response.data
                if (response.data.status) {
                    $rootScope.Login = {status:true, tipo:response.data.tipo, dados:response.data.dados}
                }
            }) 
        }
        $rootScope.sair = function() {
            var objData = {
                "acao": "logout"
            }
            $http.get(config.clientesConst, objData)
            .then(function onSuccess(response) {
                $rootScope.Login = {status:false, tipo:response.data.tipo, dados:response.data.dados}
                $state.go('inicio')
            }) 
        }
    
    
        // Breakpoints Produtos em destaque
        $rootScope.breakpoints = [
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
    
    
        // Fades
        $rootScope.fadeInLeft = {
            duration: 1000,
            reset: false,
            delay: 200,
            origin: 'left',
            scale: 1,
            distance: '100px',
            mobile: false
        }
    
        $rootScope.fadeInRight = {
            duration: 1000,
            reset: false,
            delay: 200,
            origin: 'right',
            scale: 1,
            distance : '100px',
            mobile: false
        }
    
        $rootScope.fadeInUp = {
            duration: 1000,
            reset: false,
            delay: 200,
            origin: 'top',
            scale: 1,
            distance : '100px',
            mobile: false
        }
    
        $rootScope.fadeInDown = {
            duration: 1000,
            reset: false,
            delay: 200,
            origin: 'bottom',
            scale: 1,
            distance : '100px',
            mobile: false
        }

        
        // Slider
        $rootScope.slider = {
            minValue: 20,
            maxValue: 4900,
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

        // Price range
        $rootScope.minFilter = function (p) {
            return p.preco >= $rootScope.slider.minValue
        }
        $rootScope.maxFilter = function (p) {
            return p.preco <= $rootScope.slider.maxValue
        }


        $http.get(config.subcategoriasConst, {'acao': 'listar'})
        .then(function(response) {
            $rootScope.categorias = response.data.lista
        })

        //Marcas checkbox filter
        $rootScope.categoriesCheckedArray = []
        $rootScope.filtraCategoria = function(check) {
            var i = $.inArray(check, $rootScope.categoriesCheckedArray)
            if (i > -1) {
                $rootScope.categoriesCheckedArray.splice(i, 1)
            } else {
                $rootScope.categoriesCheckedArray.push(check)
            }
        }
        $rootScope.categoriesChecked = function(categoria) {
            if ($rootScope.categoriesCheckedArray.length > 0) {
                if ($.inArray(categoria.idSubCategoria, $rootScope.categoriesCheckedArray) < 0)
                    return
            }
            return categoria
        }
    })
})()