<script>
    // Import necessary modules and components
    import { page } from "$app/stores";
</script>

<!-- Display the error -->
<div class="flex flex-col pt-10 font-inter items-center">
    <h1 class="text-4xl font-bold">
        Error {$page.status}
    </h1>
    <p class="text-4xl font-dargro">
        {$page.error.message}
    </p>
</div>
