<script>
    // Import necessary modules and components
    import { getCardOfDay } from "$lib/api/task";
    import { user } from "$lib";
    import { onMount } from "svelte";
    import Card from "../../base/Card.svelte";

    // Declare a variable to store the card of the day
    let cardOfDay;

    // Use the onMount lifecycle function to fetch the card of the day data
    onMount(async () => {
        const result = await getCardOfDay($user["user_uid"]);

        // Assign the fetched card data to the cardOfDay variable
        cardOfDay = result.task;
    });
</script>

<!-- Conditional rendering based on the cardOfDay status -->
{#if cardOfDay?.status != 2}
    <!-- Display card of the day option when the status is not 2 (available) -->
    <a
        href="/divination/card-of-the-day"
        class="w-full h-60 flex flex-col justify-end items-center gap-4 box-border p-6 text-center relative"
    >
        <!-- Display a card component with absolute positioning -->
        <Card class="w-28 !absolute bottom-9 -z-20" />
        <!-- Display a taro-card component with absolute positioning -->
        <div class="taro-card w-full h-[4.5rem] absolute bottom-9 -z-10" />
        <p class="text-[2rem] leading-[1.125rem] font-medium">
            Pick your card of the day
        </p>
        <p class="opacity-60 font-inter text-sm leading-3 font-light">
            Gain daily insights and guidance through a single tarot card,
            tailored to your unique questions
        </p>
    </a>
{:else}
    <!-- Display card of the day result when the status is 2 (available) -->
    <a
        href="/recent-result/{cardOfDay.task_uid}"
        class="w-full h-60 flex flex-col justify-end items-center gap-4 box-border p-6 text-center relative"
    >
        <div
            class="w-28 absolute bottom-9 -z-20 rounded-[10px] overflow-hidden"
        >
            <img
                src="/images/cards/{cardOfDay.processed_cards[0].card}.jpg"
                class="w-full h-auto"
                alt=""
            />
        </div>
        <!-- Display a taro-card component with absolute positioning -->
        <div class="taro-card w-full h-[4.5rem] absolute bottom-9 -z-10" />
        <p class="text-[2rem] leading-[1.125rem] font-medium">
            Your card of the day
        </p>
        <p class="uppercase pt-2 font-inter text-sm leading-3 font-light">
            {cardOfDay.processed_cards[0].card}
        </p>
    </a>
{/if}

<!-- Define a CSS style for the taro-card component -->
<style>
    .taro-card {
        background: linear-gradient(
            180deg,
            rgba(11, 9, 2, 0) 0%,
            #0b0902 96.76%
        );
    }
</style>
