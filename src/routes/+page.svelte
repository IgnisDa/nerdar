<div class="radar-container">
    <div class="radar">
        <div class="radar-line" />
    </div>
</div>

<style>
    :root {
        --bg-color: #5fad41;
        --line-color: #84c318;
    }

    .radar-container {
        position: relative;
        width: 60vh;
        height: 60vh;
        border-radius: 50%;
        background-color: var(--bg-color);
        background-image: linear-gradient(
                var(--line-color) 1px,
                transparent 1px
            ),
            linear-gradient(90deg, var(--line-color) 1px, transparent 1px);
        background-size: 35px 35px, 35px 35px, 20px 20px;
    }

    .radar {
        border-radius: 50%;
        height: 100%;
        width: 100%;
    }

    .radar-line {
        height: 60vh;
        width: 60vh;
        background: conic-gradient(yellow, transparent 20deg);
        animation: scan 5s linear infinite;
        transform-origin: center;
    }

    @keyframes scan {
        to {
            transform: rotate(360deg);
        }
    }
</style>
