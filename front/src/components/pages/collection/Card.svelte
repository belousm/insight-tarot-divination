<script>
    // Import necessary modules and functions.
    import { getDateFormatted } from "$lib/moon";
    import { likeTask } from "$lib/api/collection";

    // Define component properties and their default values.
    export let value;
    export let task_uid;
    export let href;
    export let name;
    export let date;
    export let image = "/images/collection.png";
</script>

<div class="px-4 pt-4 gap-4 flex flex-col">
    <div class="flex gap-4 items-center w-full justify-between">
        <!-- Create a link with image and name -->
        <a {href} class="flex gap-2 items-center">
            <img src={image} alt="" class="w-[50px] h-[50px]" />
            <p class="text-white text-2xl font-semibold leading-5">
                {name}<br />
                <!-- Display formatted date -->
                <span
                    class="opacity-60 text-white text-sm font-light font-inter uppercase leading-[14px]"
                    >{getDateFormatted(new Date(date))}</span
                >
            </p>
        </a>
        <!-- Create a button for liking tasks -->
        <button
            on:click={async () => {
                value = value == 0 ? 1 : 0;
                const result = await likeTask(task_uid, value);
            }}
        >
            <!-- Toggle the like button based on 'value' -->
            {#if value == 0}
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 9.09888C2 6.28284 4.28286 4 7.0989 4C9.00381 4 10.705 5.04574 11.5978 6.60089C12.4906 5.04574 14.1917 4 16.0967 4C18.9127 4 21.1956 6.28284 21.1956 9.09888C21.1956 9.96884 21.0575 10.7338 20.7395 11.4847C20.4245 12.2284 19.9446 12.9305 19.2983 13.6892C18.4377 14.6992 17.2255 15.8699 15.6187 17.4219C14.8519 18.1625 13.9953 18.9899 13.0439 19.9282C12.2441 20.7171 10.9515 20.7171 10.1516 19.9282C9.20035 18.9899 8.34367 18.1625 7.57687 17.4219C5.97006 15.8699 4.75795 14.6992 3.89732 13.6892C3.25096 12.9305 2.77108 12.2284 2.45611 11.4847C2.13812 10.7338 2 9.96884 2 9.09888ZM7.0989 5.2C4.94559 5.2 3.2 6.94559 3.2 9.09888C3.2 9.8315 3.31435 10.4341 3.56109 11.0167C3.81085 11.6064 4.20798 12.2035 4.81071 12.9108C5.63271 13.8755 6.77854 14.9822 8.3502 16.4999C9.12422 17.2474 10.0015 18.0946 10.9943 19.0738C11.3269 19.4018 11.8687 19.4018 12.2013 19.0738C13.194 18.0946 14.0713 17.2474 14.8453 16.4999C16.417 14.9822 17.5629 13.8755 18.3849 12.9108C18.9876 12.2035 19.3847 11.6064 19.6344 11.0167C19.8813 10.4341 19.9956 9.8315 19.9956 9.09888C19.9956 6.94559 18.25 5.2 16.0967 5.2C14.3746 5.2 12.8706 6.31492 12.3412 7.8519C12.2667 8.06843 12.109 8.19735 11.9772 8.26397C11.8475 8.32952 11.7132 8.35252 11.5978 8.35252C11.4824 8.35252 11.348 8.32952 11.2184 8.26397C11.0866 8.19735 10.9289 8.06843 10.8543 7.8519C10.325 6.31492 8.82102 5.2 7.0989 5.2Z"
                        fill="white"
                    />
                </svg>
            {:else}
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 9.09888C2 6.28284 4.28286 4 7.0989 4C9.00381 4 10.705 5.04574 11.5978 6.60089C12.4906 5.04574 14.1917 4 16.0967 4C18.9127 4 21.1956 6.28284 21.1956 9.09888C21.1956 9.96884 21.0575 10.7338 20.7395 11.4847C20.4245 12.2284 19.9446 12.9305 19.2983 13.6892C18.4377 14.6992 17.2255 15.8699 15.6187 17.4219C14.8519 18.1625 13.9953 18.9899 13.0439 19.9282C12.2441 20.7171 10.9515 20.7171 10.1516 19.9282C9.20035 18.9899 8.34367 18.1625 7.57687 17.4219C5.97006 15.8699 4.75795 14.6992 3.89732 13.6892C3.25096 12.9305 2.77108 12.2284 2.45611 11.4847C2.13812 10.7338 2 9.96884 2 9.09888Z"
                        fill="white"
                    />
                </svg>
            {/if}
        </button>
    </div>
    <!-- Create a horizontal line separator -->
    <div class="w-full opacity-10 bg-white h-px" />
</div>
