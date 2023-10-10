<script>
    // Exported props that the component accepts.
    export let menuItems; // An array of menu items with 'name' and 'href'.
    export let current; // The currently selected menu item.
</script>

<div class="flex w-full py-2">
    <!-- Iterate through each menu item and create a link -->
    {#each menuItems as { name, href }}
        <a
            {href}
            class="box-border px-3 pt-2.5 pb-3 w-full flex justify-center items-center text-2xl font-medium leading-7 {current ==
            href
                ? 'text-white'
                : 'text-pink'} relative"
        >
            {name}
            <!-- If the current menu item matches the 'href', display a white line beneath it -->
            {#if current == href}
                <div class="absolute bg-white h-px w-full bottom-0 left-0" />
            {/if}
        </a>
    {/each}
</div>
