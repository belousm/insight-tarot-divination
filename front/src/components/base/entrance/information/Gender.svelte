<script>
    // Import various dependencies and components
    import { linear } from "svelte/easing"; // Easing function for transitions
    import { blur, fade, fly } from "svelte/transition"; // Transition effects
    import Button from "../../button/Button.svelte"; // Custom Button component
    import Icon from "../../icons/Icon.svelte"; // Custom Icon component
    import MeshGradient from "../../MeshGradient.svelte"; // Custom MeshGradient component

    // Define a prop for the current page and a variable to store the selected gender
    export let currentPage;
    export let value;

    // Define an array of gender options with their icons
    const genders = [
        {
            type: "Female",
            icon: "female",
        },
        {
            type: "Male",
            icon: "male",
        },
        {
            type: "Other",
            icon: "other",
        },
    ];
</script>

<!-- Title text with a fade-in transition -->
<p
    class="text-center text-whitedark text-5xl font-medium leading-[2.875rem] px-4 py-3 mt-6"
    in:fade={{ duration: 500, opacity: 0 }}
>
    Specify your gender
</p>

<!-- Main content container with a fade-in transition -->
<div
    class="w-full flex-1 flex flex-col justify-between"
    in:fade={{ duration: 500, opacity: 0 }}
>
    <!-- Gender selection buttons -->
    <div class="flex justify-between px-4 gap-1.5 mt-24">
        {#each genders as { type, icon }}
            <button
                class="flex w-full flex-col justify-center items-center gap-6 p-2.5 pt-10 group border border-transparent rounded-xl {icon.includes(
                    'active'
                )
                    ? 'box'
                    : ''} rounded-xl relative"
                on:click={() => {
                    if (icon.includes("active")) {
                        return;
                    }
                    // Reset other gender icons and set the selected one as active
                    genders.forEach((g) => {
                        g.icon = g.icon.split("active")[0];
                    });
                    icon = icon + "active";
                    value = type; // Update the selected gender
                }}
            >
                <!-- Icon for the gender -->
                <Icon
                    type={icon}
                    class="w-[3.125rem] h-[3.125rem]"
                    color="{icon.includes('active')
                        ? 'fill-white'
                        : 'fill-pink'} group-hover:fill-white transition"
                />
                <!-- Gender label -->
                <p
                    class="text-2xl font-semibold text-center {icon.includes(
                        'active'
                    )
                        ? 'text-white'
                        : 'text-pink'} group-hover:text-white transition"
                >
                    {type}
                </p>

                <!-- Gradient border if the gender is active -->
                {#if icon.includes("active")}
                    <img
                        src="/images/entrance/gradient-border.png"
                        class="w-full h-full absolute left-0 top-0"
                        alt=""
                    />
                {/if}
            </button>
        {/each}
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
    filePaths={["/images/entrance/gender.svg"]}
    totalParticles={10}
    colors={[
        { r: 156, g: 4, b: 44 },
        { r: 254, g: 154, b: 231 },
        { r: 254, g: 153, b: 105 },
        { r: 254, g: 206, b: 198 },
    ]}
/>
