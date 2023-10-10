<script>
    // Import various dependencies and components
    import { linear } from "svelte/easing"; // Easing function for transitions
    import { blur, fade } from "svelte/transition"; // Transition effects
    import Input from "../../Input.svelte"; // Input component for user's name
    import Button from "../../button/Button.svelte"; // Button component
    import MeshGradient from "../../MeshGradient.svelte"; // Custom MeshGradient component

    // Define props for controlling the current page and user's input value
    export let currentPage;
    export let value;
</script>

<!-- Title text with a fade-in transition -->
<p
    class="text-center text-whitedark text-5xl font-medium leading-[2.875rem] px-4 py-3 mt-6"
    in:fade={{ duration: 500, opacity: 0 }}
>
    How should we
    <br />call you?
</p>

<!-- Main content container with fade-in transition -->
<div
    class="w-full flex-1 flex flex-col justify-between"
    in:fade={{ duration: 500, opacity: 0 }}
>
    <!-- Input field for the user's name -->
    <div class="flex px-4 box-border w-full mt-9 mb-2.5">
        <Input name="name" placeholder="Your name" bind:value required />
    </div>

    <!-- Button to continue to the next page -->
    <Button
        on:click={() => {
            currentPage++; // Increment the current page
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
    filePaths={["/images/entrance/name.svg"]}
    totalParticles={10}
    colors={[
        { r: 77, g: 114, b: 203 },
        { r: 77, g: 114, b: 203 },
    ]}
/>
