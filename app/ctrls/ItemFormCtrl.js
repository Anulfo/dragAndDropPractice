"use strict";

app.controller("ItemFormCtrl", function($scope, ItemStorage, $window) {

    $scope.newItem = {
        name: "",
        position: ""
    };

    $scope.addNewItem = function () {
        ItemStorage.postNewItem($scope.newItem)
        .then(function () {
            $window.location.href = "#/itemList"
        });
    };
});
