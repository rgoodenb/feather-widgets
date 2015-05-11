(function () {
    var designer = angular.module('designer');
    designer.requires.push('expander', 'sfSelectors');

    designer.controller('SimpleCtrl', ['$scope', 'propertyService', function ($scope, propertyService) {
        var emptyGuid = '00000000-0000-0000-0000-000000000000';
        $scope.additionalFilters = {};

        propertyService.get()
           .then(function (data) {
               if (data) {
                   $scope.properties = propertyService.toAssociativeArray(data.Items);

                   var additionalFilters = $.parseJSON($scope.properties.SerializedAdditionalFilters.PropertyValue || null);

                   $scope.additionalFilters.value = additionalFilters;
               }
           },
           function (data) {
               $scope.feedback.showError = true;
               if (data)
                   $scope.feedback.errorMessage = data.Detail;
           })
           .then(function () {
               $scope.feedback.savingHandlers.push(function () {
                   if ($scope.properties.BreadcrumbIncludeOption.PropertyValue.toLowerCase() !== 'specificpagepath') {
                       $scope.properties.StartingPageId.PropertyValue = emptyGuid;
                   }
                   if ($scope.properties.StartingPageId.PropertyValue === emptyGuid) {
                       $scope.properties.BreadcrumbIncludeOption.PropertyValue = "CurrentPageFullPath";
                   }
                   if ($scope.properties.ShowClassificationFilters.PropertyValue) {
                       $scope.properties.SerializedAdditionalFilters.PropertyValue = JSON.stringify($scope.additionalFilters.value);
                   }
                   if (!$scope.additionalFilters.value || $scope.additionalFilters.value.QueryItems.length === 0) {
                       $scope.properties.ShowClassificationFilters.PropertyValue = false;
                   }
               });
           });
    }]);
})();