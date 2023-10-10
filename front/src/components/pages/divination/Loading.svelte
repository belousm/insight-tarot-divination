<script>
    // Import necessary modules and components
    import { goto } from "$app/navigation";
    import { selectTask, getTask } from "$lib/api/task";
    import { blur } from "svelte/transition";
    import { linear } from "svelte/easing";
    import MeshGradient from "../../base/MeshGradient.svelte";
    import HeaderContainer from "../../base/HeaderContainer.svelte";
    import { onMount } from "svelte";

    // Exported props received by the component
    export let showLoading;
    export let image;
    export let task;

    // Perform actions on component mount
    onMount(async () => {
        // Select the task and pass selected card IDs
        const resultTask = await selectTask(
            task.task_uid,
            task.cards.filter((c) => c.selected === true).map((c) => c.id)
        );

        if (resultTask.status) {
            // Set up a timer to periodically check the task status
            let timer = setInterval(async () => {
                const result = await getTask(task.task_uid);

                // If the task status is 2 (completed), stop the timer and navigate to the result page
                if (result.task.status == 2) {
                    showLoading = false;
                    clearInterval(timer);

                    goto(`/recent-result/${task.task_uid}`);
                }
            }, 5000);
        }
    });
</script>

<div class="flex flex-col pt-20 h-full box-border justify-stretch">
    <!-- Loading animation -->
    <div class="w-full flex px-4 justify-center items-center">
        <img
            src="/images/divinations/loading/{image}.svg"
            class="block taro-floating w-full"
            alt=""
        />
    </div>

    <!-- Informational messages -->
    <div class="flex flex-col items-center pt-32">
        <HeaderContainer class="!pb-3">
            <p class="w-full text-center text-5xl font-medium leading-[46px]">
                Almost ready...
            </p>
        </HeaderContainer>
        <HeaderContainer class="py-3">
            <p
                class="w-full text-center text-base font-light font-inter leading-[18px]"
            >
                You've chosen all the cards. We're preparing your reading.
                Please wait a moment
            </p>
        </HeaderContainer>
    </div>
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
        { r: 114, g: 204, b: 191 },
        { r: 168, g: 149, b: 109 },
    ]}
/>

<!-- CSS styles for the floating animation -->
<style>
    .taro-floating {
        animation: floatAnimation 5s ease-in-out infinite;
    }
    @keyframes floatAnimation {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(20px);
        }
    }
</style>
