// Import the "writable" store from Svelte
import { writable } from "svelte/store";
// Import the "tarotDivinations" data from the "divinations" module
import { tarotDivinations } from "$lib/divinations";

// Create a writable store for user data
export const user = writable({});

// Function to check if a date string is in the format DD.MM.YYYY
export const isValidDate = (dateString) => {
    if (dateString.length == 0) {
        return true;
    }

    // Regular expression to match the DD.MM.YYYY format
    const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!datePattern.test(dateString)) {
        return false;
    }

    // Split the date string into day, month, and year
    const parts = dateString.split(".");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Check the validity of day, month, and year
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return false;
    }

    // Check that the month is within the range of 1 to 12
    if (month < 1 || month > 12) {
        return false;
    }

    // Check that the day is within the range based on the month
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return false;
    }

    // Check that the year is within a reasonable range
    if (year < 1900 || year > 2099) {
        return false;
    }

    // If all checks pass, the date is considered valid
    return true;
}

// Function to highlight specific answers in a text
export const highlightAnswer = (text) => {
    const answers = ["yes", "no", "maybe"];

    for (let answer of answers) {
        // Create a regular expression to match and highlight the answers
        const regex = new RegExp("(Your answer to the question: )(" + answer + ")(\\s*\\.)?", "i");
        text = text.replace(regex, "$1<b class='block text-xl font-bold py-2 uppercase'>$2</b>");
    }

    return text;
}

// Function to get the image path based on the provided data
export const getImagePath = (data) => {
    // Mapping of data type to image paths
    const typeMappings = {
        0: "/images/divinations/types/tarot/classic/card-of-the-day.png",
        1: "/images/divinations/types/tarot/classic/yes-no.png",
        2: "/images/divinations/types/tarot/classic/celtic-cross.png",
        3: "/images/divinations/types/tarot/classic/3-card-spread.png",
        5: "/images/divinations/types/tarot/classic/5-card-spread.png"
    };

    // Check if the data type is in the mapping, return the corresponding image path
    if (data.type in typeMappings) {
        return typeMappings[data.type];
    } else if (data.type === 4) {
        // Check if the data type is 4 (custom subtype)
        for (let i = 0; i < tarotDivinations.length; i++) {
            for (let type of tarotDivinations[i].types) {
                if (type.name === data.subtype) {
                    return type.image;
                }
            }
        }
    }

    // Default image path if no match is found
    return "/images/collection.png";
}