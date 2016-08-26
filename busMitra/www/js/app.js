// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: '/tabs.html'
    })

    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab' : {
          templateUrl: '/home.html'
        }
      }
    })

    .state('tabs.list', {
      url: '/list',
      views: {
        'list-tab' : {
          templateUrl: '/list.html',
          controller: 'ListController'
        }
      }
    })


.state('list.about', {
      url: '/about',
      views: {
        'about-list' : {
          templateUrl: '/about.html',
           }
      }
    })

.state('tabs.fromto', {
      url: '/fromto',
      views: {
        'fromto-tab' : {
          templateUrl: '/fromto.html',
          controller: 'ListController'
        }
      }
    })


    .state('tabs.busdetails', {
      url: '/list/:aId',
      views: {
        'list-tab' : {
          templateUrl: '/busdetails.html',
          controller: 'ListController'
        }
      }
    })

    


  $urlRouterProvider.otherwise('/tab/home');
})

.controller('CalendarController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/data.json').success(function(data) {
      $scope.calendar = data.calendar;

    });
}])

.controller('ListController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/data.json').success(function(data) {
      $scope.artists = data.artists;
      $scope.whichartist=$state.params.aId;
      $scope.data = { showDelete: false, showReorder: false };

      $scope.onItemDelete = function(item) {
        $scope.artists.splice($scope.artists.indexOf(item), 1);
      }

      $scope.doRefresh =function() {
      $http.get('js/data.json').success(function(data) {
          $scope.artists = data;
          $scope.$broadcast('scroll.refreshComplete'); 
        });
      }

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }

      $scope.moveItem = function(item, fromIndex, toIndex) {
        $scope.artists.splice(fromIndex, 1);
        $scope.artists.splice(toIndex, 0, item);
      };
    });
}]);



var airlines = [{"fs":"2","iata":"LF","icao":"LCI","name":"CBT ","dest":"aaa","active":true},
{"fs":"2A","iata":"5U","icao":"TGU","name":"DAJIBANPETH","dest":"bbb","active":true},
{"fs":"2B","iata":"BT","icao":"BTI","name":"OCBS","dest":"ccc","active":true},
{"fs":"2C","iata":"9J","icao":"DAN","name":"VIDHYANAGAR","dest":"ddd","active":true},
{"fs":"2D","iata":"2O","icao":"RNE","name":"GOPANKOPPA","dest":"ddd","active":true},
{"fs":"2E","icao":"NPT","name":"NAVNAGAR","dest":"ddd","active":true},
{"fs":"2F","iata":"C8","icao":"ICV","name":"LAXMI NAGAR","dest":"ddd","active":true},
{"fs":"3","iata":"FK","icao":"WTA","name":"HOSUR","dest":"ddd","active":true},
{"fs":"3A","iata":"NC","icao":"NJS","name":"ISCON","dest":"ddd","active":true}];


var desti = [{"fs":"2","iata":"LF","icao":"LCI","name":"CBT ","dest":"aaa","active":true},
{"fs":"2A","iata":"5U","icao":"TGU","name":"DAJIBANPETH","dest":"bbb","active":true},
{"fs":"2B","iata":"BT","icao":"BTI","name":"OCBS","dest":"ccc","active":true},
{"fs":"2C","iata":"9J","icao":"DAN","name":"VIDHYANAGAR","dest":"ddd","active":true},
{"fs":"2D","iata":"2O","icao":"RNE","name":"GOPANKOPPA","dest":"ddd","active":true},
{"fs":"2E","icao":"NPT","name":"NAVNAGAR","dest":"ddd","active":true},
{"fs":"2F","iata":"C8","icao":"ICV","name":"LAXMI NAGAR","dest":"ddd","active":true},
{"fs":"3","iata":"FK","icao":"WTA","name":"HOSUR","dest":"ddd","active":true},
{"fs":"3A","iata":"NC","icao":"NJS","name":"ISCON","dest":"ddd","active":true}];



airlines = airlines.sort(function(a, b) {

  var airlineA = a.name.toLowerCase();
  var airlineB = b.name.toLowerCase();

  if(airlineA > airlineB) return 1;
  if(airlineA < airlineB) return -1;
  return 0;
});

console.log(airlines);

angular.module('ionicApp', ['ionic'])

.factory('FlightDataService', function($q, $timeout) {

    var searchAirlines = function(searchFilter) {
         
        console.log('Searching airlines for ' + searchFilter);

        var deferred = $q.defer();

      var matches = airlines.filter( function(airline) {
        if(airline.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 ) return true;
      })

        $timeout( function(){
        
           deferred.resolve( matches );

        }, 100);

        return deferred.promise;

    };
    

    return {

        searchAirlines : searchAirlines

    }
})
.controller('MyCtrl', ['$scope', 'FlightDataService', function($scope, FlightDataService) {

  $scope.myTitle = 'BUS MITRA';

    $scope.data = { "airlines" : [], "search" : '' };

    $scope.search = function() {

      FlightDataService.searchAirlines($scope.data.search).then(
        function(matches) {
          $scope.data.airlines = matches;
        }
      )
    }

}]);



