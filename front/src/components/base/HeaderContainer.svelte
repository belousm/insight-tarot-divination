<!-- Svelte script section -->
<script>
    // Define a variable 'clas' with an initial value of an empty string.
    let clas = "";

    // Export 'clas' as 'class' to make it available outside this component.
    export { clas as class };
</script>

<!-- Svelte HTML structure -->
<div class="px-4 pb-4 pt-3 flex justify-between w-full items-end {clas || ''}">
    <!-- Slot element used to insert content into the component. -->
    <slot />
</div>
