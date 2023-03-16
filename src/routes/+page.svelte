<script lang="ts">
    import trung from "../assets/trung-trung.mp3";
    import { Volume2 as VolumeOn, VolumeX as VolumeOff } from "lucide-svelte";
    import { Howl } from "howler";

    const _sound = new Howl({ src: [trung], loop: true });

    const state = {
        playing: false,
        isMuted: false,
        sound: _sound,
    };

    const modes = [
        { name: "Nerd", image: "nerd-emoji.png" },
        { name: "Sus", image: "nerd-emoji.jpg" },
        { name: "Gay", image: "nerd-emoji.jpg" },
        { name: "Sigma", image: "nerd-emoji.jpg" },
    ];

    let selectedMode = modes[0];

    const onClick = (e: HTMLDivElement) => {
        console.log(e.clientLeft, e);
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
        class="radar ring-4 ring-gray-400 relative rounded-full overflow-hidden h-[380px] w-[380px] sm:h-[420px] sm:w-[420px]"
        on:click={onClick}
        on:keyup={() => {}}
    >
        {#if state.playing}
            <img
                src={selectedMode.image}
                alt={selectedMode.name}
                class="h-14 w-14 absolute top-20 right-10"
            />
            <div class="radar-line h-full w-full" />
        {/if}
    </div>

    <!-- the selection bar -->
    <!-- {JSON.stringify(selectedMode)} -->
    <div class="flex justify-around w-full">
        {#each modes as mode}
            <div class="flex items-center space-x-4">
                <button
                    class="uppercase bold text-lg"
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
        --bg-color: #5fad41;
        --line-color: #84c318;
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
        background: conic-gradient(transparent 340deg, yellow);
        animation: scan 5s linear infinite;
    }

    @keyframes scan {
        to {
            transform: rotate(360deg);
        }
    }
</style>
