<script lang="ts">
    const modes = [
        { name: "Nerd", image: "nerd-emoji.png" },
        { name: "Sus", image: "nerd-emoji.jpg" },
        { name: "Gay", image: "nerd-emoji.jpg" },
        { name: "Sigma", image: "nerd-emoji.jpg" },
    ];

    let selectedMode = modes[0];
</script>

<main class="flex flex-col min-h-screen justify-center space-y-24 items-center">
    <!-- the actual radar -->
    <div
        class="radar ring-4 ring-gray-400 relative rounded-full overflow-hidden h-[380px] w-[380px] sm:h-[420px] sm:w-[420px]"
    >
        <img
            src={selectedMode.image}
            alt={selectedMode.name}
            class="h-14 w-14 absolute top-20 right-10"
        />
        <div class="radar-line h-full w-full" />
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
        border-radius: 50%;
        border: black 1px solid;
        background-color: var(--bg-color);
        /* background-image: linear-gradient(
                var(--line-color) 1px,
                transparent 1px
            ),
            linear-gradient(90deg, var(--line-color) 1px, transparent 1px); */
        background-size: 35px 35px, 35px 35px, 20px 20px;
    }

    .radar-line {
        background: conic-gradient(yellow, transparent 20deg);
        /* animation: scan 5s linear infinite; */
        /* transform-origin: center; */
    }

    @keyframes scan {
        to {
            transform: rotate(360deg);
        }
    }
</style>
