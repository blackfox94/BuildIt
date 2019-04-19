"use strict";
app.service("contents", function ($http, $q, $rootScope) {
    return {
       getWeatherForecast: function () {
            var deferred = $q.defer();
            $http.get($rootScope.apiUrl)
                .success(function (data) {
                    deferred.resolve(data);
                    console.log("API call was made successfully.");
                })
                .error(function (error) {
                    deferred.$$reject();
                    console.log(error);
                    console.log("API call failed.");
                });
            return deferred.promise;
        }
    };
});