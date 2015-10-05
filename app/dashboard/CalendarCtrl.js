(function(){
  'use strict';

  angular
    .module('TVcast.dashboard')
    .controller('CalendarCtrl', CalendarCtrl);

    CalendarCtrl.$inject = ['ShowData', 'AuthUserData', 'myFilterFilter', '$mdDialog', '$scope', 'currentAuth', '$state'];

  function CalendarCtrl (ShowData, AuthUserData, myFilterFilter, $mdDialog, $scope, currentAuth, $state) {
    var vm = this;
    var userData = AuthUserData.userData();
    vm.showlist = null;
    
    // Check to see if user ids have been stored in userData
    // This helps resolve data if user refreshes browser
    // SELF: This needs to DRY-ed, maybe with service for all data loading (main, home, profile)
    if (currentAuth === null) {
      $state.go('login');
    } else {
    if (!userData.uid || !userData.mainuid) {
      var uid = currentAuth.uid;
      AuthUserData.map(uid).$loaded(function(data){
        vm.rootuid = data.$value;
        AuthUserData.following(vm.rootuid).$loaded(function(data){
          vm.following = data;
          ShowData.$loaded(function(data){
            vm.showlist = ShowData;
            vm.limit = myFilterFilter(vm.showlist, {ids: {slug: vm.following}});
          });
        });
      });
    } else {
      AuthUserData.following(userData.mainuid).$loaded(function(data){
        vm.following = data;
        ShowData.$loaded(function(data){
          vm.showlist = ShowData;
          vm.limit = myFilterFilter(vm.showlist, {ids: {slug: vm.following}});
        });
      });
    }
  }
  }

})();