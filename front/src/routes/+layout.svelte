<script>
    // Import necessary CSS and modules
    import "../app.css";
    import { user } from "$lib";
    import { getUser } from "$lib/api/user";
    import { page } from "$app/stores";
    import Menu from "../components/base/Menu.svelte";
    import { onMount } from "svelte";

    // Define an array of pages with their names and href values
    let pages = [
        {
            name: "HOME",
            href: "/",
        },
        {
            name: "COLLECTION",
            href: "/collection",
        },
        {
            name: "PROFILE",
            href: "/profile",
        },
    ];

    let tg;

    // Perform actions when the component is mounted
    onMount(async () => {
        tg = window.Telegram.WebApp;

        // Retrieve user information using an API call
        const result = await getUser(tg?.initDataUnsafe?.user?.id || "");

        if (result.status) {
            // Set the user data if available
            $user = result.user;
            if ($user["date_birth"]) {
                $user["date_birth"] = new Date($user["date_birth"])
                    .toISOString()
                    .slice(0, 10);
            }
        } else {
            // Set the user_uid if the user is not found
            $user["user_uid"] = tg?.initDataUnsafe?.user?.id;
        }
    });

    // Define a 'menu' based on the current page's URL pathname
    $: menu = pages
        .map((p) => p.href)
        .some((p) => {
            if (p == "/" && $page.url.pathname == p) {
                return true;
            } else if (p != "/") {
                return $page.url.pathname.includes(p);
            } else {
                return false;
            }
        });
</script>

<div
    class="w-full max-w-md m-auto h-screen box-border {menu
        ? 'pb-16'
        : ''} relative overflow-scroll scrollbar-hide select-none"
>
    <slot />
    {#if menu}
        <!-- Display the menu component if 'menu' is true -->
        <Menu {pages} />
    {/if}
</div>
