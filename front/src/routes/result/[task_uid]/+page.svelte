<script>
    // Import necessary modules and components
    import { PUBLIC_HOST } from "$env/static/public";
    import { likeTask } from "$lib/api/collection";
    import { blur } from "svelte/transition";
    import { linear } from "svelte/easing";
    import { goto } from "$app/navigation";
    import { highlightAnswer } from "$lib";
    import HeaderContainer from "../../../components/base/HeaderContainer.svelte";
    import MeshGradient from "../../../components/base/MeshGradient.svelte";
    import Divider from "../../../components/base/Divider.svelte";
    import ButtonLink from "../../../components/base/button/ButtonLink.svelte";
    import Button from "../../../components/base/button/Button.svelte";

    // Export the 'data' variable to make it available for the component
    export let data;
</script>

<HeaderContainer class="relative !pb-2">
    <button
        on:click={() => {
            goto(`/collection`);
        }}
        class="absolute left-4 bottom-2"
    >
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10.3672 18.8507C10.6016 19.0851 10.6016 19.465 10.3672 19.6993C10.1329 19.9336 9.75306 19.9336 9.5187 19.6993L3.23466 13.4153C2.12166 12.3023 2.12166 10.4978 3.23466 9.38479L9.5187 3.10075C9.75306 2.86639 10.1329 2.86639 10.3672 3.10075C10.6016 3.33499 10.6016 3.71491 10.3672 3.94927L4.08318 10.2333C3.9165 10.4 3.7929 10.5936 3.71238 10.8001L21.0055 10.8001C21.3368 10.8001 21.6055 11.0687 21.6055 11.4001C21.6055 11.7314 21.3368 12.0001 21.0055 12.0001L3.7125 12C3.7929 12.2065 3.9165 12.4 4.08318 12.5667L10.3672 18.8507Z"
                fill="white"
            />
        </svg>
    </button>
    <p
        class="w-full text-center text-[2rem] font-medium leading-[34px] capitalize"
    >
        &nbsp;
    </p>
    <button
        on:click={async () => {
            data.like = data.like == 0 ? 1 : 0;
            const result = await likeTask(data.task_uid, data.like);
        }}
        class="absolute right-4 bottom-2"
    >
        {#if data.like == 0}
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
</HeaderContainer>
<HeaderContainer class="!pt-0">
    <p
        class="w-full text-center text-[3rem] font-medium leading-[34px] capitalize"
    >
        Reading
    </p>
</HeaderContainer>

<div class="flex flex-col w-full gap-6 pb-6">
    {#each data.processed_cards as { card, meaning }, i}
        <div
            class="flex flex-col box-border p-4 pb-0 gap-4 w-full items-center"
        >
            <img
                src="{PUBLIC_HOST}/images/cards/{card}.jpg"
                alt=""
                class="w-[250px] h-[420px] rounded-[20px] taro-shadow"
            />
            <div
                class="flex gap-4 items-center text-center text-white text-2xl font-semibold uppercase leading-normal"
            >
                <p>
                    {card}
                </p>
            </div>
        </div>
        <HeaderContainer class="!px-4 !pb-3 !pt-0">
            <p
                class="text-center text-white text-base font-light font-inter leading-[18px]"
            >
                {#if data.type == 1}
                    {@html highlightAnswer(meaning)}
                {:else}
                    {@html meaning}
                {/if}
            </p>
        </HeaderContainer>
    {/each}
    <Divider />
    {#if [3, 4, 5].includes(data.type)}
        <HeaderContainer>
            <p
                class="text-center text-white text-base font-light font-inter leading-[18px]"
            >
                {data.description}
            </p>
        </HeaderContainer>
    {/if}
    <div class="flex flex-col w-full">
        <Button
            name="One more reading"
            class="w-full p-6"
            on:click={() => {
                goto("/?seeAll=true&divination=tarot");
            }}
        />
        <ButtonLink
            href="/"
            name="Finish reading"
            typeBtn="ghost"
            class="w-full p-6 pt-0"
        />
    </div>
</div>

<MeshGradient
    transitions={{
        in: {
            func: blur,
            options: { duration: 1000, easing: linear },
        },
    }}
    class="fixed bottom-0 left-0 -z-10 opacity-40"
    speed={0.5}
    filePaths={["/images/divinations/types/numerology/bg.svg"]}
    totalParticles={10}
    colors={[
        { r: 114, g: 204, b: 191 },
        { r: 168, g: 149, b: 109 },
    ]}
/>

<style>
    .taro-shadow {
        box-shadow: 0px 0px 32px 0px rgba(255, 255, 255, 0.7);
    }
</style>
