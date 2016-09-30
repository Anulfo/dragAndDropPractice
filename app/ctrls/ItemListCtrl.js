"use strict";

app.controller("ItemListCtrl", function($scope, ItemStorage, $window) {

$scope.items = [];
$scope.models = {
    selected : null,
    list : []
};

    $scope.dropCallback = function(event, index, item, external, type, allowedType) {
        $scope.logListEvent('dropped at', event, index, external, type);
        if (external) {
            if (allowedType === 'itemType' && !item.label) return false;
            if (allowedType === 'containerType' && !angular.isArray(item)) return false;
        }
        return item;
    };

    $scope.logEvent = function(message, event) {
        console.log(message, '(triggered by the following', event.type, 'event)');
        console.log(event);
        console.log($scope.models);
        angular.forEach($scope.models.list, function (value, key) {
            value.position = key + 1;
        });
        angular.forEach($scope.models.list, function (value, key) {
            let itemId = value.id;
            let editedItem = value;
            // console.log(value);
            ItemStorage.updateItem(itemId, editedItem);
        });
    };

    $scope.logListEvent = function(action, event, index, external, type) {
        var message = external ? 'External ' : '';
        message += type + ' element is ' + action + ' position ' + index;
        $scope.logEvent(message, event);
    };

    ItemStorage.getItemList()
    .then( (itemCollectionArr) => {
        console.log("Item Array", itemCollectionArr);
        itemCollectionArr.sort(function(a, b) {
            return a.position - b.position;
        })
        $scope.items = itemCollectionArr;
        $scope.models.list = itemCollectionArr
    });

    $scope.itemDelete = (itemId) => {
        ItemStorage.deleteItem(itemId)
        .then ( (response) => {
            ItemStorage.getItemList()
            .then( (itemCollectionArr) => {
                $scope.items = itemCollectionArr;
            });
        });
    };

    $scope.addItem = () => {
        $window.location.href = "#/itemForm"
    }
});
