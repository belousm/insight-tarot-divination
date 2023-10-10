<script>
    // Define a prop named "menuItems" that can be passed to this component
    export let menuItems;

    // Define a prop named "current" that can be passed to this component
    export let current;
</script>

<div class="flex w-full py-2">
    <!-- Iterate over each item in the "menuItems" array -->
    {#each menuItems as { name, href }}
        <a
            {href}
            class="box-border px-3 pt-2.5 pb-3 w-full flex justify-center items-center text-2xl font-medium leading-7 {current.includes(
                href
            )
                ? 'text-white'
                : 'text-pink'} relative"
        >
            <!-- Display the name of the menu item -->
            {name}
            <!-- Conditionally add a white line beneath the menu item if it is in the "current" array -->
            {#if current.includes(href)}
                <div class="absolute bg-white h-px w-full bottom-0 left-0" />
            {/if}
        </a>
    {/each}
</div>
