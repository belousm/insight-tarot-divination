<script>
    // Import the MiniButtonSkeleton Svelte component
    import MiniButtonSkeleton from "./MiniButtonSkeleton.svelte";

    // Define a prop named 'name' with a default value of "skip"
    export let name = "skip";
    // Define a prop named 'href' for the anchor element
    export let href;
</script>

<!-- Define an anchor element with a conditional 'href' and CSS classes -->
<a
    {href}
    class="flex gap-2 uppercase text-xs leading-[0.875rem] items-center px-2 py-[0.1875rem] bg-blue-20 rounded-lg hover:opacity-70 transition"
>
    <!-- Render the MiniButtonSkeleton component with the 'name' prop -->
    <MiniButtonSkeleton {name} />
</a>
