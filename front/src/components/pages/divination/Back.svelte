<script>
    // Import necessary modules and components
    import { blur } from "svelte/transition";
    import { linear } from "svelte/easing";
    import HeaderContainer from "../../base/HeaderContainer.svelte";
    import MeshGradient from "../../base/MeshGradient.svelte";
    import Button from "../../base/button/Button.svelte";
    import ButtonLink from "../../base/button/ButtonLink.svelte";
    import Icon from "../../base/icons/Icon.svelte";

    // Exported props received by the component
    export let showBack;
</script>

<div
    class="absolute flex flex-col box-border gap-4 w-full h-full left-0 top-0 bg-primaryblack z-30"
>
    <!-- Informational messages -->
    <div class="flex flex-col items-center pt-60">
        <Icon class="w-10 h-10 mr-3" type="logotype" />
        <HeaderContainer class="!pb-3">
            <p class="w-full text-center text-5xl font-medium leading-[46px]">
                Are you sure?
            </p>
        </HeaderContainer>
        <HeaderContainer class="py-3">
            <p
                class="w-full text-center text-base font-light font-inter leading-[18px]"
            >
                Are you sure you want to quit the reading? Your progress won't
                be saved
            </p>
        </HeaderContainer>
    </div>

    <div class="flex flex-col flex-1 justify-end w-full">
        <ButtonLink
            href="/"
            name="Quit reading"
            typeBtn="ghost"
            class="w-full p-6 pb-0"
        />
        <Button
            name="Back to reading"
            class="w-full p-6"
            on:click={() => {
                showBack = false;
            }}
        />
    </div>

    <!-- MeshGradient component for background effect -->
    <MeshGradient
        transitions={{
            in: {
                func: blur,
                options: { duration: 1000, easing: linear },
            },
        }}
        class="absolute bottom-0 left-0 -z-10 opacity-40"
        speed={0.5}
        filePaths={["/images/divinations/types/numerology/bg.svg"]}
        totalParticles={10}
        colors={[
            { r: 43, g: 26, b: 32 },
            { r: 203, g: 117, b: 233 },
        ]}
    />
</div>
