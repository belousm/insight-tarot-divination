<script>
    // Import the 'tarotDivinations' data from an external module.
    import { tarotDivinations } from "$lib/divinations";

    // Exported prop that the component accepts.
    export let name;

    // Find the 'questions' array by filtering and accessing data from 'tarotDivinations'.
    const questions = tarotDivinations
        .find((d) => d.caption == "Classic") // Find a divination with the caption "Classic".
        .types.find((d) => d.name == "Celtic cross").additional; // Find a divination type with the name "Celtic cross". // Access the 'additional' property of the selected divination type.
</script>

<div class="grid grid-cols-2 w-full box-border p-4 gap-2">
    <!-- Iterate over each 'question' in the 'questions' array -->
    {#each questions as question}
        <!-- Button for each 'question' with click event -->
        <button
            on:click={() => {
                name = question.name;
            }}
            class="relative flex justify-center items-center"
        >
            <!-- Display background image based on 'question.bg' -->
            <img src={question.bg} alt="" />
            <!-- Overlay div with additional content -->
            <div
                class="absolute left-0 right-0 m-auto p-3 justify-end flex flex-col w-full h-full box-border"
            >
                <!-- Display an image associated with the 'question' -->
                <img
                    src={question.image}
                    class="h-[120px] block absolute w-full left-0 right-0 top-4"
                    alt=""
                />
                <!-- Display the 'question' name -->
                <p
                    class="text-left text-white text-[25px] font-semibold leading-[17.50px]"
                >
                    {question.name}
                </p>
            </div>
        </button>
    {/each}
</div>
