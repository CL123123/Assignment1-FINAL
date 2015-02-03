app.controller('MainController', function($scope) {
  console
});
// app.controller('MainController', function($scope, $timeout) {
//   $scope.disableBttn = function() {
//     return $timeout(angular.noop, 1000);
//   }
// });

// app.directive('clickAndDisable', function() {
//   return {
//     scope: {
//       clickAndDisable: '&'
//     },
//     link: function(scope, iElement, iAttrs) {
//       iElement.bind('click', function() {
//         iElement.prop('disabled',true);
//         scope.clickAndDisable().finally(function() {
//           iElement.prop('disabled',false);
//         })
//       });
//     }
//   };
// });

