angular
.module('components', [])
.directive('screens', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    controller: function($scope, $element) {
      var screens = $scope.screens = [];

      this.selectScreen = $scope.select = function(screen) {
        console.log(screen)
        angular.forEach(screens, function(screen) {
          screen.selected = false;
        });
        screen.selected = true;
      }

      this.addScreen = function(screen) {
        if (screens.length == 0) $scope.select(screen);
        screens.push(screen);
      }

      $scope.dataModel = {
        basicInfo: {
          name: '',
          description: ''
        }
      }
    },
    template:
      '<div class="screens">' +
        '<ul class="nav nav-tabs">' +
          '<li ng-repeat="screen in screens" class="nav-item">'+
            '<a href="" ng-click="select(screen)" ng-class="{active:screen.selected}">{{screen.title}}</a>' +
          '</li>' +
        '</ul>' +
        '<div class="tab-content" ng-transclude></div>' +
      '</div>',
    replace: true
  };
})
.directive('screen', function() {
  return {
    require: '^screens',
    restrict: 'E',
    transclude: true,
    scope: { title: '@' },
    link: function(scope, element, attrs, screensController) {
      screensController.addScreen(scope);
    },
    template:
      '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
      '</div>',
    replace: true
  };
})
