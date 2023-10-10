<script>
    // Import necessary modules and components
    import { goto } from "$app/navigation";
    import { linear } from "svelte/easing";
    import { blur } from "svelte/transition";
    import HeaderContainer from "../../../base/HeaderContainer.svelte";
    import Divider from "../../../base/Divider.svelte";
    import Button from "../../../base/button/Button.svelte";
    import MeshGradient from "../../../base/MeshGradient.svelte";

    // Define the 'divinations' variable as a prop
    export let divinations;
</script>

<div class="flex flex-col items-center text-center relative">
    <!-- HeaderContainer displaying the title 'Coming soon' -->
    <HeaderContainer class="!pb-3 mt-[30px]">
        <p class="text-5xl leading-[46px] font-medium w-full">Coming soon</p>
    </HeaderContainer>

    <!-- HeaderContainer displaying a description -->
    <HeaderContainer class="!pb-3 mb-4">
        <p class="font-inter text-base leading-[18px] font-light w-full">
            You're about to embark on a journey into the wisdom of the Ancient
            Yi Jing. Soon, you'll unravel the mysteries of this timeless oracle
        </p>
    </HeaderContainer>

    <Divider />

    <!-- HeaderContainer displaying another description -->
    <HeaderContainer class="!pb-3 mt-4">
        <p class="font-inter text-base leading-[18px] font-light w-full">
            Enjoy perosnalised Tarot readings while Astrology is in progress
        </p>
    </HeaderContainer>

    <!-- Button that triggers a click event -->
    <Button
        name="Go to Tarot"
        class="w-fit p-6"
        on:click={() => {
            divinations.forEach((d) => {
                d["icon"] = d.icon.split("active")[0];
                d["selected"] = false;

                if (d.name == "tarot") {
                    d["icon"] = "taroactive";
                    d["selected"] = true;
                }
            });

            divinations = [...divinations];
            goto("/?seeAll=true&divination=tarot");
        }}
    />

    <!-- MeshGradient element for background animation -->
    <MeshGradient
        transitions={{
            in: {
                func: blur,
                options: { duration: 1000, easing: linear },
            },
            out: {
                func: blur,
                options: { duration: 300, easing: linear },
            },
        }}
        canvasHeight={450}
        class="absolute -bottom-16 left-0 -z-10 opacity-40"
        speed={0.5}
        filePaths={["/images/divinations/types/yijing/bg.svg"]}
        totalParticles={10}
        colors={[
            { r: 66, g: 6, b: 98 },
            { r: 251, g: 126, b: 142 },
        ]}
    />
</div>
