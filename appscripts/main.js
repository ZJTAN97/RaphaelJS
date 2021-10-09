// main.js
const canvas = new Raphael("mySVGCanvas");
// Find get canvas dimensions
const dimX = canvas.width;
const dimY = canvas.height;

const rectangle = canvas.rect(0, 0, dimX, dimY);
rectangle.attr({
	"fill" : "black"
})

const disk = canvas.circle(dimX/2, dimY/2, 20);
disk.attr({
	"fill" : "green",
})




// initialize start position
disk.xpos = dimX/2;
disk.ypos = dimY/2;
xRate = 10;
yRate = 10;


let dcounter = 0



const draw = function(){

	let nd = canvas.circle(dimX/2, dimY/2, 20);
	nd.xpos = dimX/2;
	nd.ypos = dimY/2;

	nd.xpos += xRate;
	nd.ypos += yRate;


	dcounter++

	disk.xpos += xRate;
	disk.ypos += yRate;

	// console.log("The draw function is called " + dcounter + " times.")
	// console.log("Value of diskxpos is " + disk.xpos + ", value of diskypos is " + disk.ypos)

	if(disk.xpos > dimX || disk.xpos < 0) {
		xRate *= -1;
	} 

	if(disk.ypos > dimY || disk.ypos < 0) {
		yRate *= -1;
	}

	nd.animate({
		"cx": nd.xpos,
		"cy": nd.ypos,
		"fill": "red",
		"opacity": "0.5",
	},1000)


}


setInterval(draw, 50);
