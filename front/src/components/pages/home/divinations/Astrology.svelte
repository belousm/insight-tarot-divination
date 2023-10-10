<script>
    // Import necessary Svelte modules and components
    import { linear } from "svelte/easing";
    import { blur, fly } from "svelte/transition";
    import HeaderContainer from "../../../base/HeaderContainer.svelte";
    import Divider from "../../../base/Divider.svelte";
    import Button from "../../../base/button/Button.svelte";
    import MeshGradient from "../../../base/MeshGradient.svelte";
    import { goto } from "$app/navigation";

    // Exported prop received by the component
    export let divinations;
</script>

<div class="flex flex-col items-center text-center relative">
    <!-- Header for the "Coming soon" section -->
    <HeaderContainer class="!pb-3 mt-[30px]">
        <p class="text-5xl leading-[46px] font-medium w-full">Coming soon</p>
    </HeaderContainer>
    <!-- Description of the "Coming soon" section -->
    <HeaderContainer class="!pb-3 mb-4">
        <p class="font-inter text-base leading-[18px] font-light w-full">
            Get ready to dive into the world of astrology. Our celestial
            calculations and planetary advices will help you unlock the secrets
            of your path soon
        </p>
    </HeaderContainer>
    <Divider />
    <!-- Header for the "Enjoy personalized Tarot readings" section -->
    <HeaderContainer class="!pb-3 mt-4">
        <p class="font-inter text-base leading-[18px] font-light w-full">
            Enjoy perosnalised Tarot readings while Astrology is in progress
        </p>
    </HeaderContainer>
    <!-- Button to navigate to Tarot readings -->
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

    <!-- MeshGradient component for background effect -->
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
        filePaths={["/images/divinations/types/astrology/bg.svg"]}
        totalParticles={10}
        colors={[
            { r: 108, g: 126, b: 191 },
            { r: 230, g: 196, b: 255 },
        ]}
    />
</div>
