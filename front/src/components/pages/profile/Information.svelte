<script>
    // Define a prop named "caption" that can be passed to this component
    export let caption;

    // Define a prop named "value" that can be passed to this component
    export let value;
</script>

<div class="w-full box-border px-4 py-3 flex flex-col gap-2 items-start">
    <!-- Display the "caption" prop as text content with pink text color -->
    <p class="text-pink text-base font-light font-inter leading-tight">
        {caption}
    </p>
    <!-- Display the "value" prop as text content with white text color, larger font size, and medium font weight -->
    <p class="text-white text-[2rem] font-medium leading-[34px]">
        {value}
    </p>
</div>
