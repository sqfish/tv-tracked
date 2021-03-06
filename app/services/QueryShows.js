(function() {
  'use strict';

  angular
  .module('TVcast')
  .factory("QueryShows", QueryShows);

  QueryShows.$inject = ['$http'];

  function QueryShows($http) {
    var vm = this;
    $http.defaults.headers.common = {
      'Content-Type' : 'application/json',
      'trakt-api-version' : '2',
      'trakt-api-key' : 'd2a7a0ca1dbe8300bcfa5f0e1d38e10e03403ee7769e390f636411d18bbcc00e'
    };
    var appID = 'd2a7a0ca1dbe8300bcfa5f0e1d38e10e03403ee7769e390f636411d18bbcc00e';
    return {
      search: function(query) {
        var rurl = 'https://api-v2launch.trakt.tv/search?query=' + query + '&type=show&?page=1&limit=100';
        // var appID = 'd2a7a0ca1dbe8300bcfa5f0e1d38e10e03403ee7769e390f636411d18bbcc00e';
        var request = {
          method: 'GET',
          url: rurl,
          headers: {
            'Content-Type' : 'application/json',
            'trakt-api-version' : '2',
            'trakt-api-key' : 'd2a7a0ca1dbe8300bcfa5f0e1d38e10e03403ee7769e390f636411d18bbcc00e'
          }
        };
        return $http(request); 
      },
      popular: function() {
        var rurl = 'https://api-v2launch.trakt.tv/shows/popular?extended=full,images&?page=1&limit=100';
        // var appID = 'd2a7a0ca1dbe8300bcfa5f0e1d38e10e03403ee7769e390f636411d18bbcc00e';
        var request = {
          method: 'GET',
          url: rurl,
          cache: true,
          headers: {
            'Content-type' : 'application/json',
            'trakt-api-version' : '2',
            'trakt-api-key' : appID
          }
        };
        return $http(request);
      },
      lookup: function(id) {
        var rurl = 'https://api-v2launch.trakt.tv/shows/' + id + '?extended=full,images';
        // var appID = 'd2a7a0ca1dbe8300bcfa5f0e1d38e10e03403ee7769e390f636411d18bbcc00e';
        vm.request = {
          method: 'GET',
          url: rurl,
          headers: {
            'Content-Type' : 'application/json',
            'trakt-api-version' : '2',
            'trakt-api-key' : appID
          }
        };
        return $http(vm.request); 
      },
      episodes: function(slug) {
        var rurl = 'https://api-v2launch.trakt.tv/shows/' + slug + '/seasons?extended=episodes';
        vm.request = {
          method: 'GET',
          url: rurl,
          headers: {
            'Content-Type' : 'application/json',
            'trakt-api-version' : '2',
            'trakt-api-key' : appID
          }
        };
        return $http(vm.request); 
      }
    };
  }
})();