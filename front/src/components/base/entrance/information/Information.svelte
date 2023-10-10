<script>
    // Import various dependencies and components
    import { user } from "$lib"; // User data
    import { setUser } from "$lib/api/user"; // API function to set user data
    import { fade } from "svelte/transition"; // Fade-in transition effect
    import MiniButton from "../../button/MiniButton.svelte"; // MiniButton component
    import Paginator from "./Paginator.svelte"; // Paginator component
    import Name from "./Name.svelte"; // Name component
    import Gender from "./Gender.svelte"; // Gender component
    import Date from "./Date.svelte"; // Date component
    import Occupation from "./Occupation.svelte"; // Occupation component
    import Relationship from "./Relationship.svelte"; // Relationship component

    // Define props for controlling the visibility of information and done sections
    export let infoVisible;
    export let infoDoneVisible;

    // Initialize variables to manage the current page and user information
    let currentPage = 0;
    let name;
    let gender;
    let date;
    let occupation;
    let relationship;

    // Function to save user information to the server
    const saveUserInfo = async () => {
        let date_birth = date; // Store date of birth

        const body = {
            user_uid: $user["user_uid"],
        };
        if (name) {
            body["name"] = name;
        }
        if (gender) {
            body["sex"] = gender;
        }
        if (date_birth) {
            body["date_birth"] = date_birth;
        }
        if (occupation) {
            body["occupation"] = occupation;
        }
        if (relationship) {
            body["relationship"] = relationship;
        }

        // Update user data with the new information
        for (let item in body) {
            $user[item] = body[item];
        }

        // Call the API to save user information
        const result = await setUser(body);
    };

    // When currentPage reaches 5, save user info and transition to the next section
    $: if (currentPage == 5) {
        saveUserInfo();
        infoVisible = false;
        infoDoneVisible = true;
        currentPage = 0; // Reset currentPage
    }
</script>

<!-- Main container with fade-in transition -->
<div
    class="flex w-full h-screen bg-gray-500 flex-col justify-start items-center relative"
    in:fade={{ duration: 1000, opacity: 0 }}
>
    <!-- MiniButton to save user info and transition to the next section -->
    <div class="w-full flex justify-end p-4 box-border">
        <MiniButton
            on:click={() => {
                saveUserInfo();
                infoVisible = false;
                infoDoneVisible = true;
                currentPage = 0; // Reset currentPage
            }}
        />
    </div>

    <!-- Paginator component to display page navigation -->
    <Paginator pagesNum={5} {currentPage} />

    <!-- Content container for dynamic components based on the currentPage -->
    <div class="flex w-full h-auto flex-col justify-start items-center flex-1">
        <!-- Conditionally render Name component based on currentPage -->
        {#if currentPage == 0}
            <Name bind:currentPage bind:value={name} />
        {/if}
        <!-- Conditionally render Gender component based on currentPage -->
        {#if currentPage == 1}
            <Gender bind:currentPage bind:value={gender} />
        {/if}
        <!-- Conditionally render Date component based on currentPage -->
        {#if currentPage == 2}
            <Date bind:currentPage bind:value={date} />
        {/if}
        <!-- Conditionally render Occupation component based on currentPage -->
        {#if currentPage == 3}
            <Occupation bind:currentPage bind:value={occupation} />
        {/if}
        <!-- Conditionally render Relationship component based on currentPage -->
        {#if currentPage == 4}
            <Relationship bind:currentPage bind:value={relationship} />
        {/if}
    </div>
</div>
