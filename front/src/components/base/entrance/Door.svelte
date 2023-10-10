<script>
    // Import transition effect
    import { fade } from "svelte/transition";
    // Import the Button component
    import Button from "../button/Button.svelte";
</script>

<!-- Main button element with a click event handler -->
<button
    on:click
    class="flex w-full flex-col justify-between items-center relative h-screen"
>
    <!-- Content container with a relative positioning -->
    <div class="flex w-full flex-col justify-start items-center relative">
        <!-- Title text with custom styling and fading effect -->
        <p
            class="text-center text-whitedark text-6xl font-normal leading-10 tracking-[0.52rem] ml-2 mb-[2.6875rem] pt-14"
        >
            insight
        </p>

        <!-- Image element with a fading effect and custom styling -->
        <img
            in:fade={{ duration: 1000, delay: 1500, opacity: 0 }}
            src="/images/entrance/door.png"
            alt=""
            class="w-[15.25rem] h-auto block -mb-8"
        />

        <!-- Subtitle text with a fading effect and custom styling -->
        <div
            class="px-4 py-3 mt-4"
            in:fade={{ duration: 1000, delay: 2500, opacity: 0 }}
        >
            <p class="text-5xl font-medium leading-[2.875rem] text-center">
                Your journey to self-discovery begins now
            </p>
        </div>
    </div>

    <!-- Button component with custom transitions -->
    <Button
        transitions={{
            in: {
                func: fade, // Transition function
                options: { duration: 1000, delay: 2500, opacity: 0 }, // Transition options
            },
        }}
        name="Get started"
        class="w-full"
    />
</button>
