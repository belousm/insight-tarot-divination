<script>
    // Declare two props: 'name' and 'selected' with optional initial values
    export let name;
    export let selected = false;
</script>

<!-- Button element with conditional class and content -->
<button
    on:click
    class="px-[1.4375rem] pb-6 pt-5 rounded-[1.25rem] text-center {// Conditional class based on the 'selected' prop
    selected
        ? 'bg-white text-primaryblack'
        : 'text-white'} text-[28px] leading-4 box-border font-medium border border-white justify-center items-center gap-2.5 flex"
>
    <!-- Display the value of the 'name' prop as the button's content -->
    {name}
</button>
