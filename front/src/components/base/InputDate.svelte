<!-- Svelte script section -->
<script>
    // Import the 'MaskInput' component from the 'svelte-input-mask' library.
    import MaskInput from "svelte-input-mask/MaskInput.svelte";

    // Define 'name' as a prop to accept an input name.
    export let name;

    // Define 'required' as a prop to indicate if input is required (default is false).
    export let required = false;

    // Define 'clas' to store additional CSS classes for the input.
    let clas = "";

    // Export 'clas' as 'class' to make it available outside this component.
    export { clas as class };

    // Bind 'value' to enable two-way data binding with the input value.
    export let value;

    // Define 'maskString' to specify the mask format as "DD.MM.YYYY".
    let maskString = "DD.MM.YYYY";

    // Define 'mask' to set the initial mask value as "00.00.0000".
    let mask = "00.00.0000";

    // Define a function 'handleChange' to handle input change events.
    const handleChange = ({ detail }) => {
        // Update 'value' with the masked value from the input.
        value = detail.inputState.maskedValue;
    };
</script>

<!-- Svelte HTML structure -->
<MaskInput
    bind:value
    {name}
    {required}
    placeholder="DD.MM.YYYY"
    class="flex-1 w-full outline-none placeholder:text-white placeholder text-[1.75rem] px-6 pt-2.5 pb-3.5 bg-transparent box-border border border-white inputborder focus:border-white rounded-[1.25rem] font-medium tracking-tight leading-4 {clas}"
    {maskString}
    {mask}
    on:change={handleChange}
/>
