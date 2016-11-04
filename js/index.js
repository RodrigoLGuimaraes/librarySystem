(function () {
  'use strict';

  angular
      .module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
      .controller('AppCtrl', ['$scope', '$http', '$interval', AppCtrl]);

  function AppCtrl ( $scope, $http, $interval ) {

    $interval(function() {
            $http.get('http://localhost:8080/rest/lib/clients/notifications?clientName=' + $scope.data.username).then(function(result) 
            {
               var booksArray = result.data;
               if(!booksArray)
               {
                  return;
               }
               if(booksArray.length != 0)
               {
                  var output = "Novos livros disponiveis:\n";
                  booksArray.forEach(
                      function (book)
                      {
                        output += "-" + book.name + "\n";
                      }
                  );
                  alert(output); 
               }
            });
          }, 1000);

    $scope.data = {
      selectedIndex: 0,
      bottom:        false,
      signedIn: false,
      teste: true,
      username: "",
      selectedBook: "",
      books: null,
      resultBooks: null
    };
    $scope.next = function() {
      $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
    };
    $scope.toString = function(book) {
      if(book.owner != null)
      {
        return book.name + ' - ' + "Emprestado!";
      }
      else if(book.reservationList.length != 0)
      {
        return book.name + ' - ' + "Reservado para " + book.reservationList[0];
      }
      return book.name;
      
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

         $http.get('http://localhost:8080/rest/lib/books?clientName=' + usernameV).then(function(result) 
         {
            $scope.data.books = result.data;
         });
         $http.get('http://localhost:8080/rest/lib/books').then(function(result) 
         {
            $scope.data.resultBooks = result.data;
         });
      }
    };
    $scope.handleSearch = function(query)
    {
      if(query == null)
      {
        query = "";
      }
      $http.get('http://localhost:8080/rest/lib/books?name=' + query).then(function(result) 
      {
          $scope.data.resultBooks = result.data;
      });
    };
    $scope.handleEmprestimo = function(bookname)
    {
      

      $http({
            method: 'POST',
            url: 'http://localhost:8080/rest/lib/books/lend',
            data: {
                bookName: bookname,
                client: $scope.data.username
            }
        }).then(function successCallback(response) {
           $http.get('http://localhost:8080/rest/lib/books?clientName=' + $scope.data.username).then(function(result) 
           {
              $scope.data.books = result.data;
           });
           alert("Livro emprestado com sucesso.");
        }, function errorCallback(response) {

            console.log(response);

            if(response.data.m == "Book is already taken" || response.data.m == "Book is reserved")
            {
                $http({
                    method: 'POST',
                    url: 'http://localhost:8080/rest/lib/books/reserve',
                    data: {
                        bookName: bookname,
                        client: $scope.data.username,
                    }
                }).then(function successCallback(response) {
                   alert("Livro reservado com sucesso.");
                }, function errorCallback(response) {
                    alert("Tente de novo por favor." + response.data.m);
                });
            }
            else
            {
              alert("Tente de novo por favor." + response.data.m);
            }
            
        });

    };
    $scope.handleDevolucao = function(bookname)
    {
      $http({
            method: 'POST',
            url: 'http://localhost:8080/rest/lib/books/return',
            data: {
                bookName: bookname
            }
        }).then(function successCallback(response) {
           $http.get('http://localhost:8080/rest/lib/books?clientName=' + $scope.data.username).then(function(result) 
           {
              $scope.data.books = result.data;
           });
           alert("Livro devolvido com sucesso.");
        }, function errorCallback(response) {
            alert("Tente de novo por favor." + response.data.m);
        });
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