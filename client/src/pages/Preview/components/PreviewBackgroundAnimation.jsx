import React, {useRef, useEffect} from 'react';

const PreviewBackgroundAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const c = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Define Triangle and Particle classes inside the useEffect
        class Triangle {
            constructor() {
                this.y = Math.floor(Math.random() * canvas.height);
                this.x = Math.random() * Math.PI * 2;
                this.vx = parseFloat((Math.random() * 0.0005).toFixed(4));
                this.color = `rgba(150, 150, 150, ${Math.random().toFixed(2)})`;
                this.vertices = [-10 + Math.random() * 20, -10 + Math.random() * 20,
                -10 + Math.random() * 20, -10 + Math.random() * 20,
                -10 + Math.random() * 20, -10 + Math.random() * 20];
            }

            draw() {
                if (this.y + 10 < 0) this.y = canvas.height + 10;
                this.x += this.vx;
                this.y -= 0.3;
                let sizeFactor = 0.5 + (Math.sin(this.x) + 1) / 2;

                c.beginPath();
                c.moveTo(Math.cos(this.x) * radiusX + (canvas.width / 2) + this.vertices[0] * sizeFactor, this.y + this.vertices[1] * sizeFactor);
                c.lineTo(Math.cos(this.x) * radiusX + (canvas.width / 2) + this.vertices[2] * sizeFactor, this.y + this.vertices[3] * sizeFactor);
                c.lineTo(Math.cos(this.x) * radiusX + (canvas.width / 2) + this.vertices[4] * sizeFactor, this.y + this.vertices[5] * sizeFactor);
                c.closePath();
                c.fillStyle = this.color;
                c.fill();
            }
        }

        class Particle {
            constructor() {
                this.y = Math.floor(Math.random() * canvas.height);
                this.x = Math.random() * Math.PI * 2;
                this.color = `rgba(200, 200, 200, ${Math.random().toFixed(2)})`;
            }

            draw() {
                if (this.y < 0) this.y = canvas.height + 50;
                this.x -= 0.0003;
                this.y -= 0.5;
                let sizeFactor = 0.5 + (Math.sin(this.x) + 1) / 2;
                c.fillStyle = this.color;
                c.fillRect(canvas.width / 2 + Math.cos(this.x) * (canvas.width / 1.9), this.y, 1 * sizeFactor, 1 * sizeFactor);
            }
        }

        let triangles = [];
        let particles = [];
        const triangleNum = 700;
        const particleNum = 800;
        let radiusX = canvas.width / 1.7;
        let radiusY = canvas.height / 2;

        function initObject(Object, objectNum, objectArray) {
            for (let i = 0; i < objectNum; i++) {
                objectArray.push(new Object());
            }
        }

        function drawObject(objectArray) {
            objectArray.forEach(obj => obj.draw());
        }

        function animate() {
            requestAnimationFrame(animate);
            c.clearRect(0, 0, canvas.width, canvas.height);
            drawObject(triangles);
            drawObject(particles);
        }

        initObject(Triangle, triangleNum, triangles);
        initObject(Particle, particleNum, particles);
        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            radiusX = canvas.width / 1.7;
            radiusY = canvas.height / 2;
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures this effect runs once on mount

    return <canvas ref={canvasRef} style={{backgroundColor: 'rgb(20,20,20)'}}></canvas>;
};

export default PreviewBackgroundAnimation;
