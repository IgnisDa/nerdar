<script lang="ts">
    import trung from "../assets/trung-trung.mp3";
    import { Volume2 as VolumeOn, VolumeX as VolumeOff } from "lucide-svelte";
    import { Howl } from "howler";
    import { match } from "ts-pattern";

    let radarElement: HTMLDivElement;
    let renderAngle: number;

    const _howlerSound = new Howl({ src: [trung], loop: true });

    const state = {
        playing: false,
        isMuted: false,
        sound: _howlerSound,
        emojiPosition: { x: 0, y: 0 },
    };

    const modes = [
        { name: "Nerd", image: "nerd-emoji.png" },
        { name: "Sus", image: "sus-emoji.gif" },
        { name: "Funny", image: "clown-emoji.gif" },
        { name: "Sigma", image: "chad-emoji.png" },
    ];

    const developers = [
        { name: "Diptesh", link: "https://github.com/ignisda" },
        { name: "Dev", link: "https://github.com/Jungl-ee" },
        { name: "Anirudh", link: "https://github.com/jupeeter8" },
    ];

    let selectedMode = modes[0];

    const onClick = (e: MouseEvent) => {
        const { top, bottom, left, right } =
            radarElement.getBoundingClientRect();
        const center = [left + (right - left) / 2, top + (bottom - top) / 2];

        if (
            e.clientX < left ||
            e.clientX > right ||
            e.clientY < top ||
            e.clientY > bottom
        )
            return;

        state.emojiPosition.x = e.clientX - 40;
        state.emojiPosition.y = e.clientY - 40;

        const xNew = e.clientX - center[0];
        const yNew = center[1] - e.clientY;

        const m = yNew / xNew;

        enum Quadrant {
            One,
            Two,
            Three,
            Four,
        }

        let quadrant = null;

        if (xNew > 0) {
            if (yNew > 0) quadrant = Quadrant.One;
            else quadrant = Quadrant.Four;
        } else {
            if (yNew > 0) quadrant = Quadrant.Two;
            else quadrant = Quadrant.Three;
        }

        let angle = Math.atan(m) * (180 / Math.PI);

        const newAngle = match(quadrant)
            .with(Quadrant.One, Quadrant.Four, () => 90 - angle)
            .with(Quadrant.Two, Quadrant.Three, () => 270 - angle)
            .run();

        renderAngle = Math.floor(newAngle);

        if (!state.playing) {
            state.playing = true;
            state.sound.play();
        }
    };
</script>

<svelte:head>
    {#each modes as mode}
        <link rel="preload" as="image" href={`/${mode.image}`} />
    {/each}
</svelte:head>

<main
    class="flex flex-col min-h-screen justify-center space-y-16 items-center"
    style="--angle: {renderAngle + 'deg'};"
>
    <!-- the attributions column -->
    <div class="w-full mx-5 text-center space-y-3">
        <h1 class="text-7xl uppercase font-bold font-heading underline">
            Nerdar
        </h1>
        <p class="text-gray-400">
            <span>Made by</span>
            {#each developers as developer, num}
                <a class="underline decoration-blue-400" href={developer.link}
                    >{developer.name}</a
                >{num !== developers.length - 1 ? "," : ""}
                {" "}
            {/each}
        </p>
    </div>

    <!-- the control panel -->
    <button
        on:click={() => {
            if (state.isMuted) {
                state.isMuted = false;
                state.sound.play();
            } else {
                state.isMuted = true;
                state.sound.stop();
            }
        }}
    >
        {#if state.isMuted}
            <VolumeOff size={40} />
        {:else}
            <VolumeOn size={40} />
        {/if}
    </button>

    <!-- the actual radar -->
    <div
        class="radar relative flex items-center justify-center ring-4 ring-gray-500 rounded-full overflow-hidden h-[380px] w-[380px] sm:h-[420px] sm:w-[420px]"
        on:click={onClick}
        on:keyup={() => {}}
        bind:this={radarElement}
    >
        <div
            class="radar-ring rounded-full bg-[var(--circular-line-color)] w-4 h-4"
        />
        {#each { length: 3 } as _, num}
            <div
                class="radar-ring rounded-full"
                style="height: {(num + 1) * 110}px; width: {(num + 1) * 110}px;"
            />
        {/each}

        {#if state.playing}
            <div class="scan-line" />
            <img
                src={selectedMode.image}
                alt={selectedMode.name}
                class="emoji h-20 w-20 fixed object-center"
                style="left: {state.emojiPosition.x}px; top: {state
                    .emojiPosition.y}px;"
            />
            <div class="radar-line h-full w-full" />
        {:else}
            <div class="absolute left-10 ">
                <img
                    src="/pointing-hand.png"
                    alt="Pointing Hand"
                    class="h-20 w-20 rotate-45"
                />
                <p
                    class="text-lg text-lime-300 bg-black/50 p-1 rounded-lg text-center font-bold uppercase"
                >
                    <span class="block">Tap anywhere</span>
                    <span class="block">to find {selectedMode.name}</span>
                </p>
            </div>
        {/if}
    </div>

    <!-- the selection bar -->
    <div class="flex justify-around w-full">
        {#each modes as mode}
            <div class="flex items-center space-x-4 h-20">
                <button
                    class="bg-white uppercase font-bold w-20 h-10 rounded-xl text-black transition-all box-content {mode ===
                        selectedMode &&
                        '!bg-black text-yellow-500 border-4 border-yellow-500 -translate-y-2'}"
                    on:click={() => {
                        selectedMode = mode;
                    }}
                >
                    {mode.name}
                </button>
            </div>
        {/each}
    </div>
</main>

<style>
    :root {
        --bg-color: #204030;
        --line-color: rgb(103, 119, 23);
        --circular-line-color: yellowgreen;
        --angle: var(--angle, 0deg);
        --angle-offset: 120deg;
    }

    .radar {
        background-color: var(--bg-color);
        background-image: linear-gradient(
                var(--line-color) 1px,
                transparent 1px
            ),
            linear-gradient(90deg, var(--line-color) 1px, transparent 1px);
        background-size: 35px 35px, 35px 35px, 20px 20px;
    }

    @media (max-width: 640px) {
        .radar {
            background-position: 14.5px 14.5px;
        }
    }

    .scan-line {
        position: absolute;
        width: 5px;
        height: 50%;
        top: 0;
        background-color: var(--circular-line-color);
        transform-origin: bottom;
        animation: scan 3s linear infinite;
    }

    .radar-line {
        background: conic-gradient(
            transparent 320deg,
            var(--circular-line-color)
        );
        animation: scan 3s linear infinite;
    }

    @keyframes scan {
        from {
            transform: rotate(calc(var(--angle) - var(--angle-offset)));
        }
        to {
            transform: rotate(
                calc(360deg + var(--angle) - var(--angle-offset))
            );
        }
    }

    .radar-ring {
        border-color: var(--circular-line-color);
        position: absolute;
        border-width: 3px;
    }

    .emoji {
        filter: blur(1px) contrast(200%) hue-rotate(40deg) sepia(40%);
        animation: appear 3s ease-in-out infinite;
    }

    @keyframes appear {
        0%,
        27%,
        80%,
        100% {
            opacity: 0;
        }
        33.33% {
            opacity: 1;
        }
    }
</style>
