// Function to calculate the moon phase based on the date
export const moonPhase = (year, month, day) => {
    // Define the lunar number of the year
    const lunarNumberOf2000 = 6;
    let lunarNumber = (year - 2000 + lunarNumberOf2000) % 19;
    if (lunarNumber === 0) lunarNumber = 19;

    // Calculate the lunar day using a formula
    let N = (lunarNumber * 11) - 14 + day + month;

    // Ensure N is within the range of 1 to 30 (a lunar month)
    while (N > 30) {
        N -= 30;
    }

    // Convert the lunar day number into a moon phase and its description
    switch (N) {
        case 1: return ["New Moon", "Good for New Beginnings", 0];
        case 2: return ["2nd Day of Waxing Moon", "Taking Action on Goals", 1];
        case 3: return ["3rd Day of Waxing Moon", "Growth and Expansion", 1];
        case 4: return ["4th Day of Waxing Moon", "Building Momentum", 1];
        case 5: return ["5th Day of Waxing Moon", "Focused Effort", 1];
        case 6: return ["6th Day of Waxing Moon", "Creativity and Innovation", 1];
        case 7: return ["7th Day of Waxing Moon", "Creativity and Innovation", 1];
        case 8: return ["8th Day of Waxing Moon", "Progress and Advancement", 1];
        case 9: return ["First Quarter", "Overcoming Challenges", 2];
        case 10: return ["10th Day of Waxing Moon", "Breakthroughs and Solutions", 3];
        case 11: return ["11th Day of Waxing Moon", "Inner Strength and Resilience", 3];
        case 12: return ["12th Day of Waxing Moon", "Nurturing and Support", 3];
        case 13: return ["13th Day of Waxing Moon", "Transformation and Change", 3];
        case 14: return ["14th Day of Waxing Moon", "Balance and Harmony", 3];
        case 15: return ["Full Moon", "Culmination and Achievement", 4];
        case 16: return ["16th Day of Waning Moon", "Letting Go and release", 5];
        case 17: return ["17th Day of Waning Moon", "Recharging", 5];
        case 18: return ["18th Day of Waning Moon", "Inner reflection", 5];
        case 19: return ["19th Day of Waning Moon", "Healing and recovery", 5];
        case 20: return ["20th Day of Waning Moon", "Decluttering and simplification", 5];
        case 21: return ["21st Day of Waning Moon", "Planning and preparation", 5];
        case 22: return ["Last Quarter", "Reassessment time", 6];
        case 23: return ["23rd Day of Waning Moon", "Patience and endurance", 7];
        case 24: return ["24th Day of Waning Moon", "Closure and completion", 7];
        case 25: return ["25th Day of Waning Moon", "Surrender and letting be", 7];
        case 26: return ["26th Day of Waning Moon", "Gratitude and acceptance", 7];
        case 27: return ["27th Day of Waning Moon", "Transition and transformation", 7];
        case 28: return ["28th Day of Waning Moon", "Fresh beginnings", 7];
        default: return ["Unexpected Lunar Day", "Unknown Energy", 8];
    }
}

// Function to format a date object as "DayName, MM/DD"
export const getDateFormatted = (date) => {
    // Define an array of day names
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayName = days[date.getUTCDay()];

    // Format the month, day, and year components with leading zero
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // +1 потому что месяцы начинаются с 0
    const day = (date.getDate()).toString().padStart(2, "0")
    const year = date.getUTCFullYear().toString().slice(2);

    // Return the formatted date string
    return `${dayName}, ${month}/${day}`;
};