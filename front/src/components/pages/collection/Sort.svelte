<script>
    // Exported prop that the component accepts.
    export let order;

    // Variable to control the visibility of the sorting options.
    let showSort = false;

    // An array of sorting options with names, values, and selected flags.
    const sortTypes = [
        {
            name: "Latest first",
            value: "DESC",
            selected: true, // Initially selected.
        },
        {
            name: "Earliest first",
            value: "ASC",
            selected: false,
        },
    ];
</script>

<div class="flex justify-start p-4 relative">
    <!-- Button to toggle sorting options visibility -->
    <button
        on:click={() => {
            showSort = !showSort;
        }}
        class="pl-3 pr-2 py-1 rounded-[10px] border border-blue-40 justify-center items-center gap-1 flex"
    >
        <!-- Display the name of the selected sorting option -->
        <p
            class="text-center text-white text-base leading-[8px] pb-1 font-medium"
        >
            {sortTypes.filter((s) => s.selected == true)[0].name}
        </p>
        <!-- Display an up or down chevron icon based on showSort -->
        <img
            src="/images/chevrons/chevron-{showSort ? 'up' : 'down'}.svg"
            clas="w-5 h-5"
            alt=""
        />
    </button>
    <!-- Display sorting options when showSort is true -->
    {#if showSort}
        <div
            class="absolute z-10 flex py-3 flex-col bg-gray rounded-[10px] top-16"
        >
            {#each sortTypes as { name, value, selected }}
                <!-- Button for each sorting option -->
                <button
                    on:click={() => {
                        sortTypes.forEach((s) => (s.selected = false));
                        selected = true;
                        showSort = false;
                        order = value;
                    }}
                    class="flex gap-1 w-full box-border py-2 px-3"
                >
                    <!-- Display the name of the sorting option -->
                    <span class="block w-[146px] text-left text-base font-inter"
                        >{name}</span
                    >
                    <!-- Display a checkmark icon for the selected option -->
                    {#if selected}
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20.8301 7.15916C21.0566 7.37136 21.0566 7.71541 20.8301 7.92761L10.9234 17.2092C9.79805 18.2636 7.97343 18.2636 6.84804 17.2092L3.16988 13.7632C2.94337 13.551 2.94337 13.2069 3.16988 12.9946C3.39637 12.7825 3.76358 12.7825 3.99007 12.9946L7.66825 16.4408C8.34064 17.0708 9.43083 17.0708 10.1032 16.4408L20.0099 7.15916C20.2364 6.94695 20.6036 6.94695 20.8301 7.15916Z"
                                fill="white"
                            />
                        </svg>
                    {/if}
                </button>
            {/each}
        </div>
    {/if}
</div>
