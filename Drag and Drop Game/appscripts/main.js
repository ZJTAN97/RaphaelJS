/** Start of Declaring Items */
let paper = new Raphael(document.getElementById("mySVGCanvas"));
let dimX = paper.width;
let dimY = paper.height;
let bg = paper.rect(0,0, dimX, dimY).attr({
    "fill" : "cadetblue",
    "stroke" : "grey",
})
var cardWidth = 100;
var cardHeight = 75;

cardStack = [];
colors = ["red", "green", "black", "yellow", "blue"]
for(i=0; i<5; i++) {
    cardStack.push(
        paper.rect((dimX/2)-385 + i*170, dimY/8, cardWidth, cardHeight, 10).attr({
            "fill" : colors[i]
        })
    )
}

boxArray = [];
for(i=0; i<5; i++) {
    boxArray.push(
        paper.rect((dimX/6*(i+1))-50, (dimY/8)*6, cardWidth, cardHeight, 10).attr({
            "fill" : "white",
        })
    )
}

/** End of Declaring Items */



/** Start of Actions Handler */
let cardActions = function(card) {

    let state = 0;
    let allocated = false;
    card.node.addEventListener('mousedown', function(){
        console.log('down-ed')
        state = 1;
        console.log(state)

    })
    card.node.addEventListener('mouseup', function(){
        console.log('up-ed')
        state = 0;
    })
    card.node.addEventListener('mousemove', function(move){

        // during mouse move you want to check if the card is allocated to a box
        // if its not allocated, you will use `enterBox` to check which box its going to be allocated to
        // if allocated, you use `exitBox` to remove from the box

        // IF NOT ALLOCATED
        if(!allocated) {
            if (state === 1) {
                card.attr({
                    "x" : move.offsetX - (cardWidth/2), 
                    "y" : move.offsetY - (cardHeight/2),
                })
                allocated = enterBox(card)
                if(allocated) {
                    state = 0
                } else {
                    state = 1
                }
            }
        }

        // IF ALLOCATED
        if(allocated) {
            if (state === 1) {
                card.attr({
                    "x" : move.offsetX - (cardWidth/2), 
                    "y" : move.offsetY - (cardHeight/2), 
                })
                exitBox(card)            
            }
        }

    })
}


let enterBox = function(card) {    
    // Currently you only have the condition for first box, you need to to it for all boxes
    let TOLERANCE = 70; // how much gap you want to give before the card is ASSIGNED to the box.
    if (
        card.attrs.y <= 601 + TOLERANCE && 
        card.attrs.y >= 601 - TOLERANCE && 
        card.attrs.x >= 117 - TOLERANCE && 
        card.attrs.x <= 117+ TOLERANCE
    ) {
        card.attr({
            x: 117,
            y: 601.5
        })
        boxArray[0].hide()
        return true;
    } 
    return false;
}

let exitBox = function(card) {
    let TOLERANCE = 10
    if (card.attrs.y <= 601 - TOLERANCE) {
        boxArray[0].show()
    }
}


for(i=0; i<5; i++) {
    // add actions to all the cards
    cardActions(cardStack[i])    
}
/** End of Actions Handler */




