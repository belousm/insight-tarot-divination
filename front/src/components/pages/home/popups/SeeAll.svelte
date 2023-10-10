<script>
    // Import necessary modules and component
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { fly } from "svelte/transition";
    import HeaderContainer from "../../../base/HeaderContainer.svelte";
    import Icon from "../../../base/icons/Icon.svelte";

    // Declare a variable to hold divination data
    export let divinations;
</script>

<div
    class="fixed top-0 left-0 right-0 bg-primaryblack z-10 w-full h-full box-border pb-16 overflow-scroll scrollbar-hide max-w-md m-auto"
    in:fly={{ duration: 300, opacity: 1, y: 400 }}
>
    <!-- HeaderContainer displaying the page title and a back button -->
    <HeaderContainer class="relative">
        <button
            on:click={() => {
                let query = new URLSearchParams(
                    $page.url.searchParams.toString()
                );
                query.delete("seeAll");
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
        <!-- Display the title -->
        <p class="w-full text-center text-[2rem] font-medium leading-[34px]">
            Choose divination
        </p>
    </HeaderContainer>

    <!-- Display a list of divination options -->
    <div
        class="flex flex-col box-border py-4 px-10 items-center justify-start gap-6"
    >
        {#each divinations as { name, icon, description }}
            <button
                on:click={() => {
                    if (name != "tarot") {
                        return;
                    }
                    let query = new URLSearchParams(
                        $page.url.searchParams.toString()
                    );
                    query.set("divination", name);
                    goto(`?${query.toString()}`);
                }}
                class="p-px bg-gradient-to-b {name == 'tarot'
                    ? 'from-linearfrom to-linearto'
                    : 'from-lineardisablefrom to-lineardisableto'} rounded-xl w-full relative"
            >
                <div
                    class="flex flex-col items-center gap-4 pt-6 px-4 pb-4 rounded-xl bg-primaryblack w-full text-center"
                >
                    <Icon
                        class="w-10 h-10"
                        type={icon}
                        color={name == "tarot" ? "fill-white" : "fill-gray"}
                    />
                    <p
                        class="capitalize pt-4 pb-2 text-[2rem] font-medium leading-[18px] {name ==
                        'tarot'
                            ? 'text-white'
                            : 'text-gray'}"
                    >
                        {name}
                    </p>
                    <p
                        class="{name == 'tarot'
                            ? 'text-white opacity-60'
                            : 'text-gray'} font-inter text-sm leading-[14px]"
                    >
                        {description}
                    </p>
                </div>
                {#if name != "tarot"}
                    <div class="absolute flex gap-2 items-center top-2 left-4">
                        <div class="w-1.5 h-1.5 bg-gray rounded-full" />
                        <p class="font- text-xs italic font-inter">
                            coming soon
                        </p>
                    </div>
                {/if}
            </button>
        {/each}
    </div>
</div>
