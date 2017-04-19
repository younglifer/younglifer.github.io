'use strict';
function PopUpController($scope, $location, $http, $window, Data) {

    var window = angular.element(document.querySelector(".pop-up"));

    $scope.$on('showLector', function (event, target, element) {
        Data.getPromise().then(function () {
            var data = TAFFY(Data.getLectors()),
                lector = {};
            lector["id"] = element;

            $scope.data = data(lector).get()[0];

            $scope.$watch('data', function () {
                $scope.popUpStyle = {"top": target.clientY + 10 + "px", 'visibility': 'visible'};
                if (target.clientY + window[0].offsetHeight + 15 > $window.innerHeight) $scope.popUpStyle = {
                    "top": $window.innerHeight - window[0].offsetHeight - 15 + "px",
                    'visibility': 'visible'
                };
            });

            angular.element(document.querySelector(".main-content")).bind("click", function (event, target) {
                if (event.target.className === "td-lec lector ng-binding") return;
                $scope.hide();
            });
        })
    });

    angular.element($window).bind("scroll", function (event, target) {
        $scope.hide();
    });

    $scope.hide = function () {
        $scope.$apply(function () {
            $scope.popUpStyle = {"visibility": 'hidden'};
        });

    };
}

angular.module('timetableapp').component('popup', {

    templateUrl: 'views/pop_up.html',
    controller: PopUpController
});

