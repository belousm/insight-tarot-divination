<script>
    // Import the ButtonSkeleton Svelte component
    import ButtonSkeleton from "./ButtonSkeleton.svelte";

    // Define a prop named 'name'
    export let name;

    // Define a variable named 'clas' and export it as 'class' (for CSS classes)
    let clas = "";
    export { clas as class };

    // Define props for the button's state and type
    export let state = "default";
    export let typeBtn = "default";

    // Define an object to store transition-related props
    export let transitions = {};

    // Destructure the transitions object and extract relevant properties
    const { inFunc, inOptions, outFunc, outOptions } =
        readTransitions(transitions);

    // Function to extract transition properties from the 'transitions' object
    function readTransitions(transitions) {
        return {
            // Extract the 'in' function or use an empty function if not provided
            inFunc: transitions.in ? transitions.in.func : () => {},
            // Extract the 'in' options or set to null if not provided
            inOptions: transitions.in ? transitions.in.options : null,
            // Extract the 'out' function or use an empty function if not provided
            outFunc: transitions.out ? transitions.out.func : () => {},
            // Extract the 'out' options or set to null if not provided
            outOptions: transitions.out ? transitions.out.options : null,
        };
    }
</script>

<!-- Define a button element with various properties -->
<button
    in:inFunc={inOptions}
    out:outFunc={outOptions}
    on:click
    class="p-4 {clas || ''}"
>
    <!-- Render the ButtonSkeleton component with props -->
    <ButtonSkeleton {typeBtn} {name} {state} />
</button>
