"use strict";

app.controller("ItemListCtrl", function($scope, ItemStorage, $window) {

$scope.items = [];

    ItemStorage.getItemList()
    .then( (itemCollectionArr) => {
        console.log("Item Array", itemCollectionArr);
        $scope.items = itemCollectionArr;

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
