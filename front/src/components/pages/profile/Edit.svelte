<script>
    // Define a prop named "caption" that can be passed to this component
    export let caption;

    // Initialize a variable "clas" with an empty string
    let clas = "";

    // Export the "clas" variable as "class" to be used as a CSS class in the component's HTML
    export { clas as class };
</script>

<div
    class="w-full box-border px-4 pt-3 pb-6 flex flex-col gap-2 items-start {clas ||
        ''}"
>
    <!-- Display the "caption" prop as the text content -->
    <p class="text-white text-base font-light font-inter leading-tight">
        {caption}
    </p>
    <!-- Allow inserting content within this component using a slot -->
    <slot />
</div>
