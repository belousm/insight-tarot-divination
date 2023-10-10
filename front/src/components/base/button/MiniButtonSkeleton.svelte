<script>
    // Define a prop named 'name' to receive data from a parent component
    export let name;
</script>

<!-- Create a span element with a CSS class for styling -->
<span class="block mb-0.5"> {name} </span>

<!-- Create an SVG element with specific attributes for an icon -->
<svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <!-- Define a path element for the icon shape -->
    <path
        d="M5.6826 1.64552C5.58495 1.54789 5.58495 1.38960 5.6826 1.29197C5.78025 1.19434 5.93850 1.19434 6.03615 1.29197L8.6545 3.91031C9.11825 4.37406 9.11825 5.12592 8.6545 5.58967L6.03615 8.20802C5.9385 8.30567 5.78025 8.30567 5.6826 8.20802C5.58495 8.11042 5.58495 7.95212 5.6826 7.85447L8.30095 5.23612C8.3704 5.16667 8.4219 5.08602 8.45545 4.99997H1.25C1.11193 4.99997 1 4.88805 1 4.74998C1 4.61191 1.11193 4.49998 1.25 4.49998L8.4554 4.49998C8.4219 4.41396 8.3704 4.33333 8.30095 4.26386L5.6826 1.64552Z"
        fill="white"
    />
</svg>
