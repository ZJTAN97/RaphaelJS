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
    card.node.addEventListener('mousedown', function(){
        console.log('down-ed')
        state = 1;
    })
    card.node.addEventListener('mouseup', function(){
        console.log('up-ed')
        state = 0;
    })
    card.node.addEventListener('mousemove', function(move){
        if (state === 1) {
            card.attr({
                "x" : move.offsetX - (cardWidth/2), //to ensure that the movement corresponds to the centre of rect rather than the top left corner
                "y" : move.offsetY - (cardHeight/2), //to ensure that the movement corresponds to the centre of rect rather than the top left corner
            })
        }
        allocated = enterBox(card)
    })
}


let enterBox = function(card) {    
    if (card.attrs.y <= 601 + 70 && card.attrs.y >= 601 - 70 && card.attrs.x >= 117 - 70 && card.attrs.x <= 117+ 70) {
        card.attr({
            x: 117,
            y: 601.5
        })
        boxArray[0].hide()
        return true;
    } 
}


for(i=0; i<5; i++) {
    // add actions to all the cards
    cardActions(cardStack[i])    
}






