<script>
    // Import various dependencies and components
    import { linear } from "svelte/easing"; // Easing function for transitions
    import { blur, fade } from "svelte/transition"; // Transition effects
    import Icon from "../../icons/Icon.svelte"; // Custom Icon component
    import MeshGradient from "../../MeshGradient.svelte"; // Custom MeshGradient component
    import ButtonLink from "../../button/ButtonLink.svelte"; // Custom ButtonLink component
</script>

<!-- Main container with a fade-in transition -->
<div
    class="flex w-full h-screen flex-col justify-between items-center relative"
    in:fade={{ duration: 500, opacity: 0 }}
>
    <!-- Content container with logo, title, and description -->
    <div
        class="flex w-full h-auto flex-col justify-start items-center flex-1 gap-4 mt-[21vh]"
    >
        <!-- Icon component with the type "star" -->
        <Icon type="star" class="w-40 h-40" />

        <!-- Text container for title and description -->
        <div
            class="w-full box-border flex-col justify-start items-center inline-flex"
        >
            <!-- Title text with styles -->
            <div
                class="w-full box-border px-4 py-3 justify-between items-end inline-flex"
            >
                <p
                    class="grow shrink basis-0 text-center text-stone-200 text-5xl font-medium leading-[2.875rem]"
                >
                    All done, you're in!
                </p>
            </div>
            <!-- Description text with styles -->
            <div
                class="w-full box-border px-4 py-3 justify-center items-center gap-2.5 inline-flex"
            >
                <p
                    class="grow shrink basis-0 text-center text-white text-base font-light font-inter leading-[1.125rem]"
                >
                    Welcome to a world of cosmic insights and personalized
                    guidance. Get ready to illuminate your life's path. Enjoy
                    the journey!
                </p>
            </div>
        </div>
    </div>

    <!-- ButtonLink component to navigate to the home page -->
    <ButtonLink href="/" name="Start exploring" class="w-full" />
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
    filePaths={["/images/entrance/done.svg"]}
    totalParticles={25}
    colors={[
        { r: 72, g: 24, b: 206 },
        { r: 16, g: 90, b: 186 },
        { r: 82, g: 148, b: 218 },
        { r: 207, g: 224, b: 246 },
    ]}
/>
