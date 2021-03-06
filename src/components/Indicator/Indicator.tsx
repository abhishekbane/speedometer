import { useEffect, useRef, useState } from 'react';

import { Arc } from './IndicatorUtility';

interface IIndicatorProps {
    radius: number;
    size: number;
    arcStartRad: number;
    arcEndRad: number;
    low: number;
    high: number;
    value: number;
    width: number;
}

const Indicator = (props: IIndicatorProps) => {
    const canvasRef = useRef(null)  as React.RefObject<HTMLCanvasElement>;
    const [context, setContext] = useState({} as CanvasRenderingContext2D);
    const [canvas, setCanvas] = useState({} as HTMLCanvasElement);

    let arc = useRef(new Arc()).current as Arc;

    useEffect(() => {
        const _canvas = canvasRef.current
        let _context: CanvasRenderingContext2D | null;
        if(_canvas) {
            _canvas.style.width = props.size + "px";
            _canvas.style.height = props.size + "px";
            
            var scale = window.devicePixelRatio + 0.5 || 1;
            _canvas.width = Math.floor(props.size * scale);
            _canvas.height = Math.floor(props.size * scale);
            setCanvas(_canvas);

            _context = _canvas.getContext('2d');

            if(_context) {
                const center = props.size/2;
                _context.scale(scale, scale);
                arc.radius = props.radius;
                arc.width = props.width;
                arc.context = _context;
                arc.x = center;
                arc.y = center;
                arc.arcEndRad = props.arcEndRad;
                arc.arcStartRad = props.arcStartRad;
                arc.angleRad = props.arcStartRad;
                arc.startX = center+props.radius*Math.cos(props.arcStartRad);
                arc.startY = center+props.radius*Math.sin(props.arcStartRad);
                arc.low = props.low;
                setContext(_context);
            }
        }
    }, [props.size, props.radius, props.arcEndRad, props.arcStartRad, props.width, props.low]);

    useEffect(() => {
        if(context) {
            arc.indicatorEnd = props.value;
        }
    },[props.value]);

    useEffect(() => {
        arc.update();
    },[]);
    
    return (
        <canvas ref={canvasRef} id="canvasIndicator">

        </canvas>
    );
};

export default Indicator;

