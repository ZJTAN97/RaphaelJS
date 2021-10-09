console.log("Yo, I am alive!");

// Grab the div where we will put our Raphael paper
var centerDiv = document.getElementById("centerDiv");

// Create the Raphael paper that we will use for drawing and creating graphical objects
var paper = new Raphael(centerDiv);

// put the width and heigth of the canvas into variables for our own convenience
var pWidth = paper.width;
var pHeight = paper.height;
console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);
//---------------------------------------------------------------------

// Just create a nice black background
var bgRect = paper.rect(0,0,pWidth, pHeight);
bgRect.attr({"fill": "black"});


var randInt = function(max){
    return Math.floor(max*Math.random());
}

// our drawing routine, will use as a callback for the interval timer
var draw = function(disk){
    // Update the position where we want our disk to be
    disk.xpos += disk.xrate;
    disk.ypos += disk.yrate;

    // Now actually move the disk using our 'state' variables
    disk.attr({'cx': disk.xpos, 'cy': disk.ypos});

    // keep the object on the paper
    if (disk.xpos > pWidth) {disk.xrate = -disk.xrate;}
    if (disk.ypos > pHeight) {disk.yrate = - disk.yrate};
    if (disk.xpos < 0) {disk.xrate = -disk.xrate;}
    if (disk.ypos < 0) (disk.yrate = - disk.yrate);
}

var diskArray = [];
var totalDisks = 50;
var counter = 0;

// For Step 2 & 3. start
while(counter < totalDisks){
    diskArray[counter] = paper.circle(pWidth/2, pHeight/2, 20)
    diskArray[counter].attr({"fill": `#${randInt(999999)}`})
    // diskArray[counter].xpos = Math.floor(Math.random() * (pWidth+1))
    // diskArray[counter].ypos = Math.floor(Math.random() * (pHeight+1))
    diskArray[counter].xpos = pWidth/2
    diskArray[counter].ypos = pHeight/2
    diskArray[counter].xrate = Math.random() * 10
    diskArray[counter].yrate = Math.random() * 10

    counter++;
}
// For Step 2 & 3. end



// Call draw() periodically
// We startthe animation last thing as the module loads
setInterval(function() {
    var counter = 0
    while(counter < totalDisks) {
        draw(diskArray[counter])
        counter ++
    }
}, 20);











