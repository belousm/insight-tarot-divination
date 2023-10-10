<script>
    // Import necessary modules and components
    import { getCollection } from "$lib/api/collection";
    import { user, getImagePath } from "$lib";
    import { onMount } from "svelte";
    import { typesDivination } from "$lib/api/cards";
    import Card from "../../../components/pages/collection/Card.svelte";
    import Collection from "../../../components/pages/collection/Collection.svelte";
    import Sort from "../../../components/pages/collection/Sort.svelte";

    // Declare variables for collections and sorting order
    let collections;
    let order = "DESC";

    // Function to update the collection based on sorting order
    const updateCollection = async () => {
        // Fetch the collection data based on the user's UID and sorting order
        const result = await getCollection($user["user_uid"], order);

        // Update the 'collections' variable with the fetched data
        collections = result.collections;
    };

    // Run the 'updateCollection' function when the component mounts
    onMount(async () => {
        await updateCollection();
    });

    // Re-run the 'updateCollection' function whenever the 'order' variable changes
    $: order && updateCollection();
</script>

<Collection />

<!-- Render the 'Sort' component and bind the 'order' variable -->
<Sort bind:order />

<!-- Check if there are collections to display -->
{#if collections}
    <!-- Iterate through the collections -->
    {#each collections as collection}
        <!-- Check if the collection has been liked by the user -->
        {#if collection.like == 1}
            <!-- Render the 'Card' component for the liked collection -->
            <Card
                task_uid={collection.task_uid}
                image={getImagePath(collection)}
                bind:value={collection.like}
                href={`/result/${collection.task_uid}`}
                name={collection.type == 4
                    ? collection.subtype
                    : typesDivination[collection.type]}
                date={collection.created_at}
            />
        {/if}
    {/each}
{/if}
