"use strict";

var app = angular.module("DragNDrop", ["ngRoute", "dndLists"])
.constant("FirebaseURL", "https://pinterestpractice-77ed7.firebaseio.com/");


app.config(function($routeProvider){
    $routeProvider.
        when('/', {
            templateUrl: 'partials/item-list.html',
            controller: 'ItemListCtrl'
        }).
        when('/itemList', {
            templateUrl: 'partials/item-list.html',
            controller: 'ItemListCtrl'
        }).
        when('/itemForm', {
            templateUrl: 'partials/item-form.html',
            controller: 'ItemFormCtrl'
        }).
        otherwise('/');
});

app.run(($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.key,
        authDomain: creds.authDomain
    };
    firebase.initializeApp(authConfig);
});
