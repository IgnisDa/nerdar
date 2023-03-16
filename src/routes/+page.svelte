<script lang="ts">
    import P5, { type Sketch } from "p5-svelte";
    let radius = 350;

    const sketch: Sketch = (p5) => {
        p5.setup = () => {
            p5.createCanvas(400, 400);
            p5.stroke("#5fae41");
        };

        p5.draw = () => {
            p5.describe("white circle with a black grid inside it");
            p5.background(255);
            p5.strokeWeight(2);
            p5.circle(p5.width / 2, p5.height / 2, radius);
            p5.strokeWeight(1);
            for (let i = 0; i < p5.width; i += p5.width / 16) {
                for (let j = 0; j < p5.height; j += p5.height / 16) {
                    p5.stroke(0);
                    p5.line(i, 0, i, p5.width);
                    p5.line(0, j, p5.height, j);
                }
            }
        };
    };
</script>

<P5 {sketch} />
