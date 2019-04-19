appCtrl.controller("AppCtrl", function($ionicHistory, $compile, $scope, contents, $rootScope, $state, $timeout, $window){
    

	//Variables declaration
	$scope.city = "Gdansk";
	$scope.countryCode = "PL";
	$scope.apiKey = "6e4b6eb6a6e5e7a1411764696898bd3f";
	$rootScope.apiUrl = "http://api.openweathermap.org/data/2.5/forecast?id=524901&units=metric&q="  
	    + $scope.city + "," + $scope.countryCode 
	    + "&appid=" + $scope.apiKey;
	$rootScope.iconUrl = "http://openweathermap.org/img/w/";

	$rootScope.coordinates = {};
	$rootScope.city ="";
	$rootScope.country ="";
	$rootScope.population = 0;
	$rootScope.weatherForecast = {};
	$rootScope.dateOrder = [];
	$rootScope.timeOrder = [];


	//Call API and prepare information
	contents.getWeatherForecast().then(function(json){
		
		$rootScope.coordinates = json.city.coord;
		$rootScope.city = json.city.name;
		$rootScope.country = json.city.country;
		$rootScope.population = json.city.population;

		for (var i=0;i<json.list.length;i++){
			var clouds = json.list[i].clouds;
			var weather = json.list[i].weather;
			var wind = json.list[i].wind;
			var info = json.list[i].main;
			var date = json.list[i].dt_txt.split(" ")[0];
			var time = json.list[i].dt_txt.split(" ")[1];

			if (date in $rootScope.weatherForecast){
				$rootScope.weatherForecast[date][time]={
					"clouds":clouds,
					"info":info,
					"weather":weather,
					"wind":wind
				};
			}else{
				$rootScope.weatherForecast[date] ={
					[time]:{
						"clouds":clouds,
						"info":info,
						"weather":weather,
						"wind":wind
					}
				}	
			}

			if (!$rootScope.dateOrder.includes(date))
				$rootScope.dateOrder.push(date);
			if (!$rootScope.timeOrder.includes(time))
				$rootScope.timeOrder.push(time);
		};

		// Initial information setup, first day and first available hour of that day
		$rootScope.timeOrder.sort(function compareTime(a,b){
			if (a < b)
				return -1;
			else if (a > b)
				return 1;
			else
				return 0;
		});

		$rootScope.selectedDay = $rootScope.weatherForecast[$rootScope.dateOrder[0]];
		$rootScope.selectedTime = "";
		$rootScope.timeIndex = $rootScope.getFirstAvailableTime();
		$rootScope.item = $rootScope.selectedDay[$rootScope.selectedTime]
		$rootScope.hideShowNavigation();

	});

	//The API doesn't send all the hours of the current day, instead it sends 
	//the remaining hours depending on the current hour of the day so I use 
	//this function to know the first available time for the current day
	$rootScope.getFirstAvailableTime = function (){
			for (i in $rootScope.timeOrder){
				if($rootScope.selectedDay[$rootScope.timeOrder[i]] !=undefined){
					$rootScope.selectedTime= $rootScope.timeOrder[i];
					return i;
				}
			}
		}

	//Used to hide or show navigation buttons according to the last and first time of a day
	$rootScope.hideShowNavigation = function(){
			if ($rootScope.timeIndex == 0 || $rootScope.timeIndex == $rootScope.getFirstAvailableTime())
				document.getElementById("previous").style.display = "none"
			else
				document.getElementById("previous").style.display = "inline-block"

			if ($rootScope.timeIndex == $rootScope.timeOrder.length-1)
				document.getElementById("next").style.display = "none"
			else
				document.getElementById("next").style.display = "inline-block"
		};
});