
import { drawScale } from './ScaleUtility';

import styles from 'Scale.module.css';
import { useEffect, useRef } from 'react';

interface IScaleProps {
    radius: number;
    size: number;
    arcStartRad: number;
    arcEndRad: number;
    low: number;
    high: number;
    arcBedWidth?: number;
    arcBedRadius?: number;
}

const Scale = (props: IScaleProps) => {
    const canvasRef = useRef(null)  as React.RefObject<HTMLCanvasElement>;

    useEffect(() => {
        const canvas = canvasRef.current
        let context: CanvasRenderingContext2D | null;
        if(canvas) {
            canvas.style.width = props.size + "px";
            canvas.style.height = props.size + "px";
            
            const ticks = (props.high-props.low);
            const center = props.size/2;
            
            var scale = window.devicePixelRatio + 0.5 || 1;
            canvas.width = Math.floor(props.size * scale);
            canvas.height = Math.floor(props.size * scale);

            context = canvas.getContext('2d');
            if(context) {
                context.scale(scale, scale);
    
                drawScale(context, props.arcStartRad, props.arcEndRad, ticks, props.radius, center, props.arcBedRadius, props.arcBedWidth);
            }
        }
        
    },[props.arcEndRad, props.arcStartRad, props.radius, props.size, props.high, props.low]);

    return (
        <canvas ref={canvasRef} id="canvasScale">

        </canvas>
    );
};

export default Scale;