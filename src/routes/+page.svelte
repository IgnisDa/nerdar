<p>Umm, Actually</p>
<div
    class="radar overflow-hidden h-[380px] w-[380px] sm:h-[420px] sm:w-[420px] md:h-[500px] md:w-[500px] lg:h-[550px] lg:w-[550px]"
>
    <div class="radar-line" />
</div>

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
        height: 100%;
        width: 100%;
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
