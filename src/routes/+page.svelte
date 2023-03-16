<script lang="ts">
    import trung from "../assets/trung-trung.mp3";
    import { Volume2 as VolumeOn, VolumeX as VolumeOff } from "lucide-svelte";
    import { Howl } from "howler";

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
        { name: "Gay", image: "gay-emoji.jpg" },
        { name: "Sigma", image: "chad-emoji.png" },
    ];

    let selectedMode = modes[0];

    const onClick = (e: MouseEvent) => {
        state.emojiPosition.x = e.clientX;
        state.emojiPosition.y = e.clientY;

        if (!state.playing) {
            state.playing = true;
            state.sound.play();
        }
    };
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
        class="flex items-center justify-center radar ring-4 ring-gray-500 rounded-full overflow-hidden h-[380px] w-[380px] sm:h-[420px] sm:w-[420px]"
        on:click={onClick}
        on:keyup={() => {}}
    >
        {#if state.playing}
            <img
                src={selectedMode.image}
                alt={selectedMode.name}
                class="h-20 w-20 absolute object-center z-10"
                style="left: {state.emojiPosition.x - 40}px; top: {state
                    .emojiPosition.y - 40}px;"
            />
            <div class="radar-line h-full w-full" />
        {/if}
        {#each { length: 4 } as _, num}
            <div
                class="radar-ring rounded-full"
                style="height: {num * 100}px; width: {num * 100}px;"
            />
        {/each}
    </div>

    <!-- the selection bar -->
    <!-- {JSON.stringify(selectedMode)} -->
    <div class="flex justify-around w-full">
        {#each modes as mode}
            <div class="flex items-center space-x-4">
                <button
                    class="uppercase bold text-lg {mode === selectedMode &&
                        'text-yellow-300'}"
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

    .radar-line {
        background: conic-gradient(transparent 340deg, var(--circular-line-color));
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
