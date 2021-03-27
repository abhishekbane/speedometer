import { ACCENT_COLOUR, BASE_COLOUR, SECONDARY_COLOUR } from "../../utility/theme";

interface IArc {
    x: number; 
    y: number; 
    width: number; 
    radius: number; 
    fill: string;
    angleRad: number;
}

export class Arc {
    public context: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
    public arcStartRad: number = 0;
    public arcEndRad: number = 0; 
    public indicatorEnd: number = 0; 
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public radius: number = 0;
    public angleRad: number = 0;
    public startX: number = 0;
    public startY: number = 0;
    public fullRad: number = Math.PI*2;

    public lead: IArc = {    
        x: this.x+this.radius*Math.cos(this.arcStartRad),
        y: this.y+this.radius*Math.sin(this.arcStartRad),
        radius: 5,
        width: 1,
        fill: ACCENT_COLOUR,
        angleRad: this.fullRad
    };

    drawLead = (lead: IArc) => {
        this.context.beginPath();
        this.context.shadowBlur = 0;
        this.context.lineWidth = lead.width;
        
        this.context.arc(lead.x, lead.y, lead.radius, 0, lead.angleRad);
    
        this.context.stroke();
    
        this.context.fillStyle = lead.fill;
        this.context.fill();
    }

    drawArc() {
        this.context.beginPath();
        this.context.shadowBlur = 10;
        this.context.shadowColor = SECONDARY_COLOUR;
        this.context.lineWidth = this.width;
        this.context.arc(this.x, this.y, this.radius, this.arcStartRad, this.angleRad, false);
        this.context.strokeStyle=SECONDARY_COLOUR;
        this.context.stroke();
    }

    update() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        this.drawLead({
            x: this.startX,
            y: this.startY,
            radius: 4,
            width: 1,
            fill: SECONDARY_COLOUR,
            angleRad: this.fullRad
        });
        
        this.drawArc();
        if(this.lead.x !== this.lead.y) {   
            this.drawLead(this.lead);
        }

        this.angleRad = +this.angleRad.toFixed(2);

        if(this.angleRad < this.indicatorEnd && this.indicatorEnd>=this.arcStartRad && this.indicatorEnd<=this.arcEndRad){
            const space = +((this.indicatorEnd-this.angleRad)/5).toFixed(2);
            this.angleRad += space;
            this.lead.x = this.x+this.radius*Math.cos(this.angleRad);
            this.lead.y = this.y+this.radius*Math.sin(this.angleRad);
        }
        else if(this.angleRad > this.indicatorEnd  && this.indicatorEnd>=this.arcStartRad && this.indicatorEnd<=this.arcEndRad) {
            const space = +((this.angleRad-this.indicatorEnd)/5).toFixed(2);
            this.angleRad -= space;
            this.lead.x = this.x+this.radius*Math.cos(this.angleRad);
            this.lead.y = this.y+this.radius*Math.sin(this.angleRad);
        }
        
        requestAnimationFrame(this.update.bind(this));
    }

}