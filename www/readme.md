

How to run:
	Considering you have ionic and npm all set up and ready to go, all you need to do to get it running is to use the command "ionic serve" on the command line 



Thought process:
	*The API call is made and processed in the AppCtrl, it's made by a service. After getting an answer from the API it then processes the downloaded info.
	*I decided to work around with the json received so it would be easier and more intuitive for me to use it as I saw necessary and because the way it was sent was(for me) counter intuitive and a little weird considering the way I wanted to do things. 
	*After building the information as I saw fit I initialized visually the first day and available time.
	*I display all available days and uppon clicking them it's displayed by default the forecast for the first available time of that selected day.
	The user can navigate between the different forecast of the different hours by clickling the arrows near the displayed hour.


Possible future implementions:
	*Starting date selection;
	*UI and UX improvements(animations, different fonts, etc);
	*City & Country selection;
	*Icons for each forecast, wind, cloudiness,etc
