window.onload = () => {
    //get the canvas and context, and store in lets
    const canvas = document.getElementById("sky");
    const ctx = canvas.getContext("2d");

    //set canvas dimensions equal to window dimensions
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    //generate the snowflakes and apply attributes
    const maxFlakes = 200;
    let flakes = [];

    //loop through the empty flakes and apply attributes
    let i = 0;
    for(i; i<maxFlakes; i++){
        flakes.push({
            x: Math.random() * w, 
            y: Math.random() * h,
            r: Math.random() * 6, //radius of snowflakes
            s: Math.random() * 3 //s: speed of snowflakes falling down to the ground
        });
    }

    //draw snowflakes onto canvas
    drawFlakes = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "white";
        ctx.beginPath();
        let j = 0;
        for(j; j<maxFlakes; j++){
            let f = flakes[j];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, 2 * Math.PI);
        }
        ctx.fill();
        moveFlakes();
    }

    //animate the snowflakes
    let angle = 0;
    moveFlakes = () => {
        angle += 0.01;
        let n = 0;
        for(n; n<maxFlakes; n++){
            let f = flakes[n];

            //update X and Y coordinates of each snowflake
            f.y += f.s;
            f.x += Math.sin(angle);

            //if a snowflake reaches the bottom, send a new one from the top
            if(f.y > h){
                flakes[n] = {
                    x: Math.random() * w,
                    y: 0,
                    r: f.r,
                    s: f.s
                }
            }
        }
    }

    setInterval(drawFlakes, 20);
}