import { DateTime } from 'https://cdn.jsdelivr.net/npm/luxon@3/build/es6/luxon.js'; // Full URL

// Current date
function currentDate(){
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');    
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}

// Diff calculation
function yearsAndMonthsBetween(date1Str, date2Str) {
    const date1 = DateTime.fromFormat(date1Str, 'dd-MM-yyyy');
    const date2 = DateTime.fromFormat(date2Str, 'dd-MM-yyyy');
    let years = date2.year - date1.year;
    let months = date2.month - date1.month;
    if (months < 0) {
        years--;
        months += 12;
    }
    return { years, months };
}

// user input

let externalDate = null;

function initializeDatePicker(selector) {
  const picker = datepicker(selector, {
    formatter: (input, date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const year = date.getFullYear();
      input.value = `${day}-${month}-${year}`;
    },
    position: 'bl', 
    startDay: 1,   
    onSelect: (instance, date) => {
      if (date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        externalDate = `${day}-${month}-${year}`;
      } else {
        externalDate = null;
      }
    },
  });

  return () => externalDate;
}

initializeDatePicker('#single-datepicker');

// final calculation
document.getElementById("btn").addEventListener('click', () => {
    const date1 = currentDate();
    const spanElement = document.getElementById("kuku");
    
    if (externalDate) {
        const difference = yearsAndMonthsBetween(externalDate, date1);
        spanElement.textContent = `${difference.years} years ${difference.months} months`;
    }
});