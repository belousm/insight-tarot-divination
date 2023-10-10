<script>
    // Import necessary modules and components
    import { goto } from "$app/navigation";
    import { linear } from "svelte/easing";
    import { blur } from "svelte/transition";
    import HeaderContainer from "../../../base/HeaderContainer.svelte";
    import Divider from "../../../base/Divider.svelte";
    import Button from "../../../base/button/Button.svelte";
    import MeshGradient from "../../../base/MeshGradient.svelte";

    // Exported prop received by the component
    export let divinations;
</script>

<div class="flex flex-col items-center text-center relative">
    <!-- HeaderContainer with "Coming soon" text -->
    <HeaderContainer class="!pb-3 mt-[30px]">
        <p class="text-5xl leading-[46px] font-medium w-full">Coming soon</p>
    </HeaderContainer>

    <!-- HeaderContainer with introductory text about Numerology -->
    <HeaderContainer class="!pb-3 mb-4">
        <p class="font-inter text-base leading-[18px] font-light w-full">
            Your unique numeric destiny will soon become clear. Numerology will
            reveal your numbers, unlocking the keys to your fate
        </p>
    </HeaderContainer>

    <Divider />

    <!-- HeaderContainer with information about enjoying Tarot readings -->
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

    <!-- MeshGradient for visual effects -->
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
        filePaths={["/images/divinations/types/numerology/bg.svg"]}
        totalParticles={10}
        colors={[
            { r: 93, g: 127, b: 110 },
            { r: 197, g: 220, b: 255 },
            { r: 216, g: 221, b: 115 },
        ]}
    />
</div>
