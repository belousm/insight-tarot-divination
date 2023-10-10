<script>
    // Import the "page" store from the Svelte app stores
    import { page } from "$app/stores";

    // Import the "Menu" and "HeaderContainer" Svelte components
    import Menu from "./Menu.svelte";
    import HeaderContainer from "../../base/HeaderContainer.svelte";

    // Define an array of menu items with their names and corresponding href links
    const menuItems = [
        {
            name: "Personal Info",
            href: "/profile",
        },
        {
            name: "About",
            href: "/about",
        },
    ];

    // Create a reactive variable "current" that tracks the current page's pathname
    $: current = $page.url.pathname;
</script>

<HeaderContainer class="relative">
    <!-- Display a header with the title "Profile" -->
    <p
        class="w-full text-center text-[2rem] font-medium leading-[34px] capitalize"
    >
        Profile
    </p>
</HeaderContainer>

<!-- Render the "Menu" component with the "menuItems" and "current" props -->
<Menu {menuItems} {current} />
