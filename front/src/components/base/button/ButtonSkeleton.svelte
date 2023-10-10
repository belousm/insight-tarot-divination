<script>
    // Define props for 'name', 'state', and set a default value for 'typeBtn'
    export let name;
    export let state;
    export let typeBtn = "default";
</script>

<!-- Define a paragraph element with conditional CSS classes based on prop values -->
<p
    class="{typeBtn == "default" ? "taro-shadow" : ""} text-[1.75rem] leading-4 font-medium text-white px-8 
    {state == "default" ? "pt-[1.375rem] pb-[1.625rem]" : ""}
    {state == "loading" ? "py-3.5" : ""}
    {typeBtn == "ghost" ? "" : "bg-primaryblack"}
     flex justify-center items-center rounded-[1.25rem] hover:scale-95 transition"
>
    <!-- Conditional rendering based on 'state' prop -->
    {#if state == "default"}
        {name}
    {/if}
    <!-- Conditional rendering based on 'state' prop -->
    {#if state == "loading"}
        <img
            src="/images/loading.png"
            alt=""
            class="taro-loading w-9 h-9 block"
        />
    {/if}
</p>

<style>
    /* CSS class for adding a shadow and transition effect */
    .taro-shadow {
        box-shadow: 0px 0px 16px 0px rgba(255, 255, 255, 0.5);
        transition: 0.1s;
    }
    
    /* CSS class for shadow effect on focus, active, and hover */
    .taro-shadow:focus,
    .taro-shadow:active,
    .taro-shadow:hover {
        box-shadow: 0px 0px 8px 0px rgba(255, 255, 255, 0.5);
    }

    /* CSS class for animating a loading spinner */
    .taro-loading {
        animation: loading 1s infinite ease-in-out;
    }

    /* Keyframes animation for the loading spinner */
    @keyframes loading {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
