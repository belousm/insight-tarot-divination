<script>
    // Import necessary modules and components
    import { fly } from "svelte/transition";
    import { user } from "$lib";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    import HeaderContainer from "../components/base/HeaderContainer.svelte";
    import CardOfTheDay from "../components/pages/home/CardOfTheDay.svelte";
    import Moon from "../components/pages/home/Moon.svelte";
    import MiniButton from "../components/base/button/MiniButton.svelte";
    import Divinations from "../components/pages/home/divinations/Names.svelte";
    import Tarot from "../components/pages/home/divinations/Tarot.svelte";
    import Astrology from "../components/pages/home/divinations/Astrology.svelte";
    import YiJing from "../components/pages/home/divinations/YiJing.svelte";
    import Numerology from "../components/pages/home/divinations/Numerology.svelte";
    import SeeAll from "../components/pages/home/popups/SeeAll.svelte";
    import Divination from "../components/pages/home/popups/Divination.svelte";

    // Define an array of divination options with names, icons, descriptions, and selection status
    let divinations = [
        {
            name: "tarot",
            icon: "taroactive",
            description:
                "Gain daily insights and answers, tailored to your unique life questions, illuminating the path ahead",
            selected: true,
        },
        {
            name: "astrology",
            icon: "moon",
            description:
                "Unlock cosmic insights and guidance with personalized astrology readings, aligning the stars with your life's questions",
            selected: false,
        },
        {
            name: "yi jing",
            icon: "yijing",
            description:
                "Access the timeless wisdom of the Yi Jing, interpreting patterns of change in response to your questions",
            selected: false,
        },
        {
            name: "numerology",
            icon: "numerology",
            description:
                "Discover hidden number meanings in personalized numerology reports, illuminating your life's path.",
            selected: false,
        },
    ];
</script>

<!-- Main screen -->
<div
    class="w-full max-w-md m-auto h-screen box-border relative select-none"
    in:fly={{ duration: 500, opacity: 0, y: 100 }}
>
    <!-- Display a greeting message with the user's name if available -->
    <p class="text-2xl font-medium w-full px-4 py-7 leading-4">
        Hello{$user?.name ? `, ${$user.name}!` : ""}
    </p>

    <!-- Render Moon and CardOfTheDay components -->
    <Moon />
    <CardOfTheDay />

    <!-- Display header with divination options and a "SEE ALL" button -->
    <HeaderContainer>
        <p class="text-[2rem] leading-[34px]" id="taro-divination">
            Choose divination
        </p>
        <MiniButton
            on:click={() => {
                let query = new URLSearchParams(
                    $page.url.searchParams.toString()
                );
                query.set("seeAll", "true");
                goto(`?${query.toString()}`);
            }}
            name="SEE ALL"
        />
    </HeaderContainer>

    <!-- Render Divinations component with bind to update the divinations array -->
    <Divinations bind:divinations />

    <!-- Render Tarot, Astrology, YiJing, and Numerology components based on selection  -->
    {#if divinations.filter((d) => d.name == "tarot" && d.selected == true).length == 1}
        <Tarot />
    {/if}
    {#if divinations.filter((d) => d.name == "astrology" && d.selected == true).length == 1}
        <Astrology bind:divinations />
    {/if}
    {#if divinations.filter((d) => d.name == "yi jing" && d.selected == true).length == 1}
        <YiJing bind:divinations />
    {/if}
    {#if divinations.filter((d) => d.name == "numerology" && d.selected == true).length == 1}
        <Numerology bind:divinations />
    {/if}

    <!-- Render the SeeAll component based on the query parameter -->
    {#if $page.url.searchParams.get("seeAll") == "true"}
        <SeeAll bind:divinations />
    {/if}

    <!-- Render the Divination component based on the query parameter -->
    {#if $page.url.searchParams.get("divination") != null}
        <Divination />
    {/if}
</div>
