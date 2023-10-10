/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        colors: {
            "primaryblack": "#100703",
            "white": "#FFFFFF",
            "whitedark": "#EEECE7",
            "whiteplaceholder": "#AAA9A9",
            "whiteinputborder": "rgba(242, 246, 255, 0.40)",
            "pink": "#A591A7",
            "linearfrom": "#877488",
            "linearto": "#87748800",
            "lineardisablefrom": "#443A45",
            "lineardisableto": "rgba(68.22, 58.13, 69.06, 0)",
            "linearactive": "linear-gradient(180deg, #877488 0%, #87748800 100%)",
            "lineardisable": "linear-gradient(180deg, #443A45 0%, rgba(68.22, 58.13, 69.06, 0) 100%)",
            "gray": "#443A45",
            "lightgray": "#777777",
            "blue-20": "rgba(168, 187, 255, 0.20)",
            "blue-40": "rgba(242, 246, 255, 0.40)",
            "transparent": "transparent",
            "red": "#AD4141",
        },
        fontFamily: {
            dargro: ["Darker Grotesque", "sans-serif"],
            inter: ["Inter", "sans-serif"],
        },
        extend: {},
    },
    plugins: [],
}