<script>
    // Import necessary modules and stores.
    import { page } from "$app/stores";

    // Import Svelte components.
    import HeaderContainer from "../../base/HeaderContainer.svelte";
    import Menu from "./Menu.svelte";

    // Define an array of menu items with their names and href values.
    const menuItems = [
        {
            name: "All divinations",
            href: "/collection",
        },
        {
            name: "Favourites",
            href: "/collection/favourites",
        },
    ];

    // Create a reactive variable 'current' that reflects the current page's URL pathname.
    $: current = $page.url.pathname;
</script>

<!-- HeaderContainer component -->
<HeaderContainer class="relative">
    <!-- Display the title "Collection" in the header -->
    <p
        class="w-full text-center text-[2rem] font-medium leading-[34px] capitalize"
    >
        Collection
    </p>
</HeaderContainer>

<!-- Menu component with menu items and the 'current' variable -->
<Menu {menuItems} {current} />
