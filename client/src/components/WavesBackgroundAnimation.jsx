// // FullPageCanvas.js

// import React, {useEffect} from 'react';
// import './WavesBackgroundAnimation.css'; // Importing the CSS

// const WavesBackgroundAnimation = () => {
//     useEffect(() => {
//         const canvas = document.querySelector('canvas');
//         const context = canvas.getContext('2d');
//         let lines = [];
//         let colorIndex = -1;
//         let step = 0;

//         const colors = [
//             ['#4f3a4b', '#e55256'],
//             ['#fff', '#111'],
//             ['#e37169', '#26282a'],
//             ['#eed87b', '#28292b'],
//             ['#0d5b5c', '#e6e6e6'],
//             ['#d4e8e1', '#e24c68'],
//             ['#fbfc65', '#1666bd'],
//             ['#f3c8ed', '#1790d0'],
//             ['#111', '#fff']
//         ];

//         function setup() {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;

//             const width = canvas.width;
//             const height = canvas.height;
//             lines = [];

//             let lineCount = height / 26;
//             let pointCount = 14;
//             let spacingH = width / pointCount;
//             let spacingV = height / lineCount;

//             for (let v = 0; v < lineCount; v++) {
//                 let line = {points: [], ran: 0.2 + Math.random() * 0.7};

//                 for (let h = 0; h <= pointCount; h++) {
//                     line.points.push({
//                         nx: h * spacingH,
//                         ny: v * spacingV
//                     });
//                 }

//                 lines.push(line);
//             }
//         }

//         function color() {
//             colorIndex = (++colorIndex) % colors.length;
//             canvas.style.backgroundColor = colors[colorIndex][0];
//         }

//         function update() {
//             step += 0.8;

//             context.clearRect(0, 0, canvas.width, canvas.height);

//             context.lineWidth = 2;
//             context.strokeStyle = colors[colorIndex][1];
//             context.fillStyle = colors[colorIndex][0];

//             lines.forEach(line => {
//                 context.beginPath();

//                 line.points.forEach((point, h) => {
//                     point.x = point.nx;
//                     point.y = point.ny + Math.sin((point.x * line.ran + (step + point.ny)) / 40) * (6 + (point.ny / canvas.height * 34));

//                     let nextPoint = line.points[h + 1];
//                     if (h === 0) {
//                         context.moveTo(point.x, point.y);
//                     } else if (nextPoint) {
//                         let cpx = point.x + (nextPoint.x - point.x) / 2;
//                         let cpy = point.y + (nextPoint.y - point.y) / 2;
//                         context.quadraticCurveTo(point.x, point.y, cpx, cpy);
//                     }
//                 });

//                 context.stroke();
//                 context.lineTo(canvas.width, canvas.height);
//                 context.lineTo(0, canvas.height);
//                 context.closePath();
//                 context.fill();
//             });

//             requestAnimationFrame(update);
//         }

//         // Initialize and bind events
//         setup();
//         color();
//         update();

//         // Event listeners for resize and interaction
//         window.onresize = setup;
//         document.ontouchstart = color;
//         document.onmousedown = color;

//         // Cleanup function
//         return () => {
//             window.onresize = null;
//             document.ontouchstart = null;
//             document.onmousedown = null;
//         };
//     }, []);

//     return <canvas style={{display: 'block'}}></canvas>;
// };

// export default WavesBackgroundAnimation;
