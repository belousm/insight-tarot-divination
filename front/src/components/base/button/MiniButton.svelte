<script>
    // Import the MiniButtonSkeleton Svelte component
    import MiniButtonSkeleton from "./MiniButtonSkeleton.svelte";

    // Define a prop named 'name' with a default value of "skip"
    export let name = "skip";
</script>

<!-- Define a button element with a click event listener and CSS classes -->
<button
    on:click
    class="flex gap-2 uppercase text-xs leading-[0.875rem] items-center px-2 py-[0.1875rem] bg-blue-20 rounded-lg hover:opacity-70 transition"
>
    <!-- Render the MiniButtonSkeleton component with the 'name' prop -->
    <MiniButtonSkeleton {name} />
</button>
