// Import the getTask function from the specified API module
import { getTask } from "$lib/api/task";

// Define an asynchronous function called "load" which is used for route data loading
export async function load({ params }) {
    // Call the getTask function with the "task_uid" parameter from the route parameters
    const result = await getTask(params.task_uid)

    // Check if the result status is true and if the task status is 2 (indicating a successful task)
    if (result.status && result.task.status == 2) {
        // If the task is successful, return the task object
        return result.task
    }

    // If the task is not successful or the result status is false, return an empty object with specific properties
    return {
        processed_cards: [],
        selected_cards: [],
        cards: [],
    }
}