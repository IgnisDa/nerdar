<script lang="ts">
    const modes = [
        { name: "Nerd" },
        { name: "Sus" },
        { name: "Gay" },
        { name: "Sigma" },
    ];
</script>

<main class="flex flex-col min-h-screen justify-center space-y-24 items-center">
    <div
        class="radar rounded-full overflow-hidden h-[380px] w-[380px] sm:h-[420px] sm:w-[420px]"
    >
        <div class="radar-line h-full w-full" />
    </div>
    <div class="flex justify-around w-full">
        <!-- loop over the modes -->
        {#each modes as mode}
            <div class="flex items-center space-x-4">
                <div class="uppercase bold text-lg">
                    {mode.name}
                </div>
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

    .radar-line {
        background: conic-gradient(yellow, transparent 20deg);
        animation: scan 5s linear infinite;
    }

    @keyframes scan {
        to {
            transform: rotate(360deg);
        }
    }
</style>
