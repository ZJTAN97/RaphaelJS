
console.log("yo, I'm alive!");


let username = prompt("Please enter your name");
document.getElementById("username").innerHTML = "Hi! " + username;


let paper = new Raphael(document.getElementById("mySVGCanvas"));
// Find get paper dimensions
let dimX = paper.width;
let dimY = paper.height;


let bg = paper.rect(0,0, dimX, dimY).attr({
    "fill" : "bisque",
    "stroke" : "grey",
})


//------------------------------------------------------------------------------------------------


let randInt = function(m, n){
    let range = n-m+1;
    let frand = Math.random()*range;
    return m+Math.floor(frand);
}
console.log(randInt(0, 100));


//--------------------------------------------------------------------------------------------


var cardWidth = 100;
var cardHeight = 75;

// putting the cards in an array
cardStack = [];
colors = ["lightcoral", "lightsalmon", "lightyellow", "lightgreen", "lightblue"]

//using for loop because i already know i want 5 cards
for(i=0; i<5; i++) {
    let card = paper.rect((dimX/6*(i+1))-50, dimY/8, cardWidth, cardHeight, 10);
    let text = paper.text(((dimX/6*(i+1))-50 + cardWidth/2), (dimY/8 + cardHeight/2), randInt(0,100))
    card.text = text 
    card.attr({
        "fill" : colors[i],
    })
    card.text.attr({
        "font-size" : 30,
    })
    card.allocated = false
    cardStack.push(card)
}



//putting the boxes in an array
boxArray = [];

//using for loop because i already know i want 5 boxes
for(i=0; i<5; i++) {
    let box = paper.rect((dimX/6*(i+1))-50, (dimY/8)*6, cardWidth, cardHeight, 10);
    box.attr({
        "fill" : "white",
    })
    box.allocated = false
    boxArray.push(box)
}


let smallText = paper.text(boxArray[0].attrs.x + 50, boxArray[0].attrs.y + 110, "Smallest").attr({"font-size" : 20})
let bigText = paper.text(boxArray[4].attrs.x + 50, boxArray[0].attrs.y + 110, "Biggest").attr({"font-size" : 20})


//-------------------------------------------------------------------------------------------------



let cardMove = function(card){
    card.state = 0;

    card.node.addEventListener('mousedown', function(){
        console.log("mousedown on card")
        card.state = 1;
    })

    card.node.addEventListener('mouseup', function(){
        console.log("mouseup on card")
        card.state = 0;
    })

    card.node.addEventListener('mousemove', function(move){
        if (card.state === 1 && !card.allocated) { //when card not in a box
            card.attr({
                "x" : move.offsetX - (cardWidth*3/4), 
                "y" : move.offsetY - (cardHeight*3/4),
            })
            card.text.attr({
                "x" : card.attrs.x + (cardWidth/2),
                "y" : card.attrs.y + (cardHeight/2),
            })

            if (enterBox(card)) { //after card enters box
                card.allocated = true;
                card.state = 0;
            }
        }


        // if (card.allocated = true ) { //if card allocated is true, STOP ENTERBOX FROM HAPPENING --> HOW SIA? 
        //     !enterBox(card)
        // }


        if (card.state === 1 && card.allocated) { //if there is card in box, card can exit
            console.log("dragging from allocated card")
            card.attr({
                "x" : move.offsetX - (cardWidth*3/4), 
                "y" : move.offsetY - (cardHeight*3/4)
            })
            card.text.attr({
                "x" : card.attrs.x + (cardWidth/2),
                "y" : card.attrs.y + (cardHeight/2),
            })
            exitBox(card)               //CARD IS CURRENTLY NOT EXITING, NEED TO FIGURE OUT WHY
            console.log("is this working")
            console.log(card.state)
            card.allocated = false
        }  
    })

    bg.node.addEventListener('mousemove', function(move){
        if (card.state === 1) {
            card.attr({
                    "x" : move.offsetX - (cardWidth/2), 
                    "y" : move.offsetY - (cardHeight/2),
                })
            card.text.attr({
                "x" : move.offsetX, 
                "y" : move.offsetY,
            })
        }
    })
}

let enterBox = function(card){
    let boundary = 5;

    if (!boxArray[0].allocated && 
        ((card.attrs.y <= boxArray[0].attrs.y + cardHeight + boundary && card.attrs.y + cardHeight >= boxArray[0].attrs.y - boundary) &&
         (card.attrs.x <= boxArray[0].attrs.x + cardWidth + boundary && card.attrs.x + cardWidth >= boxArray[0].attrs.x - boundary))
        ) {
            card.attr({"x" : boxArray[0].attrs.x, "y" : boxArray[0].attrs.y,})
            card.text.attr({"x" : boxArray[0].attrs.x + cardWidth/2, "y" : boxArray[0].attrs.y + cardHeight/2})
            boxArray[0].hide();
            return true;
        }

    if (!boxArray[1].allocated && 
        ((card.attrs.y <= boxArray[1].attrs.y + cardHeight + boundary && card.attrs.y + cardHeight >= boxArray[1].attrs.y - boundary) &&
         (card.attrs.x <= boxArray[1].attrs.x + cardWidth + boundary && card.attrs.x + cardWidth >= boxArray[1].attrs.x - boundary))
        ) {
            card.attr({"x" : boxArray[1].attrs.x, "y" : boxArray[1].attrs.y,})
            card.text.attr({"x" : boxArray[1].attrs.x + cardWidth/2, "y" : boxArray[1].attrs.y + cardHeight/2})
            boxArray[1].hide();
            return true;
        }

     if (!boxArray[2].allocated && 
        ((card.attrs.y <= boxArray[2].attrs.y + cardHeight + boundary && card.attrs.y + cardHeight >= boxArray[2].attrs.y - boundary) &&
         (card.attrs.x <= boxArray[2].attrs.x + cardWidth + boundary && card.attrs.x + cardWidth >= boxArray[2].attrs.x - boundary))
        ) {
            card.attr({"x" : boxArray[2].attrs.x, "y" : boxArray[2].attrs.y,})
            card.text.attr({"x" : boxArray[2].attrs.x + cardWidth/2, "y" : boxArray[2].attrs.y + cardHeight/2})
            boxArray[2].hide();
            return true;
        }


     if (!boxArray[3].allocated && 
        ((card.attrs.y <= boxArray[3].attrs.y + cardHeight + boundary && card.attrs.y + cardHeight >= boxArray[3].attrs.y - boundary) &&
         (card.attrs.x <= boxArray[3].attrs.x + cardWidth + boundary && card.attrs.x + cardWidth >= boxArray[3].attrs.x - boundary))
        ) {
            card.attr({"x" : boxArray[3].attrs.x, "y" : boxArray[3].attrs.y,})
            card.text.attr({"x" : boxArray[3].attrs.x + cardWidth/2, "y" : boxArray[3].attrs.y + cardHeight/2})
            boxArray[3].hide();
            return true;
        }


     if (!boxArray[4].allocated && 
        ((card.attrs.y <= boxArray[4].attrs.y + cardHeight + boundary && card.attrs.y + cardHeight >= boxArray[4].attrs.y - boundary) &&
         (card.attrs.x <= boxArray[4].attrs.x + cardWidth + boundary && card.attrs.x + cardWidth >= boxArray[4].attrs.x - boundary))
        ) {
            card.attr({"x" : boxArray[4].attrs.x, "y" : boxArray[4].attrs.y,})
            card.text.attr({"x" : boxArray[4].attrs.x + cardWidth/2, "y" : boxArray[4].attrs.y + cardHeight/2})
            boxArray[4].hide();
            return true;
        }
         
    return false;

}


let exitBox = function(card){
    let boundary = 10;


    if (card.attrs.y >= boxArray[0].attrs.y + boundary || card.attrs.y + cardHeight >= boxArray[0].attrs.y + cardHeight + boundary &&
        card.attrs.x <= boxArray[0].attrs.x + boundary || card.attrs.x + cardWidth >= boxArray[0].attrs.x + boundary) {
            boxArray[0].show()
            boxArray[0].allocated = false
        }

    if (card.attrs.y >= boxArray[1].attrs.y + boundary || card.attrs.y + cardHeight >= boxArray[1].attrs.y + cardHeight + boundary &&
        card.attrs.x <= boxArray[1].attrs.x + boundary || card.attrs.x + cardWidth >= boxArray[1].attrs.x + boundary) {
            boxArray[1].show()
            boxArray[1].allocated = false
        }

   if (card.attrs.y >= boxArray[2].attrs.y + boundary || card.attrs.y + cardHeight >= boxArray[2].attrs.y + cardHeight + boundary &&
        card.attrs.x <= boxArray[2].attrs.x + boundary || card.attrs.x + cardWidth >= boxArray[2].attrs.x + boundary) {
            boxArray[2].show()
            boxArray[2].allocated = false
        }

   if (card.attrs.y >= boxArray[3].attrs.y + boundary || card.attrs.y + cardHeight >= boxArray[3].attrs.y + cardHeight + boundary &&
        card.attrs.x <= boxArray[3].attrs.x + boundary || card.attrs.x + cardWidth >= boxArray[3].attrs.x + boundary) {
            boxArray[3].show()
            boxArray[3].allocated = false
        }

   if (card.attrs.y >= boxArray[4].attrs.y + boundary || card.attrs.y + cardHeight >= boxArray[4].attrs.y + cardHeight + boundary &&
        card.attrs.x <= boxArray[4].attrs.x + boundary || card.attrs.x + cardWidth >= boxArray[4].attrs.x + boundary) {
            boxArray[4].show()
            boxArray[4].allocated = false
        }

}


for(i=0; i<5; i++){
    cardMove(cardStack[i]);
}


//---------------------------------------------------------------------------------------------


// let start = function(){
//     console.log("Game is starting.");

//     var timeleft = 20;
//     var gameTime = setInterval(function(){
//         if(timeleft < 0){
//             clearInterval(gameTime);
//             document.getElementById("countdown").innerHTML = "Time";
//             alert("Time is up!")
//         } else {
//             document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
//         }
//         timeleft -= 1;
//     }, 1000);

//     for(i=0; i<5; i++){
//         cardMove(cardStack[i]);
//     }

// }

let startButton = document.getElementById("startbutton")
startButton.addEventListener('click', start)














