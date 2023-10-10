<script>
    // Import the Icon component
    import Icon from "../icons/Icon.svelte";
    // Import transition effects and easing function
    import { linear } from "svelte/easing";
    import { blur, fade, fly } from "svelte/transition";
    // Import the MeshGradient component
    import MeshGradient from "../MeshGradient.svelte";
    // Import the onMount function from Svelte
    import { onMount } from "svelte";

    // Define a variable to control the opacity
    export let opacity = 1;

    let top; // Initialize a variable to store the top position

    // Use the onMount function to calculate the top position
    onMount(() => {
        top = -1 * document.getElementById("test").offsetTop + 56;
    });
</script>

<!-- Main button element with a click event handler -->
<button
    on:click
    class="flex w-full h-screen bg-gray-500 flex-col justify-center items-center"
>
    <!-- Icon component with custom transition effects -->
    <Icon
        transitions={{
            in: {
                func: fade, // Fade-in transition function
                options: { duration: 1000, opacity: 0 }, // Fade-in transition options
            },
            out: {
                func: fade, // Fade-out transition function
                options: { duration: 500, opacity: 0 }, // Fade-out transition options
            },
        }}
        class="w-10 h-10 mr-3"
        type="logotype"
    />

    <!-- Text element with fade-in and fly-out transitions -->
    <p
        in:fade={{ duration: 1000, opacity: 0 }}
        out:fly={{ duration: 500, delay: 800, opacity: opacity, y: top }}
        class="text-center text-whitedark text-6xl font-normal leading-10 tracking-[0.52rem] ml-2"
        id="test"
    >
        insight
    </p>

    <!-- MeshGradient component with custom transition effects -->
    <MeshGradient
        transitions={{
            in: {
                func: blur, // Blur-in transition function
                options: { duration: 1000, easing: linear }, // Blur-in transition options
            },
            out: {
                func: blur, // Blur-out transition function
                options: { duration: 300, delay: 300, easing: linear }, // Blur-out transition options
            },
        }}
        class="absolute top-0 left-0 -z-10 opacity-40"
        speed={0.5}
        filePaths={["/images/entrance/launch.svg"]}
        totalParticles={10}
        colors={[
            { r: 73, g: 54, b: 154 }, // Color 1
            { r: 219, g: 225, b: 252 }, // Color 2
        ]}
    />
</button>
