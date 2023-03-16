<script lang="ts">
    const modes = [
        { name: "Nerd", image: "nerd-emoji.png" },
        { name: "Sus", image: "nerd-emoji.jpg" },
        { name: "Gay", image: "nerd-emoji.jpg" },
        { name: "Sigma", image: "nerd-emoji.jpg" },
    ];

    let selectedMode = modes[0];
</script>

<p>Umm, Actually</p>
<main class="flex flex-col min-h-screen justify-center space-y-24 items-center">
    <!-- the actual radar -->
    <div
        class="radar ring-4 ring-[#53C81C] relative rounded-full overflow-hidden h-[380px] w-[380px] sm:h-[420px] sm:w-[420px] origin-center"
    >
        <div class="inner-rings inset-0" />
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
            <div class="flex items-center space-x-4 text-black">
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
    @import url("https://fonts.googleapis.com/css2?family=Mulish:ital@1&display=swap");
    :root {
        --bg-color: #63ce3e;
        --line-color: #eef14f;
    }

    .radar {
        background-color: var(--bg-color);
        background-size: 35px 35px, 35px 35px, 20px 20px;
    }

    .radar-line {
        background: conic-gradient(var(--line-color), transparent 20deg);
        animation: scan 5s linear infinite;
    }

    @keyframes scan {
        to {
            transform: rotate(360deg);
        }
    }
    p {
        margin-top: 1rem;
        color: black;
        padding: 0.25em;
        background-color: white;
        font-family: "Mulish", sans-serif;
        font-size: 2em;
    }
    .inner-rings {
        position: absolute;
        border-radius: 50%;
        outline: var(--line-color) solid 1px;
        height: 30%;
        width: 30%;
    }
</style>
