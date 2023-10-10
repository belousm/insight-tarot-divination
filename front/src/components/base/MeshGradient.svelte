<script>
    // Import necessary modules and components.
    import { onMount } from "svelte";

    // Define component properties and their default values.
    export let speed = 1.5;
    export let filePaths = ["/images/entrance/launch.svg"];
    export let totalParticles = 10;
    export let colors = [
        { r: 45, g: 74, b: 227 },
        { r: 250, g: 255, b: 89 },
        { r: 255, g: 104, b: 248 },
        { r: 44, g: 209, b: 252 },
        { r: 54, g: 233, b: 84 },
    ];

    export let canvasWidth;
    export let canvasHeight;

    let clas = "";

    export { clas as class };

    export let transitions = {};

    // Extract transition options from the 'transitions' prop.
    const { inFunc, inOptions, outFunc, outOptions } =
        readTransitions(transitions);

    // Define a function to extract transition options.
    function readTransitions(transitions) {
        return {
            inFunc: transitions.in ? transitions.in.func : () => {},
            inOptions: transitions.in ? transitions.in.options : null,
            outFunc: transitions.out ? transitions.out.func : () => {},
            outOptions: transitions.out ? transitions.out.options : null,
        };
    }

    let c; // Initialize a variable 'c' to store the canvas element.
    let svgPaths = []; // Initialize an array to store SVG paths.

    // Function to load SVGs from provided file paths.
    async function loadSVGs(files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const response = await fetch(file);
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "image/svg+xml");
            const path = doc.querySelector("path").getAttribute("d");
            svgPaths.push(path);
        }
    }

    // Define a 'Mesh' class for creating and animating particles.
    class Mesh {
        // Constructor to initialize properties.
        constructor(c, speed, totalParticles) {
            this.canvas = c;
            this.speed = speed;
            this.ctx = this.canvas.getContext("2d");
            this.totalParticles = totalParticles;
            this.particles = [];
            this.maxRadius = 400;
            this.minRadius = 100;
            window.addEventListener("resize", this.resize.bind(this), false);
            this.resize();
            window.requestAnimationFrame(this.animate.bind(this));
        }

        // Resize the canvas and create particles.
        resize() {
            this.stageWidth = canvasWidth;
            this.stageHeight = canvasHeight;
            this.canvas.width = this.stageWidth;
            this.canvas.height = this.stageHeight;
            this.ctx.globalCompositeOperation = "saturation";
            this.createParticles();
        }

        // Create particles and store them in the 'particles' array.
        createParticles() {
            let curColor = 0;
            this.particles = [];
            for (let i = 0; i < this.totalParticles; i++) {
                const item = new GlowParticle(
                    Math.random() * this.stageWidth,
                    Math.random() * this.stageHeight,
                    Math.random() * (this.maxRadius - this.minRadius) +
                        this.minRadius,
                    colors[curColor],
                    colors[++curColor >= colors.length ? 0 : curColor++],
                    new Path2D(svgPaths[0]),
                    this.speed
                );
                if (++curColor >= colors.length) {
                    curColor = 0;
                }
                this.particles[i] = item;
            }
        }

        // Animation for particles.
        animate() {
            window.requestAnimationFrame(this.animate.bind(this));
            this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
            for (let i = 0; i < this.totalParticles; i++) {
                const item = this.particles[i];
                item.animate(this.ctx, this.stageWidth, this.stageHeight);
            }
        }
    }

    // Define a 'GlowParticle' class for individual particles.
    class GlowParticle {
        constructor(x, y, radius, rgb, rgb2, svgPath, speed) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.rgb = rgb;
            this.rgb2 = rgb2;
            this.vx = Math.random() * speed ** 2 - speed; // [-2, 2] * 4 - 2
            this.vy = Math.random() * speed ** 2 - speed; // [-2, 2]
            this.svgPath = svgPath;
        }

        // Animate the particle.
        animate(ctx, stageWidth, stageHeight) {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > stageWidth) {
                this.vx *= -1;
            }
            if (this.y < 0 || this.y > stageHeight) {
                this.vy *= -1;
            }

            ctx.beginPath();
            const g = ctx.createRadialGradient(
                this.x,
                this.y,
                this.radius * 0.01,
                this.x,
                this.y,
                this.radius
            );
            g.addColorStop(
                1,
                `rgba(${this.rgb2.r}, ${this.rgb2.g}, ${this.rgb2.b}, 1)`
            );
            g.addColorStop(
                0.5,
                `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 1)`
            );
            ctx.fillStyle = g;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.scale(this.radius / 100, this.radius / 100);
            ctx.translate(-50, -50); // Предполагается, что размер viewBox SVG равен 100x100. Это центрирует фигуру.
            ctx.fill(this.svgPath);
            ctx.restore();
        }
    }

    // Hook to run code when the component is mounted.
    onMount(async () => {
        canvasWidth = canvasWidth ?? window.innerWidth;
        canvasHeight = canvasHeight ?? window.innerHeight;
        await loadSVGs(filePaths);

        new Mesh(c, speed, totalParticles);
    });
</script>

<canvas
    in:inFunc={inOptions}
    out:outFunc={outOptions}
    class="blur-3xl {clas || ''}"
    bind:this={c}
/>
