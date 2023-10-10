<script>
    // Import necessary modules and components
    import { tarotDivinations } from "$lib/divinations";
    import HeaderContainer from "../../../base/HeaderContainer.svelte";
</script>

<div>
    {#each tarotDivinations as { caption, types }}
        <div>
            <!-- HeaderContainer displaying the 'caption' -->
            <HeaderContainer>
                <p class="text-2xl leading-[26px] font-medium">{caption}</p>
            </HeaderContainer>
            <div
                class="flex items-start px-4 gap-2 overflow-scroll scrollbar-hide"
            >
                {#each types as { name, image, href }}
                    <!-- Create a link with 'href' attribute -->
                    <a {href}>
                        <div
                            class="rounded-xl w-36 h-36 box-border pt-3 pb-2 px-3 relative overflow-hidden"
                        >
                            <!-- Display the 'name' of the divination type -->
                            <p class="text-[2rem] leading-7 font-semibold">
                                {name}
                            </p>

                            <!-- Display the 'image' associated with the type -->
                            <img
                                src={image}
                                class="w-full h-full absolute -z-10 top-0 left-0"
                                alt=""
                            />
                        </div>
                    </a>
                {/each}
            </div>
        </div>
    {/each}
</div>
