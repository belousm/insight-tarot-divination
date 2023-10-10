<script>
    // Import various dependencies and components
    import { isValidDate } from "$lib"; // Custom date validation function
    import { linear } from "svelte/easing"; // Easing function for transitions
    import { blur, fade } from "svelte/transition"; // Transition effects
    import Button from "../../button/Button.svelte"; // Custom Button component
    import MeshGradient from "../../MeshGradient.svelte"; // Custom MeshGradient component
    import InputDate from "../../InputDate.svelte"; // Custom InputDate component

    // Define props for the current page and a value (possibly a date of birth)
    export let currentPage;
    export let value;

    // Initialize a variable to control whether to show an error message
    let showError = false;
</script>

<!-- Title text with a fade-in transition -->
<p
    class="text-center text-whitedark text-5xl font-medium leading-[2.875rem] px-4 py-3 mt-6"
    in:fade={{ duration: 500, opacity: 0 }}
>
    Specify your date of birth
</p>

<!-- Main content container with a fade-in transition -->
<div
    class="w-full flex-1 flex flex-col justify-between"
    in:fade={{ duration: 500, opacity: 0 }}
>
    <!-- InputDate component for date input with error handling -->
    <div class="flex flex-col px-4 box-border w-full mt-9 mb-2.5">
        <InputDate
            class="dateInput {showError ? 'border-red' : ''}"
            name="date"
            bind:value
            required
        />
        <!-- Display an error message if 'showError' is true -->
        {#if showError}
            <p class="pl-4 text-base font-inter text-red">Wrong Date</p>
        {/if}
    </div>

    <!-- Button component to continue to the next page -->
    <Button
        on:click={() => {
            // Check if the date is valid using the 'isValidDate' function
            if (!isValidDate(value)) {
                showError = true; // Display an error message
                return;
            }

            showError = false; // Hide the error message
            currentPage++; // Increment the current page
        }}
        name="Continue"
        class="w-full"
    />
</div>

<!-- MeshGradient component with a blur transition and gradient settings -->
<MeshGradient
    transitions={{
        in: {
            func: blur, // Transition function for entering the element
            options: { duration: 1000, easing: linear }, // Transition options
        },
    }}
    class="absolute bottom-0 left-0 -z-10 opacity-40"
    speed={0.5}
    filePaths={["/images/entrance/date.svg"]}
    totalParticles={10}
    colors={[
        { r: 255, g: 238, b: 255 },
        { r: 127, g: 55, b: 158 },
        { r: 171, g: 57, b: 45 },
    ]}
/>
