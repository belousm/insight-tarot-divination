<script>
    // Import the Icon component
    import Icon from "../../../base/icons/Icon.svelte";

    // Exported prop received by the component
    export let divinations;

    // Function to handle anchor click and scroll to the specified anchor
    function handleAnchorClick(anchorId) {
        const anchor = document.getElementById(anchorId);
        anchor.scrollIntoView({ behavior: "smooth" });
    }
</script>

<div
    class="flex items-start px-4 gap-2 overflow-scroll scrollbar-hide"
    id="taro-divination"
>
    {#each divinations as { name, icon, selected }}
        <!-- Button for each divination type -->
        <button
            id={`taro-${name}`}
            on:click={() => {
                handleAnchorClick("taro-divination");
                if (selected) {
                    return;
                }
                divinations.forEach((d) => {
                    d.icon = d.icon.split("active")[0];
                    d.selected = false;
                });
                icon = icon + "active";
                selected = true;
            }}
            class="p-px rounded-xl relative"
        >
            <div
                class="flex flex-col items-center gap-4 py-2 px-1 rounded-xl bg-transparent w-28"
            >
                <!-- Display the divination type icon -->
                <Icon
                    class="w-10 h-10"
                    type={icon}
                    color={selected ? "fill-white" : "fill-pink"}
                />
                <!-- Display the divination type name -->
                <p
                    class="uppercase text-lg font-medium leading-normal {selected
                        ? 'text-white'
                        : 'text-pink'}"
                >
                    {name}
                </p>
            </div>
            <!-- Display a gradient border if the divination type is selected -->
            {#if selected}
                <img
                    src="/images/entrance/gradient-border.png"
                    class="w-full h-full absolute left-0 top-0"
                    alt=""
                />
            {/if}
        </button>
    {/each}
</div>
