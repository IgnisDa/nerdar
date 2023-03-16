<script lang="ts">
    import trung from "../assets/trung-trung.mp3";
    import { Volume2 as VolumeOn, VolumeX as VolumeOff } from "lucide-svelte";
    import { Howl } from "howler";
    import { onMount } from "svelte";

    let el: HTMLDivElement;
    let center: [number, number];

    const _sound = new Howl({ src: [trung], loop: true });

    const state = {
        playing: false,
        isMuted: false,
        sound: _sound,
        emojiPosition: { x: 0, y: 0 },
    };

    const modes = [
        { name: "Nerd", image: "nerd-emoji.png" },
        { name: "Sus", image: "sus-emoji.gif" },
        { name: "Gay", image: "gay-emoji.png" },
        { name: "Sigma", image: "chad-emoji.png" },
    ];

    let selectedMode = modes[0];

    const onClick = (e: MouseEvent) => {
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

        switch (quadrant) {
            case Quadrant.One:
                angle += 0;
                break;
            case Quadrant.Two:
                angle += 180;
                break;
            case Quadrant.Three:
                angle += 180;
                break;
            case Quadrant.Four:
                angle += 360;
                break;
        }

        console.log({ angle });

        if (!state.playing) {
            state.playing = true;
            state.sound.play();
        }
    };

    onMount(async () => {
        const { top, bottom, left, right } = el.getBoundingClientRect();
        center = [left + (right - left) / 2, top + (bottom - top) / 2];
    });
</script>

<main class="flex flex-col min-h-screen justify-center space-y-24 items-center">
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
        class="relative flex items-center justify-center radar ring-4 ring-gray-500 rounded-full overflow-hidden h-[380px] w-[380px] sm:h-[420px] sm:w-[420px]"
        on:click={onClick}
        on:keyup={() => {}}
        bind:this={el}
    >
        <div
            class="radar-ring rounded-full bg-[var(--circular-line-color)]"
            style="height: 10px; width: 10px;"
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
                class="h-20 w-20 fixed object-center"
                style="left: {state.emojiPosition.x}px; top: {state
                    .emojiPosition.y}px;"
            />
            <div class="radar-line h-full w-full" />
        {/if}
    </div>

    <!-- the selection bar -->
    <!-- {JSON.stringify(selectedMode)} -->
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
        animation: scan 5s linear infinite;
    }

    .radar-line {
        background: conic-gradient(
            transparent 320deg,
            var(--circular-line-color)
        );
        animation: scan 5s linear infinite;
    }

    @keyframes scan {
        from {
            transform: rotate();
        }
        to {
            transform: rotate(360deg);
        }
    }

    .radar-ring {
        border-color: var(--circular-line-color);
        position: absolute;
        border-width: 3px;
    }
</style>
