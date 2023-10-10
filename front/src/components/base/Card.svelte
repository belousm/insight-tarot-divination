<script>
    // Initialize a variable named 'clas' with an empty string
    let clas = "";

    // Export 'clas' variable as 'class' to be used in the HTML
    export { clas as class };
</script>

<!-- HTML container with dynamic class attribute -->
<div class="relative {clas}">
    <!-- Display an image with a source and styling -->
    <img src="/images/card.png" class="relative z-10 w-full h-auto" alt="" />

    <!-- Create an absolute positioned element with a 'taro-shine' class -->
    <div
        class="w-full h-full absolute taro-shine rounded-lg blur-[33.21px] top-0 left-0"
    />
</div>

<!-- Internal style block defining the 'taro-shine' class -->
<style>
    .taro-shine {
        background: linear-gradient(
            155deg,
            #4d72cb 14%,
            rgba(77, 114, 203, 0.51) 44.38%,
            rgba(77, 114, 203, 0) 75.74%
        );
    }
</style>
