(function () {
  'use strict';

  angular
      .module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
      .controller('AppCtrl', AppCtrl);

  function AppCtrl ( $scope ) {
    $scope.data = {
      selectedIndex: 0,
      bottom:        false,
      signedIn: false,
      teste: true,
      username: "",
      selectedBook: "",
      books: [
        {toString: "Teste"},
        {toString: "Teste2"},
        {toString: "Teste3"},
        {toString: "Teste4"},
      ],
      resultBooks: [
        {toString: "Teste"},
        {toString: "Teste2"},
        {toString: "Teste3"},
        {toString: "Teste4"},
      ]
    };
    $scope.next = function() {
      $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
    };
    $scope.previous = function() {
      $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };
    $scope.handleSignin = function(usernameV)
    {
      if(usernameV)
      {
        $scope.data.username = usernameV;
        $scope.data.signedIn = true;
      }
    };
    $scope.handleSearch = function(query)
    {
      alert("Pesquisa nao implementada ainda. Termo recebido " + query);
    };
    $scope.handleEmprestimo = function(bookname)
    {
      alert("Emprestimo nao implementado ainda. Livro recebido = " + bookname);
    };
    $scope.handleDevolucao = function(bookname)
    {
      alert("Devolucao nao implementada ainda. Livro recebido = " + bookname);
    };
    $scope.handleReservaDisponivel = function(bookname)
    {
      alert(username + ", o livro " + bookname + " já está disponível para ser emprestado.");
    };
  }
})();


/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/