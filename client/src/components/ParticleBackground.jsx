import React from 'react';
import Particles from 'react-tsparticles';
import particlesConfig from './particlesConfig';

const ParticleBackground = () => {
    return (
        <Particles
            id="tsparticles"
            options={particlesConfig}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
            }}
        />
    );
};

export default ParticleBackground;
