appCtrl.controller("HomeCtrl", function($rootScope, $scope,$state, $timeout){
		
	var lastSelectedDate = "";

	// Change current selected day
	$scope.selectDay = function(date){
		if (lastSelectedDate != "")
			document.getElementById(lastSelectedDate).className = "";
		else
			document.getElementById($rootScope.dateOrder[0]).className = "";

		lastSelectedDate = date;
		document.getElementById(date).className = "selected"
		
		$rootScope.selectedDay = $rootScope.weatherForecast[date];
		$rootScope.timeIndex = $rootScope.getFirstAvailableTime();
		$rootScope.item = $rootScope.selectedDay[$rootScope.selectedTime];
		$rootScope.hideShowNavigation();
	};

	//Select previous available hour
	$scope.previousTime = function(){
		if ($rootScope.timeIndex > 0 && $rootScope.timeIndex > $rootScope.getFirstAvailableTime()){
			$rootScope.timeIndex --;
			$rootScope.hideShowNavigation();

			var newTime = $rootScope.timeOrder[$rootScope.timeIndex];
			$rootScope.item = $rootScope.selectedDay[newTime];
			$rootScope.selectedTime= newTime;
		}
	};

	//Select next available hour
	$scope.nextTime = function(){
		if ($rootScope.timeIndex < $rootScope.timeOrder.length -1){
			$rootScope.timeIndex ++;
			$rootScope.hideShowNavigation();
			var newTime = $rootScope.timeOrder[$rootScope.timeIndex];
			$rootScope.item = $rootScope.selectedDay[newTime]	
			$rootScope.selectedTime= newTime;		
		}

	};
});