<script lang="ts">
    import { Volume2 as VolumeOn, VolumeX as VolumeOff } from "lucide-svelte";
    import { Howl } from "howler";
    import { match } from "ts-pattern";

    let renderAngle = 0;
    let radarElement: HTMLDivElement;

    const _howlerSound = new Howl({ src: ["/trung-trung.mp3"], loop: true });

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

        const circleRadius = center[0] - left;
        const distance = Math.sqrt(
            Math.pow(e.clientX - center[0], 2) +
                Math.pow(e.clientY - center[1], 2)
        );
        if (distance > circleRadius) return;

        state.emojiPosition.x = e.clientX - left - 40;
        state.emojiPosition.y = e.clientY - top - 40;

        const xNew = e.clientX - center[0];
        const yNew = center[1] - e.clientY;

        const m = yNew / xNew;

        enum Quadrant {
            One = "one",
            Two = "two",
            Three = "three",
            Four = "four",
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
            .exhaustive();

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

<div
    class="flex flex-col justify-center space-y-10 items-center my-auto"
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
            class="radar-ring rounded-full bg-[var(--circular-line-color)] w-4 h-4 absolute border-2"
        />
        {#each { length: 3 } as _, num}
            <div
                class="radar-ring rounded-full absolute border-2"
                style="height: {(num + 1) * 110}px; width: {(num + 1) * 110}px;"
            />
        {/each}

        {#if state.playing}
            <div class="scan-line absolute w-[5px] h-1/2 top-0" />
            <img
                src={selectedMode.image}
                alt={selectedMode.name}
                class="emoji h-20 w-20 absolute object-center z-10"
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
</div>

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
