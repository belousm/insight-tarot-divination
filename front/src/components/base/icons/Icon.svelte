<script>
    // Import Svelte components for various types
    import TaroActive from "./types/TaroActive.svelte";
    import Taro from "./types/Taro.svelte";
    import Logotype from "./types/Logotype.svelte";
    import FemaleActive from "./types/FemaleActive.svelte";
    import MaleActive from "./types/MaleActive.svelte";
    import OtherActive from "./types/OtherActive.svelte";
    import Female from "./types/Female.svelte";
    import Male from "./types/Male.svelte";
    import Other from "./types/Other.svelte";
    import Star from "./types/Star.svelte";
    import Moon from "./types/Moon.svelte";
    import MoonActive from "./types/MoonActive.svelte";
    import Yijing from "./types/Yijing.svelte";
    import YijingActive from "./types/YijingActive.svelte";
    import Numerology from "./types/Numerology.svelte";
    import NumerologyActive from "./types/NumerologyActive.svelte";

    // Initialize variables for class, color, and type
    let clas = "";
    export { clas as class }; // Export class as "class"
    export let color = "fill-white";
    export let type = "";

    // Define transition options based on input transitions
    export let transitions = {};
    const { inFunc, inOptions, outFunc, outOptions } =
        readTransitions(transitions);

    function readTransitions(transitions) {
        return {
            inFunc: transitions.in ? transitions.in.func : () => {},
            inOptions: transitions.in ? transitions.in.options : null,
            outFunc: transitions.out ? transitions.out.func : () => {},
            outOptions: transitions.out ? transitions.out.options : null,
        };
    }

    // Define an array of types with their corresponding components and viewBox
    const types = [
        {
            name: "taroactive",
            component: TaroActive,
            viewBox: "10 10 40 40",
        },
        {
            name: "taro",
            component: Taro,
            viewBox: "0 0 40 40",
        },
        {
            name: "logotype",
            component: Logotype,
            viewBox: "32 19 50 50",
        },
        {
            name: "femaleactive",
            component: FemaleActive,
            viewBox: "32 24.5 50 50",
        },
        {
            name: "maleactive",
            component: MaleActive,
            viewBox: "32 35.5 50 50",
        },
        {
            name: "otheractive",
            component: OtherActive,
            viewBox: "41 24 50 50",
        },
        {
            name: "female",
            component: Female,
            viewBox: "0 -4.5 50 50",
        },
        {
            name: "male",
            component: Male,
            viewBox: "0 3.5 50 50",
        },
        {
            name: "other",
            component: Other,
            viewBox: "9 -5 50 50",
        },
        {
            name: "star",
            component: Star,
            viewBox: "32 32 50 50",
        },
        {
            name: "moon",
            component: Moon,
            viewBox: "0 0 50 50",
        },
        {
            name: "moonactive",
            component: MoonActive,
            viewBox: "10 10 50 50",
        },
        {
            name: "yijing",
            component: Yijing,
            viewBox: "0 0 50 50",
        },
        {
            name: "yijingactive",
            component: YijingActive,
            viewBox: "9.5 9.5 50 50",
        },
        {
            name: "numerology",
            component: Numerology,
            viewBox: "0 0 50 50",
        },
        {
            name: "numerologyactive",
            component: NumerologyActive,
            viewBox: "10 10 50 50",
        },
    ];
</script>

<!-- SVG container element with transition effects -->
<svg
    in:inFunc={inOptions}
    out:outFunc={outOptions}
    class={`${clas || ""} ${color} overflow-visible`}
    viewBox={types.find((t) => t.name == type)?.viewBox}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <!-- Dynamically render the selected Svelte component based on the type -->
    <svelte:component this={types.find((t) => t.name == type)?.component} />
</svg>
