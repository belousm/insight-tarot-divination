<script>
    // Import necessary modules and components
    import { page } from "$app/stores";
    import { fly } from "svelte/transition";
    import { goto } from "$app/navigation";
    import HeaderContainer from "../../../base/HeaderContainer.svelte";
    import Tarot from "../divinations/Tarot.svelte";
</script>

<div
    class="fixed top-0 left-0 right-0 bg-primaryblack z-20 w-full h-full box-border pb-16 overflow-scroll scrollbar-hide max-w-md m-auto"
    in:fly={{ duration: 300, opacity: 1, y: 400 }}
>
    <!-- HeaderContainer displaying the page title and a back button -->
    <HeaderContainer class="relative">
        <button
            on:click={() => {
                let query = new URLSearchParams(
                    $page.url.searchParams.toString()
                );
                query.delete("divination");
                goto(`?${query.toString()}`);
            }}
            class="absolute left-4 bottom-4"
        >
            <!-- SVG icon for the back button -->
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
        <!-- Display the divination title based on the URL query parameter -->
        <p
            class="w-full text-center text-[2rem] font-medium leading-[34px] capitalize"
        >
            {$page.url.searchParams.get("divination")}
        </p>
    </HeaderContainer>
    <!-- Conditionally render the 'Tarot' component based on the URL query parameter -->
    {#if $page.url.searchParams.get("divination") == "tarot"}
        <Tarot />
    {/if}
</div>
