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
var draw = function(disk, counter){
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

    // check if mouse is clicked using state.push
    // this if statement check if any ball is within the rectangle
    if(
        state.pushed && 
        disk.xpos < (state.x + 100) && 
        disk.xpos > (state.x - 100) &&
        disk.ypos < (state.y + 50) &&
        disk.ypos > (state.y - 50)
    ) {
        disk.attr({
            'fill': 'white'
        })
    } else {
        disk.attr({
            "fill": colors[counter]
        })
    }

}

var diskArray = [];
var totalDisks = 50;

// For Step 2 & 3. start

// this is to save the colors in an array 
// so that it can revert back if im not clicking
var colors = []
var i = 0
while(i < totalDisks) {
    colors.push(`#${randInt(999999)}`)
    i++
}

var counter = 0;
while(counter < totalDisks){
    diskArray[counter] = paper.circle(pWidth/2, pHeight/2, 20)
    diskArray[counter].attr({"fill": colors[counter]})
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
        draw(diskArray[counter], counter)
        counter ++
    }

}, 20);


// for your subsequent parts
// create state as per step 5
var state = {
    pushed: false,
    x: 0,
    y: 0
}

// create a rectangle so that we have an area of effect
// i set to a 200x100 rectangle
var rect = paper.rect(0, 0, 200, 100)


// on mouse down, do all this shit
bgRect.mousedown(function(e) {
    // update your state
    state.x = e.offsetX
    state.y = e.offsetY
    state.pushed = true

    rect.attr({
        stroke:'red',"stroke-width":5, // remove this line after u familiar with it
        opacity:0.5,
        x: e.offsetX - 100,
        y: e.offsetY - 50
    }); 

});

// on mouse up do all these shit
bgRect.mouseup(function(e) {
    // update your state
    state.x = 0
    state.y = 0
    state.pushed = false
    
    rect.attr({
        stroke:'blue',"stroke-width":5,
        opacity:0,
        x: e.offsetX,
        y: e.offsetY
    })
});