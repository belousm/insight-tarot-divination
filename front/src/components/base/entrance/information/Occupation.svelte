<script>
    // Import various dependencies and components
    import { linear } from "svelte/easing"; // Easing function for transitions
    import { blur, fade } from "svelte/transition"; // Transition effects
    import Button from "../../button/Button.svelte"; // Button component
    import MeshGradient from "../../MeshGradient.svelte"; // Custom MeshGradient component
    import Chip from "../../Chip.svelte"; // Chip component for selecting occupation

    // Define props for controlling the current page and user's input value
    export let currentPage;
    export let value;

    // Initialize an array of occupations with their selected state
    let occupations = [
        {
            name: "Student",
            selected: false,
        },
        {
            name: "Business owner",
            selected: false,
        },
        {
            name: "Looking for a job",
            selected: false,
        },
        {
            name: "Freelancer",
            selected: false,
        },
        {
            name: "Employee",
            selected: false,
        },
        {
            name: "Homemaker",
            selected: false,
        },
        {
            name: "Unemployed",
            selected: false,
        },
    ];
</script>

<!-- Title text with a fade-in transition -->
<p
    class="text-center text-whitedark text-5xl font-medium leading-[2.875rem] px-4 py-3 mt-6"
    in:fade={{ duration: 500, opacity: 0 }}
>
    What is your occupation?
</p>

<!-- Main content container with fade-in transition -->
<div
    class="w-full flex-1 flex flex-col justify-between"
    in:fade={{ duration: 500, opacity: 0 }}
>
    <!-- Occupation selection chips -->
    <div class="flex px-4 box-border w-full mt-9 mb-2.5 gap-2 flex-wrap">
        {#each occupations as { name, selected }}
            <Chip
                on:click={() => {
                    // Deselect all other occupations and select the clicked one
                    occupations.forEach((o) => {
                        o.selected = false;
                    });
                    selected = true;
                }}
                {name}
                bind:selected
            />
        {/each}
    </div>

    <!-- Button to continue to the next page -->
    <Button
        on:click={() => {
            // Extract the selected occupation's name and increment the current page
            value = occupations
                .filter((o) => o.selected == true)
                .map((o) => o.name)[0];
            currentPage++;
        }}
        name="Continue"
        class="w-full"
    />
</div>

<!-- MeshGradient component with blur transition and gradient settings -->
<MeshGradient
    transitions={{
        in: {
            func: blur, // Transition function for entering the element
            options: { duration: 1000, easing: linear }, // Transition options
        },
    }}
    class="absolute bottom-0 left-0 -z-10 opacity-40"
    speed={0.5}
    filePaths={["/images/entrance/occupation.svg"]}
    totalParticles={10}
    colors={[
        { r: 9, g: 151, b: 166 },
        { r: 246, g: 193, b: 241 },
        { r: 130, g: 130, b: 188 },
        { r: 255, g: 232, b: 250 },
    ]}
/>
