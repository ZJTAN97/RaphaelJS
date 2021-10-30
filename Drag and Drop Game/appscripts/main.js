
console.log("yo, I'm alive!");

let paper = new Raphael(document.getElementById("mySVGCanvas"));
// Find get paper dimensions
let dimX = paper.width;
let dimY = paper.height;



let bg = paper.rect(0,0, dimX, dimY).attr({
    "fill" : "cadetblue",
    "stroke" : "grey",
})


var cardWidth = 100;
var cardHeight = 75;


// putting the cards in an array
cardStack = [];

//using for loop because i already know i want 5 cards
for(i=0; i<5; i++) {
    cardStack.push(
        paper.rect((dimX/2)-50, dimY/8, cardWidth, cardHeight, 10).attr({
            "fill" : "black"
        })
    )
}

cardStack[4].node.addEventListener('mousedown', function(){
    console.log("mousedown on card")
    state = 1;
})

cardStack[4].node.addEventListener('mouseup', function(){
    console.log("mouseup on card")
    state = 0;
})


let cardMove = cardStack[4].node.addEventListener('mousemove', function(move){
    if (state === 1) {
        cardStack[4].attr({
            "x" : move.offsetX - (cardWidth/2), //to ensure that the movement corresponds to the centre of rect rather than the top left corner
            "y" : move.offsetY - (cardHeight/2), //to ensure that the movement corresponds to the centre of rect rather than the top left corner
            "fill" : "pink"
        })
    }

    drop();

})


boxArray = [];

//using for loop because i already know i want 5 boxes
for(i=0; i<5; i++) {
    boxArray.push(
        paper.rect((dimX/6*(i+1))-50, (dimY/8)*6, cardWidth, cardHeight, 10).attr({
            "fill" : "white",
        })
    )
}

boxArray[0].node.addEventListener('mousedown', function(){
    console.log("mousedown on box")
    state = 1;
})

boxArray[0].node.addEventListener('mouseup', function(){
    console.log("mouseup on box")
    state = 0;
})

var state = 0;

let cardExit = boxArray[0].node.addEventListener('click',function(move){
    move.preventDefault();
    if (boxArray[0].attr({"fill" : "pink"})) {
        boxArray[0].attr({"fill" : "white"});
        paper.rect((dimX/6)-50, (dimY/8)*6, cardWidth, cardHeight, 10).attr({
            "fill" : "blue",
        })
    } else {
        boxArray[0].attr({"fill" : "white"})
    }
})


// //set the card to be horizontal center, and towards the top
// let card = paper.rect((dimX/2)-50, dimY/8, cardWidth, cardHeight, 10).attr({
//     "fill" : "black"
// })


// card.node.addEventListener('mousedown', function(){
//     console.log("mousedown on card")
//     state = 1;
// })

// card.node.addEventListener('mouseup', function(){
//     console.log("mouseup on card")
//     state = 0;
// })

// var state = 0;

// let cardMove = card.node.addEventListener('mousemove', function(move){
//     if (state === 1) {
//         card.attr({
//             "x" : move.offsetX - (cardWidth/2), //to ensure that the movement corresponds to the centre of rect rather than the top left corner
//             "y" : move.offsetY - (cardHeight/2), //to ensure that the movement corresponds to the centre of rect rather than the top left corner
//         })
//     }

//     drop();
// })

//to ensure that card still moves even if mouse move is fast
bg.node.addEventListener('click', function(move){
    if (state === 1) {
        card.attr({
            "x" : move.offsetX - (cardWidth/2), //to ensure that the movement corresponds to the centre of rect rather than the top left corner
            "y" : move.offsetY - (cardHeight/2), //to ensure that the movement corresponds to the centre of rect rather than the top left corner
        })
    }
})

let drop = function(){    
        
    if (cardStack[4].attrs.y > 550 && cardStack[4].attrs.x < 250) {
        cardStack[4].remove();
        boxArray[0].attr({"fill" : "pink"});
    };

    // if (cardStack[4].attrs.y > 550 && cardStack[4].attrs.x > 250 && cardStack[4].attrs.x < 417) {
    //     cardStack[4].remove();
    //     boxArray[1].attr({"fill" : "black"});
    // };

    // if (cardStack[4].attrs.y > 550 && cardStack[4].attrs.x > 417 && cardStack[4].attrs.x < 584) {
    //     cardStack[4].remove();
    //     boxArray[2].attr({"fill" : "black"});
    // };

    // if (cardStack[4].attrs.y > 550 && cardStack[4].attrs.x > 584 && cardStack[4].attrs.x < 751) {
    //     cardStack[4].remove();
    //     boxArray[3].attr({"fill" : "black"});
    // };

    // if (cardStack[4].attrs.y > 550 && cardStack[4].attrs.x > 751) {
    //     cardStack[4].remove();
    //     boxArray[4].attr({"fill" : "black"});
    // };

    console.log("hi")
}


// let drop = function(){    
        
//     if (card.attrs.y > 550 && card.attrs.x < 250) {
//         card.remove();
//         boxArray[0].attr({"fill" : "black"});
//     };

//     if (card.attrs.y > 550 && card.attrs.x > 250 && card.attrs.x < 417) {
//         card.remove();
//         boxArray[1].attr({"fill" : "black"});
//     };

//     if (card.attrs.y > 550 && card.attrs.x > 417 && card.attrs.x < 584) {
//         card.remove();
//         boxArray[2].attr({"fill" : "black"});
//     };

//     if (card.attrs.y > 550 && card.attrs.x > 584 && card.attrs.x < 751) {
//         card.remove();
//         boxArray[3].attr({"fill" : "black"});
//     };

//     if (card.attrs.y > 550 && card.attrs.x > 751) {
//         card.remove();
//         boxArray[4].attr({"fill" : "black"});
//     };

//     console.log("hi")
// }







