// Arrays for days of the week and Akan names
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const maleNames = [
  "Kwasi",  // Sunday
  "Kwadwo", // Monday
  "Kwabena",// Tuesday
  "Kwaku",  // Wednesday
  "Yaw",    // Thursday
  "Kofi",   // Friday
  "Kwame"   // Saturday
];

const femaleNames = [
  "Akosua", // Sunday
  "Adwoa",  // Monday
  "Abenaa", // Tuesday
  "Akua",   // Wednesday
  "Yaa",    // Thursday
  "Afua",   // Friday
  "Ama"     // Saturday
];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("akanForm");
  const resultSection = document.getElementById("result");
  const resultText = document.getElementById("resultText");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get user input
    const day = parseInt(document.getElementById("day").value, 10);
    const month = parseInt(document.getElementById("month").value, 10);
    const year = parseInt(document.getElementById("year").value, 10);
    const gender = document.querySelector('input[name="gender"]:checked');

    // Validation: day
    if (isNaN(day) || day < 1 || day > 31) {
      showResult("Please enter a valid day between 1 and 31.", true);
      return;
    }

    // Validation: month
    if (isNaN(month) || month < 1 || month > 12) {
      showResult("Please enter a valid month between 1 and 12.", true);
      return;
    }

    // Validation: year (simple range)
    if (isNaN(year) || year < 1900 || year > 2100) {
      showResult("Please enter a valid year between 1900 and 2100.", true);
      return;
    }

    // Validation: gender selected
    if (!gender) {
      showResult("Please select your gender.", true);
      return;
    }

    // Optional: check if this is a real calendar date
    if (!isRealDate(year, month, day)) {
      showResult("The date you entered is not a valid calendar date.", true);
      return;
    }

    // Split year into CC and YY
    const yearString = year.toString().padStart(4, "0");
    const CC = parseInt(yearString.slice(0, 2), 10); // first two digits
    const YY = parseInt(yearString.slice(2), 10);    // last two digits
    const MM = month;
    const DD = day;

    // Use the structure of your formula
    // d = ((4*CC - 2*CC - 1) + (4.5*YY) + (102.6*(MM+1)) + DD) % 7
    const part1 = 4 * CC - 2 * CC - 1;
    const part2 = 4.5 * YY;
    const part3 = 102.6 * (MM + 1);

    const rawD = part1 + part2 + part3 + DD;

    // Use floor before modulus to keep an integer-like result
    const dInt = Math.floor(rawD);
    const dayIndex = ((dInt % 7) + 7) % 7; // ensure 0–6

    const dayName = daysOfWeek[dayIndex];

    let akanName;
    if (gender.value === "male") {
      akanName = maleNames[dayIndex];
    } else {
      akanName = femaleNames[dayIndex];
    }

    const message = `You were born on a ${dayName}. Your Akan name is ${akanName}.`;
    showResult(message, false);
  });

  // Display results or errors
  function showResult(message, isError) {
    resultSection.classList.remove("hidden");
    resultText.textContent = message;

    if (isError) {
      resultSection.style.backgroundColor = "#ffebee";
      resultSection.style.borderColor = "#ef9a9a";
    } else {
      resultSection.style.backgroundColor = "#e8f5e9";
      resultSection.style.borderColor = "#a5d6a7";
    }
  }

  // Check if a date actually exists (e.g., reject 31 February)
  function isRealDate(year, month, day) {
    const d = new Date(year, month - 1, day);
    return (
      d.getFullYear() === year &&
      d.getMonth() === month - 1 &&
      d.getDate() === day
    );
  }
});

