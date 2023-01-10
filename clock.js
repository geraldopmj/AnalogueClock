var canvas = document.getElementById("canvas"); /*canvas from html*/
var ctx = canvas.getContext("2d"); /* create object 2d */
var radius = canvas.height / 2; /*uses height so the clock work on any canvas height */
ctx.translate(radius, radius); /*remap the drawing position to the center of canvas (centered when radius was declared) */
radius = radius* 0.8;/* draw clock only to 80% of canvas size */

setInterval(drawClock,100);// method that calls a function at specified intervals in ms

function drawClock() {
    drawAClock(ctx, radius) /* call function to draw clock back */
}

function drawAClock(ctx, radius) {
    var grad;
    ctx.beginPath(); /* ctx draw white circle for the face*/
    ctx.arc(0, 0, radius, 0, 2*Math.PI); /*Draws a circle */
    ctx.fillStyle = 'white'; /*Color of the fill*/
    ctx.fill(); /*fill with color*/
    grad = ctx.createRadialGradient(0, 0, radius*0.95, 0, 0, radius*1.05); /*creating a radial gradient*/
    grad.addColorStop(0, '#333'); /*colorStop create 3d effect with gradient colors*/
    grad.addColorStop(0.5, 'White');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad; /*defining the gradient as the stroke style of the drawings object*/
    ctx.lineWidth = radius*0.1; /*defining the line width the drawings object*/
    ctx.stroke(); /*calling method to draw*/
    ctx.beginPath(); /* begin drawing*/
    ctx.fillStyle = 'black';
    ctx.fill();

     //Numbers:
    var ang;
    var num;
    ctx.font = radius*0.18 + "px arial" /* Set font and size */
    ctx.textBaseline= "middle" /* align baseline */
    ctx.textAlign= "center"/* align to center */
    for(num = 1; num<13; num++){ /* Calculating the location of the numbers */
        ang = num*Math.PI /6; 
        ctx.rotate(ang); /* rotating */
        ctx.translate(0, -radius*0.80   ); /* translate = remap x and y */
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0); /* putting text and converting to string */
        ctx.rotate(ang);
        ctx.translate(0, radius*0.80)
        ctx.rotate(-ang);
    }

    var now = new Date(); /* current date */
    var hour = now.getHours(); /* hour */
    var minute = now.getMinutes(); /* minutes */
    var second = now.getSeconds(); /* seconds */
   
    //Pointers angle calculation:
    hour = hour%12;
    hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    minute = (minute*Math.PI/30);
    second = (second*Math.PI/30);
   
    //Pointers drawing:
    drawHand(ctx, minute, radius*0.7, radius*0.06, "gray"); 
    drawHand(ctx, hour, radius*0.45, radius*0.06, "gray");
    drawHand(ctx, second, radius*0.8, radius*0.02, "red");

    //Circle hold hands drawing:
    ctx.stroke(); /*calling method to draw*/
    ctx.beginPath(); /* begin drawing*/
    ctx.arc(0,0, radius*0.1, 0, 2*Math.PI);/*drawing circle "holds" hands*/
    ctx.fillStyle = 'black';
    ctx.fill();
}

    //Pointers function:
function drawHand(ctx, pos, length, width, color){
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);    
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.rotate(-pos);
}
