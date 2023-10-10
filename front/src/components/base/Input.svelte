<!-- Svelte script section -->
<script>
    // Define 'name' as a prop to accept an input name.
    export let name;

    // Define 'required' as a prop to indicate if input is required (default is false).
    export let required = false;

    // Define 'type' as a prop to specify input type (default is "text").
    export let type = "text";

    // Define 'placeholder' as a prop to set input placeholder text (default is "Введите текст").
    export let placeholder = "Введите текст";

    // Define 'clas' to store additional CSS classes for the input.
    let clas = "";

    // Export 'clas' as 'class' to make it available outside this component.
    export { clas as class };

    // Bind 'value' to enable two-way data binding with the input value.
    export let value;
</script>

<!-- Svelte HTML structure -->
<input
    {...{ type }}
    lang="en-EN"
    bind:value
    class="flex-1 w-full outline-none placeholder:text-white placeholder text-[1.75rem] {type ==
    'text'
        ? 'leading-4'
        : 'leading-9'} px-6 pt-2.5 pb-3.5 bg-transparent box-border border border-white inputborder focus:border-white rounded-[1.25rem] font-medium tracking-tight {clas}"
    {name}
    {placeholder}
    {required}
/>
