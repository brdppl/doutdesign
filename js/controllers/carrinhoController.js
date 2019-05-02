(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller('carrinhoCtrl', function ($scope, $http, loginFactory, $timeout, $ocLazyLoad, config, toaster) {
        const vm = this

        loginFactory.verificaLogin();
    
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

        $ocLazyLoad.load('https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js');
        vm.carrinho = [];
        vm.frete = 0;
        vm.endereco = {};
        vm.pesoTotal = 0;
        vm.precoTotal = 0;
        vm.precoSubTotal = 0;
        
        vm.valorFrete = 0;
        vm.opcaoFrete = '';
        
        vm.pedido = {};
        vm.dados = {};
        vm.pagamento = {};
        vm.cupom = {};

        vm.parcelado = false;
        
        function listar() {
            var objData = {
                "acao": "listar"
            }        
            //Pedidos
            $http.get(config.carrinhoConst, objData)
            .then(function(response) {
                vm.carrinho = response.data.lista
            })
        }
        listar()    
    
        vm.delCarrinho = function (i) {
            var objData = {
                "acao": "delCarrinho",
                "id": i
            }
            $http.post(config.carrinhoConst, objData)
            .then(function(response) {
                if(response.data.status) {
                    toaster.success('Sucesso!', response.data.msg)
                    listar()
                } else {
                    toaster.error('Erro', response.data.msg)
                }
            })
        }

        vm.qtdCarrinho = function (i, qtd) {
            var objData = {
                "acao": "qtdCarrinho",
                "id": i,
                "quantidade": qtd
            }
            $http.post(config.carrinhoConst, objData)
            .then(function(response) {
                 listar()
            })
        }

        vm.getPrecoTotal = function() {
            vm.precoSubTotal = 0
            for(var i=0;i< (vm.carrinho.length); i++){
                vm.precoSubTotal += (vm.carrinho[i].preco*vm.carrinho[i].quantidade);
            }
            if(vm.cupom.status){
                if(vm.cupom.tipo == 0){
                    var p = vm.cupom.valorDesconto;
                    vm.pedido.valorDesconto = (vm.precoSubTotal/100)*p;
                } else {
                    vm.pedido.valorDesconto = vm.cupom.valorDesconto;
                }
                vm.precoSubTotal =  vm.precoSubTotal-vm.pedido.valorDesconto;
            }
            return vm.precoSubTotal;
        }
        
        // Cupom de desconto
        vm.validaCupom = function(d) {
            vm.cupom = {}
            vm.pedido.codigoCupom = {}
            vm.pedido.valorDesconto = {}
            var objData = {
                "acao": "valida",
                "cupom": d.codigo
            }
            $http.post(config.cuponsConst, objData)
            .then(function onSuccess(response) {    
                if (response.data.status){
                    toaster.success('Sucesso!', response.data.msg)
                    listar()
                    vm.cupom = response.data
                    vm.pedido.codigoCupom = response.data.cupomDesconto
                    vm.pedido.valorDesconto = response.data.valorDesconto
                } else {
                    toaster.error('Erro', response.data.msg)
                }
            })
        }
    
        vm.mudarValorFrete = function (tipoFrete, valorFrete) {
            vm.valorFrete = valorFrete
            vm.opcaoFrete = tipoFrete
        }
    
        vm.buscaCep = function (cep) {
            var objData = {
                "acao": "buscaCep",
                "cep": cep
            }
            if (cep.length >= 8) {
                $http.post(config.utilConst, objData)
                .then(function(response) {
                    vm.endereco = response.data
                    vm.calcularFrete(vm.endereco.cep)
                })
            }
        }

        vm.listaEntrega = [];
        vm.calcularFrete = function (cep) {
            var objData = {
                "acao": "calculaFrete",
                "cep": cep
            }
            $http.post(config.freteConst, objData)
            .then(function(response) {
                vm.listaEntrega = response.data
            });
        }

        // Array meses
        var months = []
        for(var x = 1; x <= 12; x++) {
            months.push(x)
        }
        vm.meses = months

        // Array anos
        var years = []
        var currentYear = new Date().getFullYear()
        var range = currentYear+10
        for(var x = currentYear; x <= range; x++) {
            years.push(x)
        }
        vm.anos = years
    
    
        vm.finalizarPedido = function (endereco, valorFrete, opcaoFrete, tipoPagamento, valorTotal) {
            vm.retornoPedido = {}
            //  alert(valorTotal+valorFrete)
            if ((parseFloat(valorTotal)+parseFloat(valorFrete)) <= 0){
                vm.retornoPedido = {'erro':true, 'msg':'O valor da compra deve ser maior que o desconto'}
                return false
            }
    
            var frete = {tipo: opcaoFrete, valor: valorFrete}
            var pagamento = {meio: tipoPagamento, valorTotal: valorTotal, valorDesconto: vm.pedido.valorDesconto, cupomDesconto: vm.pedido.codigoCupom}
            
            var objData = {
                "acao": "pedir",
                "endereco": endereco,
                "frete": frete,
                "pagamento": pagamento
            }
            
            $http.post('controller/class.compras.php', objData)
            .then(function onSuccess(response) {
                vm.retornoPedido = response.data
                vm.pedido = response.data
                vm.pedido.valorTotal = valorTotal
                if (response.data.status) {
                    $timeout(function(){
                    $('#modalCheckout').modal('show')
                    /////////////////////
                    PagSeguroDirectPayment.setSessionId(vm.pedido.sessaoID)
                    PagSeguroDirectPayment.getSenderHash()
                    }, 1000 )
                }
            })
        }
    
        vm.checkoutTeste = function(data) {
            vm.dados = data
            $('#modalCheckout').modal('show')
        }
    })
})()