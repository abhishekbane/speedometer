import { useState } from "react"

export const useRandomSpeed = (minSpeed: number, maxSpeed: number, maxStep: number) => {
    const [randSpeed, setSpeed] = useState(minSpeed);

    const generateRandomSpeed = () => {
        setInterval(() => {
            setSpeed (prevSpeed => {
                let _speed;
                const step = maxStep*Math.random();
                const toss = Math.random();
                if(toss<0.6){
                    _speed = prevSpeed + step;
                    if(_speed > maxSpeed) {
                        _speed = prevSpeed - step;
                    }
                    if(_speed<minSpeed) {
                        return prevSpeed;
                    }
                    return Math.round(_speed);
                }
                else {
                    _speed = prevSpeed - step;
                    if(_speed < minSpeed) {
                        _speed = prevSpeed + step;
                    }
                    if(_speed>maxSpeed) {
                        return prevSpeed;
                    }
                    return Math.round(_speed);
                }
                
            });
        }, 1000);
    };

    return {randSpeed, generateRandomSpeed};
}