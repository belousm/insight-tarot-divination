<!-- Svelte script section -->
<script>
    // Import the 'fly' transition and 'page' store from Svelte and the '$app' module.
    import { fly } from "svelte/transition";
    import { page } from "$app/stores";

    // Define 'pages' as a prop to accept an array of page objects.
    export let pages;

    // Define a function 'checkCurrent' to determine if a page is currently active.
    const checkCurrent = (p, pn) => {
        if (p == "/" && pn == p) {
            return true;
        } else if (p != "/") {
            return pn.includes(p);
        } else {
            return false;
        }
    };
</script>

<!-- Svelte HTML structure -->
<div
    in:fly={{ duration: 500, opacity: 0, y: 200 }}
    class="w-full max-w-md m-auto p-2 taro-menu backdrop-blur-[13px] justify-between gap-4 flex items-center fixed bottom-0 left-0 right-0 z-30 font-inter"
>
    {#each pages as { name, href }}
        <a
            {href}
            on:click={() => {
                $page.url.searchParams.delete("seeAll");
            }}
            class="w-full text-center {checkCurrent(href, $page.url.pathname)
                ? 'text-white'
                : 'text-pink'} text-sm leading-6 font-medium flex flex-col relative items-center py-3"
        >
            <span
                class="block w-fit relative flex flex-col justify-center items-center"
            >
                {name}
                <!-- Display the page name. -->

                {#if checkCurrent(href, $page.url.pathname)}
                    <!-- Display a divider line if the page is currently active. -->
                    <div
                        class="w-full h-[0.75px] top-[1.625rem] absolute bg-white rounded-[10px]"
                    />
                {/if}
            </span>
        </a>
    {/each}
</div>

<!-- CSS style section -->
<style>
    .taro-menu {
        background: rgba(16, 7, 3, 0.85);
    }
</style>
