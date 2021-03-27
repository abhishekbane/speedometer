import { BASE_COLOUR_LIGHT, METER_BLUR, SECONDARY_COLOUR } from "../../utility/theme";

const drawTick = (context: any, x: number, y: number, x1: number, y1: number) => {
    
	context.moveTo(x, y);
	context.lineTo(x1, y1);
	context.stroke();
}

export const drawScale = (
    context: CanvasRenderingContext2D, 
    arcStartRad: number, 
    arcEndRad: number, 
    ticks: number, 
    radius: number, 
    center: number, 
    arcBedRadius?: number,
    arcBedWidth?: number) => {
        
	let space = (arcEndRad-arcStartRad)/(ticks/2);
	let arcLength = arcStartRad;
	let startOffset = radius - 10;
	let endOffset = radius - 20;
	
	let x;
	let y;
	let x1;
	let y1;
	
	let count = 0;
    
    //draw the arc bed which shows the path of the speed indicator
    if(arcBedWidth && arcBedRadius) {
        context.beginPath();
        context.lineWidth = arcBedWidth;
        context.arc(center, center, arcBedRadius, arcStartRad, arcEndRad, false);
        context.strokeStyle=BASE_COLOUR_LIGHT;
        context.stroke();
        
        context.beginPath();
        context.lineWidth = 1;
        context.fillStyle = BASE_COLOUR_LIGHT;
        context.arc(center+arcBedRadius*Math.cos(arcStartRad), center+arcBedRadius*Math.sin(arcStartRad), 4, 0, Math.PI*2);
        context.stroke();
        context.fillStyle = BASE_COLOUR_LIGHT;
        context.fill();

        context.beginPath();
        context.lineWidth = 1;
        context.arc(center+arcBedRadius*Math.cos(arcEndRad), center+arcBedRadius*Math.sin(arcEndRad), 4, 0, Math.PI*2);
        context.stroke();
        context.fillStyle = BASE_COLOUR_LIGHT;
        context.fill();
    }

	while(arcLength < arcEndRad) {

		context.beginPath();
		if(count%10===0) {
			endOffset = radius - 22;
			startOffset = radius - 8;
			context.font = "15px Arial";
			context.fillStyle = "white";
			context.textAlign = "center";
            context.shadowBlur = 0;

            if(radius>150 || (radius<151 && (count%20===0)) ) {
                context.fillText((count*2).toString(), center+(endOffset-18)*Math.cos(arcLength), center+(endOffset-18)*Math.sin(arcLength));
                context.beginPath();
            }
			
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

        context.shadowBlur = METER_BLUR;
        context.shadowColor = SECONDARY_COLOUR;

		x = center+startOffset*Math.cos(arcLength);
		y = center+startOffset*Math.sin(arcLength);
		x1 = center+endOffset*Math.cos(arcLength);
		y1 = center+endOffset*Math.sin(arcLength);
		
		drawTick(context, x, y, x1, y1);
		
		arcLength += space;
		count++;
	}
}