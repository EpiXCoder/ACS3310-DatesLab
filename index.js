// What is a date? 

// Make a Date
const today = new Date() // Gets the time now
// Print the date
console.log(today, '<- Today')  
// It's really a number
console.log(today.getTime(), '<- Time') 

// It's really the number of milliseconds since 1970
// get the number of years since 1970
console.log('Years since 1970')
console.log(today / 1000 / 60 / 60 / 24 / 365.25) 
// Divide by 1000 to get seconds divide by 60 to get minutes
// divide by 60 to get hours, divide by 24 to get days, 
// divide by 365.25 to get years

// or divide by 86,400 seconds
console.log(today / 86400 / 1000 / 365.25)

console.log('-------- Age --------')

// You can make a date from almost any 
// human readable string for example: 
const bday = new Date('Sept 21, 1989')
// Challenge: Calculate your age with JS
const age = today - bday 
console.log(age, '<- Age in ms')
// Challenge: Calculate your age in secs, mins, hrs, days, years
console.log(age / 1000, '<- Age in s')
console.log(age / 1000 / 60, '<- Age in mins')
console.log(age / 1000 / 60 / 60, '<- Age in hrs')
console.log(age / 1000 / 60 / 60 / 24, '<- Age in days')
console.log(age / 1000 / 60 / 60 / 24 / 365.25, '<- Age in yrs')


console.log('-------- BDay --------')

// You can also initialize a date with 
// year, month, date, hours, mins, secs, ms
// (month is 0 indexed Jan == 0)

const newYear = new Date(2021, 0, 1)
// Get the components from a date
console.log(newYear.getFullYear(), newYear.getMonth(), newYear.getDate())
// To get the month by name you might: 
const months = ['Jan','Feb','Mar','Apr','May','Jun', 'Jul','Aug','Sep','Oct','Nov','Dec']
// Shows the month for new years
console.log(months[newYear.getMonth()])
// Challenge: Show the month of your birthday
console.log(months[bday.getMonth()], '<- month of my birthday' )

// Days of the week are also 0 indexed 0:Sun - 6:Sat 
const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
// Challenge: Show the day of the week of your birthday
console.log(days[bday.getDay()], '<- day of my birthday' )

console.log('-------- Data Offsets --------')

// Date offsets show the difference between two dates

const date = new Date()          // Start with a date 
const startDate = new Date(date) // copy the date
const dueDate = new Date(date)   // copy the date

// Start date is 7 days ago
// Use setDate to modify the start date subtract 7 days
startDate.setDate( date.getDate() - 7 ) // 7/20

// Due date is 3 days from now
// Use setDate to modify the end date add 3 days
dueDate.setDate( date.getDate() + 3 ) // 7/30

console.log(startDate.getDate(), dueDate.getDate())
console.log(startDate, dueDate)
// Check these dates they should be 7 days ago and 3 days from now

// Try these problems 

console.log('--------- Problem 1 --------')
// Schedule future dates - Given a date return a list of 
// dates separated by a days offset
// date is a Date object
// repeat is a number, the number of repeats 
// offset is the number days between each of the dates returned

function consecutiveDates(date, repeat, offset) {
  for (let i = 0; i < repeat; i++) {
    console.log(date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear());
    date.setDate(date.getDate() + offset);
  }
}


// Starting date 1/1/2019, repeat 4 times, return dates 
// 3 days apart
consecutiveDates(new Date(2019, 0, 1), 4, 3)

// Should return an array with dates:
// 1. 1/1/2019 <- Starting date
// 2. 1/4/2019 <- Each date 3 days apart
// 3. 1/7/2019
// 4. 1/10/2019

// Stretch goals 
// add a unit for time:
// consecutiveDates(new Date(2019, 0, 1), 3, 1, 'year')
// Should return an array of 3 dates separated by 1 year

// 1. 1/1/2019
// 2. 1/1/2020
// 3. 1/1/2021

// function consecutiveDates(date, repeat, offset, unit = 'day') {
// 
// }

console.log('--------- Problem 1 Challenge --------')

function consecutiveDates(date, repeat, offset, unit = 'day') {
  for (let i = 0; i < repeat; i++) {
      console.log((i + 1) + '. ' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());

      switch (unit) {
          case 'day':
              date.setDate(date.getDate() + offset);
              break;
          case 'month':
              date.setMonth(date.getMonth() + offset);
              break;
          case 'year':
              date.setFullYear(date.getFullYear() + offset);
              break;
          default:
              throw new Error("Invalid time unit provided");
      }
  }
}

consecutiveDates(new Date(2019, 0, 1), 3, 1, 'year')

console.log('--------- Problem 2 --------')

// Write a function to order dates
// Takes an array of dates, returns an array of ordered dates
// Important! Array.sort() will sort alphabetically without a sorting function
// const nums = [5555, 888, 77, 2222, 1111, 3333]
// nums.sort() -> [1111, 2222, 3333, 5555, 888, 77]
// nums.sort((a,b) => a - b) -> [77, 888, 1111, 2222, 5555]

function orderDates(dates) {
  return dates.sort((a, b) => a - b);
}

console.log(orderDates([today, dueDate, startDate, bday, newYear]))

// [bday, startdate, duedate, newyear]

// Stretch: Return an object containing three keys each holding an array of dates. The keys are: 

// - past: array of dates that happened before today
// - present: all dates that happen today
// - furture: all of the dates that will occur in the future

// { past: [...], present:[...], future:[...] }

function categorizeDates(dates) {
  let today = new Date();
  // Set the time to midnight for accurate comparison
  today.setHours(0, 0, 0, 0);

  let result = {
      past: [],
      present: [],
      future: []
  };

  for(let date of dates) {
      let currentDate = date;
      currentDate.setHours(0, 0, 0, 0);

      if(currentDate < today) {
          result.past.push(date);
      } else if(currentDate.getTime() === today.getTime()) {
          result.present.push(date);
      } else {
          result.future.push(date);
      }
  }

  return result;
}

console.log(categorizeDates(orderDates([today, dueDate, startDate, bday, newYear])))

console.log('--------- Problem 3 --------')

// Given an array of dates find the date that will happen next. 
// You need to find the date that is closetest to today
// but not before!

function nextDate(dates) {
  let today = new Date();
  // Set the time to midnight for accurate comparison
  today.setHours(0, 0, 0, 0);

  // Filter out past dates and sort the future dates
  const futureDates = dates
      .filter(date => date > today)
      .sort((a, b) => a - b);

  // Return the closest future date, or null if there are no future dates
  return futureDates[0] || null;
}

console.log(nextDate([today, dueDate, startDate, bday, newYear]))

console.log('--------- Problem 3 Stretch --------')
// Stretch Goal: Return a human readable string: 
// Your next appointment is 3 days from now. 

function nextDateHuman(dates) {
  let today = new Date();
  // Set the time to midnight for accurate comparison
  today.setHours(0, 0, 0, 0);

  // Filter out past dates and sort the future dates
  const futureDates = dates
      .filter(date => date > today)
      .sort((a, b) => a - b);

  // If there are no future dates, return an appropriate message
  if (futureDates.length === 0) {
      return "There are no upcoming appointments.";
  }

  // Calculate the difference in days
  const nextAppointment = futureDates[0];
  const diffTime = nextAppointment - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  // Return a human-readable string
  if (diffDays === 1) {
      return "Your next appointment is tomorrow.";
  } else {
      return `Your next appointment is ${diffDays} days from now.`;
  }
}

console.log(nextDateHuman([today, dueDate, startDate, bday, newYear]))

console.log('--------- Problem 4 --------')

// Birthday planner. Write a function that takes a date (your birthday) 
// and a year, and returns the day of the week for that date in that year. 

function whensYourParty(date, year) {
      // Create a new date with the provided year while preserving the month and day from the original date
      const birthdayInGivenYear = new Date(year, date.getMonth(), date.getDate());
  
      // Get the day of the week
      const dayOfWeek = birthdayInGivenYear.getDay();
    
      // Return the day's name from the days array
      return days[dayOfWeek];
}

console.log(whensYourParty(bday, 2023), '<- day of my birthday party')

// Stretch Goal: Return an array listing all 
// the days when your birthday occured since 
// you were born. 
console.log('--------- Problem 4 Stretch --------')

function whensYourPartySinceBirth(birthday) {
  const birthYear = birthday.getFullYear();
  const currentYear = new Date().getFullYear();

  let birthdayDays = [];

  for(let year = birthYear; year <= currentYear; year++) {
      const birthdayInYear = new Date(year, birthday.getMonth(), birthday.getDate());
      const dayOfWeek = birthdayInYear.getDay();
      birthdayDays.push(days[dayOfWeek]);
  }

  return birthdayDays;
}

console.log('days of my birthday since birth')
console.log(whensYourPartySinceBirth(bday))