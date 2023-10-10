<script>
    // Import necessary modules and components
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import Card from "../../base/Card.svelte";
    import HeaderContainer from "../../base/HeaderContainer.svelte";
    import Back from "./Back.svelte";

    // Exported props received by the component
    export let task;
    export let currentDivination;
    export let showCards;
    export let showLoading;
    export let showHeader;
    export let showBack;
    export let theme;

    // Initialize variables
    let counter = -1;
    let showHeaderText = true;

    // Create an array of 'cards' with initial state
    let cards = task.cards.map((card) => ({
        ...card,
        selected: card.selected || false,
    }));

    let swiper;

    // On component mount, initialize the Swiper for card interactions
    onMount(() => {
        swiper = new Swiper(".swiper-container", {
            effect: "cards",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            loop: true,
        });
    });

    // Function to select a card
    function selectCard() {
        if (counter + 1 >= currentDivination.cards) {
            return;
        }
        // Find all cards with 'selected' set to 'false'
        let unselectedCards = cards.filter((card) => !card.selected);

        // If there are no unselected cards, do nothing
        if (unselectedCards.length === 0) return;

        // Select a random card from the list of unselected cards
        let randomIndex = Math.floor(Math.random() * unselectedCards.length);
        let randomCard = unselectedCards[randomIndex];

        // Update the state of cards to mark the selected card
        cards = cards.map((card) => {
            if (card.id == randomCard.id) {
                return { ...card, selected: true };
            }
            return card;
        });

        // Update the UI and check if all cards are selected
        showHeaderText = false;
        counter += 1;

        if (cards.filter((c) => c.selected).length == currentDivination.cards) {
            task.cards = cards;
            setTimeout(() => {
                showCards = false;
                setTimeout(() => {
                    showHeader = false;
                    showLoading = true;
                }, 1200);
            }, 1200);
        }
    }
</script>

<!-- HeaderContainer displaying card count and theme -->
<HeaderContainer class="relative">
    <p
        class="absolute left-0 right-0 -top-2 text-center text-lightgray text-base font-light font-inter leading-none"
    >
        {#if counter >= 0}
            card {counter + 1}/{currentDivination.cards}
        {:else if theme != undefined}
            {theme}
        {/if}
    </p>
    <p
        class="text-center text-center text-5xl font-medium leading-[46px] w-full"
    >
        {#if showHeaderText}
            Choose {currentDivination.cards}
            {currentDivination.cards == 1 ? "card" : "cards"}
        {:else}
            {currentDivination.words[counter]}
        {/if}
    </p>
</HeaderContainer>
{#if showHeaderText}
    <!-- Display the description for the current divination -->
    <HeaderContainer class="absolute lef-0 top-34">
        <p
            class="text-center text-white text-base font-light font-inter leading-[18px]"
        >
            {currentDivination.description}
        </p>
    </HeaderContainer>
{/if}

{#if showBack}
    <Back bind:showBack />
{/if}

<!-- Container for displaying cards -->
<div
    out:fade={{ duration: 500, opacity: 0 }}
    class="flex w-full flex-col justify-between box-border pb-24 overflow-x-hidden"
>
    <div class="flex flex-col w-full box-border px-4 pb-16">
        <div
            class="grid
        {currentDivination.cards == 10 || currentDivination.cards == 5
                ? 'grid-cols-5'
                : ''}
        {currentDivination.cards == 3 ? 'grid-cols-3' : ''}
        {currentDivination.cards == 1 ? 'grid-cols-1' : ''}
        gap-2 h-[200px]"
        >
            <!-- Iterate over selected cards and display them -->
            {#each cards.filter((c) => c.selected === true) as card (card.id)}
                <button class="m-auto">
                    <Card class="w-16" />
                </button>
            {/each}
        </div>
    </div>

    <!-- Swiper container for card selection -->
    <div class="w-full relative">
        <div class="swiper-container m-auto">
            <div class="swiper-wrapper">
                <!-- Iterate over cards and create buttons for card selection -->
                {#each cards as card (card.id)}
                    <button
                        class="swiper-slide"
                        on:click={() => {
                            selectCard(card.id);
                        }}
                    >
                        <img
                            src="/images/card.png"
                            class="block w-28 h-auto"
                            alt=""
                        />
                    </button>
                {/each}
            </div>
        </div>

        <img
            src="/images/divinations/swipe.svg"
            alt=""
            class="block absolute h-6 w-auto -bottom-16 left-0 right-0 m-auto"
        />
    </div>
</div>
