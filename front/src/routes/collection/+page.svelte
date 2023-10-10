<script>
    // Import necessary modules and components
    import { getCollection } from "$lib/api/collection";
    import { user, getImagePath } from "$lib";
    import { typesDivination } from "$lib/api/cards";
    import { onMount } from "svelte";
    import Collection from "../../components/pages/collection/Collection.svelte";
    import Sort from "../../components/pages/collection/Sort.svelte";
    import Card from "../../components/pages/collection/Card.svelte";

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
    <!-- Iterate through the collections where status is done -->
    {#each collections.filter((c) => c.status == 2) as collection}
        <!-- Render the 'Card' component for the collection -->
        <Card
            task_uid={collection.task_uid}
            image={getImagePath(collection)}
            value={collection.like}
            href={`/result/${collection.task_uid}`}
            name={collection.type == 4
                ? collection.subtype
                : typesDivination[collection.type]}
            date={new Date(collection.created_at)}
        />
    {/each}
{/if}
