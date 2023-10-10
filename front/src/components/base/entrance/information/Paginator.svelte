<script>
    // Export props for controlling the total number of pages and current page
    export let pagesNum;
    export let currentPage;

    // Export props for defining custom transition functions and options
    export let transitions = {};

    // Define transition functions and options based on the provided props
    const { inFunc, inOptions, outFunc, outOptions } =
        readTransitions(transitions);

    // Function to extract transition functions and options
    function readTransitions(transitions) {
        return {
            // Use custom transition function for entering the element, or a default empty function
            inFunc: transitions.in ? transitions.in.func : () => {},
            // Use custom transition options for entering the element, or null if not provided
            inOptions: transitions.in ? transitions.in.options : null,
            // Use custom transition function for exiting the element, or a default empty function
            outFunc: transitions.out ? transitions.out.func : () => {},
            // Use custom transition options for exiting the element, or null if not provided
            outOptions: transitions.out ? transitions.out.options : null,
        };
    }
</script>

<!-- Container for displaying page indicators with custom transitions -->
<div
    class="flex w-full px-4 py-2 gap-4 box-border"
    in:inFunc={inOptions}
    out:outFunc={outOptions}
>
    {#each Array(pagesNum) as _, page}
        <!-- Page indicator with conditional background color -->
        <div
            class="w-full {page <= currentPage ? 'bg-white' : 'bg-pink'} h-px"
        />
    {/each}
</div>
