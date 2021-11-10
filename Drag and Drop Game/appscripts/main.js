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

var cardWidth = 100;
var cardHeight = 75;


let resetGameBoard = function() {

        
    let randInt = function(m, n){
        let range = n-m+1;
        let frand = Math.random()*range;
        return m+Math.floor(frand);
    }
    
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
            "cursor": "pointer",
        })
        card.text.attr({
            "font-size" : 15,
            "-webkit-user-select": "none",
            "cursor": "pointer",
            "width": "100px",
            "background-color": "black",
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
        box.value = -1 // means no value
        boxArray.push(box)
    }
    paper.text(boxArray[0].attrs.x + 50, boxArray[0].attrs.y + 110, "Smallest").attr({"font-size" : 20})
    paper.text(boxArray[4].attrs.x + 50, boxArray[0].attrs.y + 110, "Biggest").attr({"font-size" : 20})
}

resetGameBoard()



//-------------------------------------------------------------------------------------------------



let cardMove = function(card){
    card.state = 0;

    card.node.addEventListener('mousedown', function(){
        card.state = 1;
    })

    card.node.addEventListener('mouseup', function(){
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
                checkCompleteGame()
            }
            
        }


        if (card.state === 1 && card.allocated) { //if there is card in box, card can exit
            card.allocated = false
            exitBox(card)        
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
            boxArray[0].allocated = true
            boxArray[0].value = card.text.attrs.text
            return true;
        }

    if (!boxArray[1].allocated && 
        ((card.attrs.y <= boxArray[1].attrs.y + cardHeight + boundary && card.attrs.y + cardHeight >= boxArray[1].attrs.y - boundary) &&
         (card.attrs.x <= boxArray[1].attrs.x + cardWidth + boundary && card.attrs.x + cardWidth >= boxArray[1].attrs.x - boundary))
        ) {
            card.attr({"x" : boxArray[1].attrs.x, "y" : boxArray[1].attrs.y,})
            card.text.attr({"x" : boxArray[1].attrs.x + cardWidth/2, "y" : boxArray[1].attrs.y + cardHeight/2})
            boxArray[1].hide();
            boxArray[1].allocated = true
            boxArray[1].value = card.text.attrs.text
            return true;
        }

     if (!boxArray[2].allocated && 
        ((card.attrs.y <= boxArray[2].attrs.y + cardHeight + boundary && card.attrs.y + cardHeight >= boxArray[2].attrs.y - boundary) &&
         (card.attrs.x <= boxArray[2].attrs.x + cardWidth + boundary && card.attrs.x + cardWidth >= boxArray[2].attrs.x - boundary))
        ) {
            card.attr({"x" : boxArray[2].attrs.x, "y" : boxArray[2].attrs.y,})
            card.text.attr({"x" : boxArray[2].attrs.x + cardWidth/2, "y" : boxArray[2].attrs.y + cardHeight/2})
            boxArray[2].hide();
            boxArray[2].allocated = true
            boxArray[2].value = card.text.attrs.text
            return true;
        }


     if (!boxArray[3].allocated && 
        ((card.attrs.y <= boxArray[3].attrs.y + cardHeight + boundary && card.attrs.y + cardHeight >= boxArray[3].attrs.y - boundary) &&
         (card.attrs.x <= boxArray[3].attrs.x + cardWidth + boundary && card.attrs.x + cardWidth >= boxArray[3].attrs.x - boundary))
        ) {
            card.attr({"x" : boxArray[3].attrs.x, "y" : boxArray[3].attrs.y,})
            card.text.attr({"x" : boxArray[3].attrs.x + cardWidth/2, "y" : boxArray[3].attrs.y + cardHeight/2})
            boxArray[3].hide();
            boxArray[3].allocated = true
            boxArray[3].value = card.text.attrs.text
            return true;
        }


     if (!boxArray[4].allocated && 
        ((card.attrs.y <= boxArray[4].attrs.y + cardHeight + boundary && card.attrs.y + cardHeight >= boxArray[4].attrs.y - boundary) &&
         (card.attrs.x <= boxArray[4].attrs.x + cardWidth + boundary && card.attrs.x + cardWidth >= boxArray[4].attrs.x - boundary))
        ) {
            card.attr({"x" : boxArray[4].attrs.x, "y" : boxArray[4].attrs.y,})
            card.text.attr({"x" : boxArray[4].attrs.x + cardWidth/2, "y" : boxArray[4].attrs.y + cardHeight/2})
            boxArray[4].hide();
            boxArray[4].allocated = true
            boxArray[4].value = card.text.attrs.text
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
            boxArray[0].value = -1
        }

    if (card.attrs.y >= boxArray[1].attrs.y + boundary || card.attrs.y + cardHeight >= boxArray[1].attrs.y + cardHeight + boundary &&
        card.attrs.x <= boxArray[1].attrs.x + boundary || card.attrs.x + cardWidth >= boxArray[1].attrs.x + boundary) {
            boxArray[1].show()
            boxArray[1].allocated = false
            boxArray[1].value = -1
        }

   if (card.attrs.y >= boxArray[2].attrs.y + boundary || card.attrs.y + cardHeight >= boxArray[2].attrs.y + cardHeight + boundary &&
        card.attrs.x <= boxArray[2].attrs.x + boundary || card.attrs.x + cardWidth >= boxArray[2].attrs.x + boundary) {
            boxArray[2].show()
            boxArray[2].allocated = false
            boxArray[2].value = -1
        }

   if (card.attrs.y >= boxArray[3].attrs.y + boundary || card.attrs.y + cardHeight >= boxArray[3].attrs.y + cardHeight + boundary &&
        card.attrs.x <= boxArray[3].attrs.x + boundary || card.attrs.x + cardWidth >= boxArray[3].attrs.x + boundary) {
            boxArray[3].show()
            boxArray[3].allocated = false
            boxArray[3].value = -1
        }

   if (card.attrs.y >= boxArray[4].attrs.y + boundary || card.attrs.y + cardHeight >= boxArray[4].attrs.y + cardHeight + boundary &&
        card.attrs.x <= boxArray[4].attrs.x + boundary || card.attrs.x + cardWidth >= boxArray[4].attrs.x + boundary) {
            boxArray[4].show()
            boxArray[4].allocated = false
            boxArray[4].value = -1
        }

}


function sorted(arr){
    let second_index;
	for(let first_index = 0; first_index < arr.length; first_index++){
  	  second_index = first_index + 1;
      if(arr[second_index] - arr[first_index] < 0) return false;
    }
    return true;
}

//---------------------------------------------------------------------------------------------


let start = function(){
    let timeleft = 20;
    boxValues = boxArray.map(item => parseInt(item.value))

    let gameTime = setInterval(function(){
        timeleft -= 1;

        if(!boxValues.includes(-1)) {
            // if all boxes filled up
            clearInterval(gameTime);
        }
        if(timeleft === 0){
            document.getElementById("countdown").innerHTML = "Time";
            modalText.innerHTML = "Your time is up!"
            modal.style.display = "block";
            clearInterval(gameTime);
        } else {
            document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
            boxValues = boxArray.map(item => parseInt(item.value))
        }
    }, 1000);

    for(i=0; i<5; i++){
        cardMove(cardStack[i]);
    }

}

let startButton = document.getElementById("startbutton")
startButton.addEventListener('click', start)


// Modal Stuffs
modal = document.getElementById("myModal");
modalText = document.getElementById("modal-text");
closeModalBtn = document.getElementsByClassName("close")[0];
closeModalBtn.onclick = function() {
    modal.style.display = "none"
}

let checkCompleteGame = function() {
    boxValues = boxArray.map(item => parseInt(item.value))
    if(boxValues.includes(-1)) {
        //
    } else {
        modal.style.display = "block"
        if(sorted(boxValues)) modalText.innerHTML = "Congrats! You have sorted correctly!"
        else modalText.innerHTML = "Order is wrongly sorted. Please try again!"
    }
}


// restart function
restartBtn = document.getElementById('restart-btn')
restartBtn.addEventListener('click', function() {
    for(i=0; i < cardStack.length; i++ ) {
        cardStack[i].text.remove()
        cardStack[i].remove()
    }
    resetGameBoard()
    modal.style.display = 'none'
    document.getElementById("countdown").innerHTML = "";
})