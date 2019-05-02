(function() {
    'use strict'

    const app = angular.module('myApp')

    const base = 'json/';

    app.constant("config", {
        loginConst: base+'status.json',
        categoriasConst: base+'categorias.json',
        subcategoriasConst: base+'class.subcategorias.php',
        conteudoConst: base+'conteudo.json',
        bannersConst: base+'banners.json',
        produtosConst: base+'produtos.json',
        carrinhoConst: base+'carrinho.json',
        utilConst: base+'status.json',
        freteConst: base+'class.frete.php',
        clientesConst: base+'usuario.json',
        pedidosConst: base+'pedidos.json',
        marcasConst: base+'class.marcas.php',
        comprasConst: base+'class.compras.php',
        cuponsConst: base+'class.cupons.php'
    });
})()