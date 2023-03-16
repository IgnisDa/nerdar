<div class="content">
    <div class="radar-container">
        <div class="radar" />
    </div>
</div>

<style>
    :root {
        --bg-color: #5fad41;
        --line-color: #84c318;
    }

    .content {
        display: flex;
        justify-content: center;
    }

    .radar-container {
        position: relative;
        width: 60vh;
        height: 60vh;
        border-radius: 50%;
        background-color: var(--bg-color);
        background-image: linear-gradient(
                var(--line-color) 1.5px,
                transparent 1.5px
            ),
            linear-gradient(90deg, var(--line-color) 1.5px, transparent 1.5px),
            linear-gradient(var(--line-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--line-color) 1px, transparent 1px);
        background-position: -1.5px -1.5px, -1.5px -1.5px, -1px -1px, -1px -1px;
        background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
    }

    .radar {
    }

    .radar {
        position: absolute;
        height: 50%;
        width: 2px;
        background-color: yellow;
        left: 50%;
        animation: scan 5s linear infinite;
        transform-origin: bottom;
        box-shadow: -10px 0px 10px yellow;
    }

    @keyframes scan {
        100% {
            transform: rotate(360deg);
        }
    }
</style>
