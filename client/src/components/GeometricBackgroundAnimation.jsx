import React, {useEffect, useRef} from 'react';
const svgNS = 'http://www.w3.org/2000/svg';
const rand = (min, max) => (min + Math.floor(Math.random() * (max - min + 1)));
const palette = ['#f07', '#0cf', '#0f7', '#fff'];

const GenerativePattern = (svg, color = '#fff') => {
    let path;
    let pathDef = '';
    let x, y, xDir, yDir;

    const pathStyle = {fill: 'none', stroke: color};

    const setRandomPosition = () => {
        x = rand(0, window.innerWidth);
        y = rand(0, window.innerHeight);
    };

    const setRandomDirection = () => {
        xDir = Math.random() < .5 ? -5 : 5;
        yDir = Math.random() < .5 ? -5 : 5;
    };

    const step = () => {
        if (Math.random() < .8) {
            pathDef += `M${x} ${y} l${-xDir * 50} ${yDir * 50}`;
            x += xDir;
            y += yDir;
        }
        if (!path) {
            path = create(svg, 'path', pathStyle);
        }
        if (Math.random() < .05) {
            setRandomDirection();
        }
        if (Math.random() < .1) {
            setRandomPosition();
        }
        if (pathDef.length > 800 && Math.random() < .8) {
            pathDef = pathDef.slice(pathDef.indexOf('M', 1));
        }
        path.setAttribute('d', pathDef);
    };

    setRandomPosition();
    setRandomDirection();

    return {step};
};

function create(svg, tag, attrs) {
    const el = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([key, value]) => {
        el.setAttribute(key, value);
    });
    svg.appendChild(el);
    return el;
}

const GeometricBackgroundAnimation = () => {
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = svgRef.current;
        const setSize = () => {
            svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
        };

        const patterns = palette.map(color => GenerativePattern(svg, color));

        const loop = () => {
            patterns.forEach(p => p.step());
            window.setTimeout(() => requestAnimationFrame(loop), 100);
        };

        setSize();
        window.addEventListener('resize', setSize);
        requestAnimationFrame(loop);

        return () => window.removeEventListener('resize', setSize);
    }, []);

    return <svg ref={svgRef} />;
};

export default GeometricBackgroundAnimation;
