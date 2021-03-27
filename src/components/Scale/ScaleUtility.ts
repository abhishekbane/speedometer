import { SECONDARY_COLOUR } from "../../utility/theme";

const drawTick = (context: any, x: number, y: number, x1: number, y1: number) => {
    
	context.moveTo(x, y);
	context.lineTo(x1, y1);
	context.stroke();
}

export const drawScale = (context: any, arcStartRad: number, arcEndRad: number, ticks: number, radius: number, center: number) => {
	let space = (arcEndRad-arcStartRad)/(ticks/2);
	let arcLength = arcStartRad;
	let startOffset = radius - 10;
	let endOffset = radius - 20;
	
	let x;
	let y;
	let x1;
	let y1;
	
	let count = 0;
		
	while(arcLength < arcEndRad) {
		
		context.beginPath();
		if(count%10===0) {
			endOffset = radius - 22;
			startOffset = radius - 8;
			context.font = "15px Arial";
			context.fillStyle = "white";
			context.textAlign = "center";
			context.fillText((count*2).toString(), center+(endOffset-18)*Math.cos(arcLength), center+(endOffset-18)*Math.sin(arcLength));
			context.beginPath();
			
			context.lineWidth = 1.8;
			context.strokeStyle = "white";
		}
		else if(count%5===0) {
			context.lineWidth = 1.8;
			context.strokeStyle = SECONDARY_COLOUR;
			endOffset = radius - 20;
			startOffset = radius - 10;
		}
		else {
			context.lineWidth = 1;
			context.strokeStyle= SECONDARY_COLOUR;
			endOffset = radius - 20;
			startOffset = radius - 10;
		}

		x = center+startOffset*Math.cos(arcLength);
		y = center+startOffset*Math.sin(arcLength);
		x1 = center+endOffset*Math.cos(arcLength);
		y1 = center+endOffset*Math.sin(arcLength);
		
		drawTick(context, x, y, x1, y1);
		
		arcLength += space;
		count++;
	}
}