<script>
    // Import necessary modules and components
    import { linear } from "svelte/easing";
    import { user } from "$lib";
    import { blur } from "svelte/transition";
    import HeaderContainer from "../../base/HeaderContainer.svelte";
    import MeshGradient from "../../base/MeshGradient.svelte";
    import Button from "../../base/button/Button.svelte";
    import Icon from "../../base/icons/Icon.svelte";
    import { getCards } from "$lib/api/cards";
    import { onMount } from "svelte";

    // Exported props received by the component
    export let showCards;
    export let showPrepare;
    export let task;
    export let t;
    export let subt;

    // Initialize the state of the component
    let state = "loading";

    // Perform actions on component mount
    onMount(async () => {
        // Fetch cards data based on user, type, and subtype
        const result = await getCards($user["user_uid"], t, subt);

        if (result.status) {
            // Update state to "default" and initialize card selections
            state = "default";
            for (let i = 0; i < result.task.cards.length; i++) {
                result.task.cards[i]["selected"] = false;
            }
            task = result.task;
        }
    });
</script>

<div class="flex flex-col items-center pt-32">
    <!-- Display Taro Active Icon -->
    <Icon type="taroactive" class="w-10 h-10 mb-4" />
    <!-- Header for preparation step -->
    <HeaderContainer class="!pb-3">
        <p class="w-full text-center text-4xl font-medium leading-[46px]">
            Prepare for reading
        </p>
    </HeaderContainer>
    <!-- Instructional message for preparation -->
    <HeaderContainer class="py-3">
        <p
            class="w-full text-center text-base font-light font-inter leading-[18px]"
        >
            Take a deep breath, focus on your question, and press the button
            when you're ready
        </p>
    </HeaderContainer>
</div>

<!-- Button to start the reading -->
<Button
    name="Let's start"
    class="w-full position absolute bottom-0 left-0"
    {state}
    on:click={() => {
        if (state != "loading") {
            showPrepare = false;
            showCards = true;
        }
    }}
/>

<!-- MeshGradient component for background effect -->
<MeshGradient
    transitions={{
        in: {
            func: blur,
            options: { duration: 1000, easing: linear },
        },
    }}
    class="absolute bottom-0 left-0 -z-10 opacity-40"
    speed={0.5}
    filePaths={["/images/divinations/types/numerology/bg.svg"]}
    totalParticles={10}
    colors={[
        { r: 50, g: 49, b: 173 },
        { r: 160, g: 43, b: 76 },
    ]}
/>
