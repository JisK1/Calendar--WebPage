
//returns the day of the week 1 is mon - 6 is sat, 0 is sun.
const getWeekday = day => {
	//console.log(day%7);
	return day%7;
}

//Class to represent a day.
class Day {
	//dayID is the id of the cell on the calander.
	//day is Date object.
	constructor(dayID, Day, Month, Year){
		this.dayID = dayID;
		this.day = new Date(Year, Month, Day);
		console.log("---");
	}
	//sets the current date.
	setDate(Day, Month, Year){
		this.day = new Date(Year, Month, Day);
	}
}

//Function which returns the number of days in a given month and year.
function daysInMonth (month, year) { // Use 1 for January, 2 for February, etc.
  return new Date(year, month + 1, 0).getDate();
}


//create an array of 35 Day objects used to fill the calander.
function CreateDaysArray(newDate){
	
	//An array to hold the daynum of the cells in the table for the calander.
	var days = new Array();

	//The number of days in the current month.
	let maxDaysInMonth = daysInMonth(newDate.getMonth(), newDate.getFullYear())

	//The first of the current month.
	let firstWeekDay = new Date(newDate.getFullYear(), newDate.getMonth(), 1).getDay();

	//true if the below loop has not found the first day of the month.
	let dayOneFound = false;

	//the day of the month to be added to the array.
	let dayofmonth = 1;
		
	//Fills the days array
	for(let i = 0; i < 42; i++){
		
		//if i is less then the starting weekday then fill cells with daynum = 0.
		if((i == firstWeekDay) && !dayOneFound){
			//console.log("i = " + i + " weekday " + newDate.getDay())
			days[i] = new Day(i,dayofmonth, newDate.getMonth(), newDate.getFullYear())
			dayofmonth++;
			dayOneFound = true;
		}
		else if((dayofmonth <= maxDaysInMonth) && dayOneFound){
			//If we are past the first of the month but before the end of the month then fill the array with the current day.
			days[i] = new Day(i,dayofmonth, newDate.getMonth(), newDate.getFullYear())
			dayofmonth++;
		}
		else{
			//if we have not reached the first of the month or we are past the last day of the month then fill the remaing array with day 0,0,0.
			days[i] = new Day(i, 0, 0, 0);	
		} 
	}
	return days;
}

//todays date. new Date(Year, Month, Day)
let currentDate = new Date();

const monthName = document.querySelector("#month-name");
const yearName = document.querySelector("#year-name");
const calender = document.querySelector("#app-calender");

const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];


//Populates the calander with days based from the given days array.
function populateCalander (newDays) { // Use 1 for January, 2 for February, etc.
  
	//add the days of the week.
	for(let weekDay = 0; weekDay <= 6; weekDay++){
	calender.insertAdjacentHTML("beforeend", `<div class="weekday-name">${daysOfTheWeek[weekDay]}</div>`);
	}

	//Set the month name. newDays[15] will always have a day so we can always use it to get the current month.
	monthName.insertAdjacentHTML("beforeend", `${months[newDays[15].day.getMonth()]}`);
	yearName.insertAdjacentHTML("beforeend", `${newDays[15].day.getFullYear()}`);
  
  
	//populate the calander with days.
	for(let i = 0; i < newDays.length; i++){
			
		const weekday = newDays[i].day.getDay();
		
		//Check if the current day is an actual day of the month. Blank days are new Day(i, 0, 0, 0) with day = 0 month = 0 and year = 0. This makes the year = 1899
		if(newDays[i].day.getFullYear() != 1899){
			
			//check if its the weekend
			if(weekday == 0 || weekday == 6){
				calender.insertAdjacentHTML("beforeend", `<div class="day weekend">${newDays[i].day.getDate()}</div>`);
			}else{
				calender.insertAdjacentHTML("beforeend", `<div class="day">${newDays[i].day.getDate()}</div>`);
			}		
		}else{
				calender.insertAdjacentHTML("beforeend", `<div class="day">&nbsp;</div>`);
		}		
	}  
}

//Subtracts a month from currentDate and populates the calander based on the new date.
function backArrow (){
	//Subtract 1 month from the current date.
	currentDate.setMonth(currentDate.getMonth() - 1)
	console.log(currentDate);
	clearCalander();
	populateCalander(CreateDaysArray(currentDate));
}

function forwardArrow (){
	//Add 1 month to the current date.
	currentDate.setMonth(currentDate.getMonth() + 1)
	console.log(currentDate);
	clearCalander();
	populateCalander(CreateDaysArray(currentDate));
}

//Clears all days from the calander and weekday names.
function clearCalander(){
	
	//Set the innertext of the month-name to "".
	document.getElementById("month-name").innerText = "";
	document.getElementById("year-name").innerText = "";
	
	//get the list of calander child elements and removes them.
	const list = document.getElementById("app-calender");
	while (list.hasChildNodes()) {
		list.removeChild(list.children[0]);
	}
}

console.log(currentDate);

populateCalander(CreateDaysArray(currentDate));