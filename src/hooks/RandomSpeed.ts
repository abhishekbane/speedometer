import { useState } from "react"

export const useRandomSpeed = (initialSpeed: number, minSpeed: number, maxSpeed: number) => {
    const [speed, setSpeed] = useState(initialSpeed);

    const generateRandomSpeed = () => {
        setInterval(() => {
            setSpeed (prevSpeed => {
                const incSpeed = Math.round(prevSpeed+(Math.random() * maxSpeed/10));
                const decSpeed = Math.round(prevSpeed-(Math.random() * maxSpeed/10));
                const toss = Math.random();
    
                if(toss<0.6 && incSpeed <= maxSpeed){
                    return incSpeed;
                }
                else if(decSpeed >= minSpeed) {
                    return decSpeed;
                }
                else {
                    return speed;
                }
            });
        }, 1000);
    };

    return {speed, generateRandomSpeed};
}