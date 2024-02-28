// AnimationBackground.js

import React, {useEffect} from 'react';
import './LightBarBackground.css'; // Import the CSS styles

const LightBarBackground = () => {
    // useEffect(() => {
    //     const canvas = document.getElementById('anim');
    //     const ctx = canvas.getContext('2d');

    //     // Set the canvas size to fill the window
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;

    //     // Animation logic goes here
    //     // For demonstration, let's draw a simple animated circle
    //     // let x = canvas.width / 2;
    //     // let y = canvas.height / 2;
    //     // let dx = 2;
    //     // let dy = 2;
    //     // let radius = 30;

    //     function animate() {
    //         requestAnimationFrame(animate);
    //         ctx.clearRect(0, 0, canvas.width, canvas.height);
    //         ctx.beginPath();
    //         ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    //         ctx.fillStyle = 'white';
    //         ctx.fill();
    //         if (x + radius > canvas.width || x - radius < 0) {
    //             dx = -dx;
    //         }
    //         if (y + radius > canvas.height || y - radius < 0) {
    //             dy = -dy;
    //         }
    //         x += dx;
    //         y += dy;
    //     }

    //     animate();
    // }, []);

    return (
        <div className="main">
            <div className="lightBar"></div>
            <canvas id="anim"></canvas>
        </div>
    );
};

export default LightBarBackground;
