<script>
    // Import necessary modules and components
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { tarotDivinations } from "$lib/divinations";
    import HeaderContainer from "../../../components/base/HeaderContainer.svelte";
    import Prepare from "../../../components/pages/divination/Prepare.svelte";
    import Carousel from "../../../components/pages/divination/Carousel.svelte";
    import Loading from "../../../components/pages/divination/Loading.svelte";

    // Determine the current divination type based on the URL pathname
    const currentDivination = tarotDivinations
        .reduce((result, item) => {
            return result.concat(item.types);
        }, [])
        .find((d) => d.href == $page.url.pathname);

    // Initialize flags and variables for controlling component visibility and data
    let showPrepare = true;
    let showCards = false;
    let showLoading = false;
    let showHeader = true;
    let showBack = false;
    let task;
    
    const getTheme = (targetHref) => {
        // Iterate through divination categories to find the theme based on the URL pathname
        for (const category of tarotDivinations) {
            for (const divinationType of category.types) {
                if (divinationType.href === targetHref) {
                    // Found the corresponding element, return its caption
                    // Exit the loop since the desired element has been found
                    return category.caption;
                }
            }
        }

        // Return an empty string if no theme is found
        return "";
    };

    // Initialize the 'theme' variable by calling the 'getTheme' function with the current URL pathname
    let theme = getTheme($page.url.pathname);
</script>

<!-- Render the header if 'showHeader' flag is true -->
{#if showHeader}
    <HeaderContainer class="relative pb-8">
        <!-- Create a button for navigating back to the main page -->
        <button
            on:click={() => {
                if (!showBack && showCards) {
                    showBack = true;
                    return;
                }
                
                goto(`/`);
            }}
            class="absolute left-4 bottom-8"
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10.3672 5.14925C10.6016 4.91494 10.6016 4.53505 10.3672 4.30073C10.1329 4.06642 9.75306 4.06642 9.5187 4.30073L3.23466 10.5847C2.12166 11.6977 2.12166 13.5022 3.23466 14.6152L9.5187 20.8992C9.75306 21.1336 10.1329 21.1336 10.3672 20.8992C10.6016 20.665 10.6016 20.2851 10.3672 20.0507L4.08318 13.7667C3.9165 13.6 3.7929 13.4064 3.71238 13.1999L21.0055 13.1999C21.3368 13.1999 21.6055 12.9313 21.6055 12.5999C21.6055 12.2686 21.3368 11.9999 21.0055 11.9999L3.7125 12C3.7929 11.7935 3.9165 11.6 4.08318 11.4333L10.3672 5.14925Z"
                    fill="white"
                />
            </svg>
        </button>
        <!-- Display the name of the current divination type -->
        <p
            class="w-full text-center text-[2rem] font-medium leading-[34px] px-8 box-border"
        >
            {currentDivination.name}
        </p>
    </HeaderContainer>
{/if}

<!-- Render the 'Prepare' component if 'showPrepare' flag is true -->
{#if showPrepare}
    <Prepare
        bind:task
        bind:showCards
        bind:showPrepare
        t={currentDivination.name}
    />
{/if}

<!-- Render the 'Carousel' component if 'showCards' flag is true -->
{#if showCards}
    <Carousel
        bind:task
        {currentDivination}
        bind:showCards
        bind:showLoading
        bind:showHeader
        bind:showBack
        bind:theme
    />
{/if}

<!-- Render the 'Loading' component if 'showLoading' flag is true -->
{#if showLoading}
    <Loading bind:showLoading image={currentDivination.cards} bind:task />
{/if}
