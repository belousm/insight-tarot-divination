<script>
    // Import necessary functions from the "$lib/moon" module
    import { moonPhase, getDateFormatted } from "$lib/moon";

    // Get the current date
    let currentDate = new Date();

    // Calculate moon phase information based on the current date
    let moonPhaseInfo = moonPhase(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth() + 1,
        currentDate.getDate()
    );
</script>

<div
    class="flex flex-col w-full gap-3 px-4 py-3 font-inter text-sm font-light leading-3"
>
<!-- Display moon phase and date information -->
    <div class="flex justify-between w-full items-center">
        <p class="uppercase opacity-60 flex gap-2 items-center">
            <img src="/images/moon-phases/{moonPhaseInfo[2]}.svg" alt="" />

            {getDateFormatted(currentDate)}
        </p>
        <p>
            {moonPhaseInfo[0]}
        </p>
    </div>
    <div class="h-px w-full opacity-10 bg-white" />
    <div class="flex justify-between w-full items-center">
        <p class="opacity-60">Energy of the day</p>
        <p>{moonPhaseInfo[1]}</p>
    </div>
</div>
