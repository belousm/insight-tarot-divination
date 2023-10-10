<script>
    // Import necessary modules and components
    import { onMount } from "svelte";
    import { user } from "$lib";
    import { goto } from "$app/navigation";
    import { getUser } from "$lib/api/user";
    import Launch from "../../components/base/entrance/Launch.svelte";
    import Door from "../../components/base/entrance/Door.svelte";
    import Information from "../../components/base/entrance/information/Information.svelte";
    import Done from "../../components/base/entrance/information/Done.svelte";

    // Initialize variables to control component visibility
    let launchVisible = false;
    let doorVisible = false;
    let infoVisible = false;
    let infoDoneVisible = false;

    let tg; // Initialize a variable to hold Telegram-related data
    let opacity = 1; // Initialize opacity for animation

    onMount(async () => {
        launchVisible = true; // Show the Launch component on mount
        tg = window.Telegram.WebApp; // Initialize tg with Telegram.WebApp

        tg.expand(); // Expand the Telegram WebApp view

        // Get user data using the getUser function and Telegram data
        const result = await getUser(tg?.initDataUnsafe?.user?.id || "1");

        if (result.status) {
            opacity = 0; // Reduce opacity if user data is retrieved
        }

        setTimeout(() => {
            if (result.status) {
                setTimeout(() => {
                    $user = result.user; // Update the user store with retrieved user data
                    goto("/"); // Redirect to the home page after a delay
                }, 800);
            } else {
                $user["user_uid"] = tg?.initDataUnsafe?.user?.id || "1"; // Set user_uid to empty if user data is not retrieved
            }

            launchVisible = false; // Hide the Launch component

            doorVisible = true; // Show the Door component after a delay
        }, 2000); // Delay before hiding Launch and showing Door
    });
</script>

<!-- Conditional rendering based on component visibility -->
{#if launchVisible}
    <Launch {opacity} />
{/if}
{#if doorVisible}
    <Door
        on:click={() => {
            doorVisible = false;
            infoVisible = true;
        }}
    />
{/if}
{#if infoVisible}
    <Information bind:infoVisible bind:infoDoneVisible />
{/if}
{#if infoDoneVisible}
    <!-- Render the Done component if infoDoneVisible is true -->
    <Done />
{/if}
