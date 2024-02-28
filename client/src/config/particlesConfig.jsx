import {useColorModeValue} from "@chakra-ui/react";
export const particlesConfig1 = {
    particles: {
        number: {
            value: 99,
            density: {enable: true, value_area: 800}
        },
        color: {value: "#6900ff"},
        shape: {
            type: "circle",
            stroke: {width: 0, color: "#000000"},
            polygon: {nb_sides: 8},
            image: {src: "img/github.svg", width: 100, height: 100}
        },
        opacity: {
            value: 0.72, random: false, anim: {enable: false, speed: 1, opacity_min: 0.1, sync: false}
        },
        size: {
            value: 3, random: true, anim: {enable: false, speed: 40, size_min: 0.1, sync: false}
        },
        line_linked: {
            enable: true, distance: 157.82952832645452, color: "#d8acff", opacity: 0.4, width: 1
        },
        move: {
            enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, attract: {enable: false, rotateX: 600, rotateY: 1200}
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {enable: false, mode: "repulse"},
            onclick: {enable: false, mode: "push"},
            resize: true
        },
        modes: {
            grab: {distance: 400, line_linked: {opacity: 1}},
            bubble: {distance: 400, size: 40, duration: 2, opacity: 8, speed: 3},
            repulse: {distance: 200, duration: 0.4},
            push: {particles_nb: 4},
            remove: {particles_nb: 2}
        }
    },
    retina_detect: false
}


export const particlesConfig2 = {
    particles: {
        number: {
            value: 100
        },
        color: {
            value: "#ffffff"
        },
        links: {
            enable: true,
            distance: 200
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 1
        },
        size: {
            value: {
                min: 4,
                max: 6
            }
        },
        move: {
            enable: true,
            speed: 2
        }
    },
    background: {
        color: "#000000"
    },
    poisson: {
        enable: true
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {enable: false, mode: "repulse"},
            onclick: {enable: false, mode: "push"},
            resize: true
        }
    },
    retina_detect: true
};


export const particlesConfig3 = (colorValue, linksColor, bgColor) => ({



    fullScreen: {
        enable: true
    },
    background: {
        color: bgColor
    },
    particles: {
        color: {
            value: colorValue
        },
        links: {
            enable: true,
            color: linksColor,
            distance: 200
        },
        move: {
            enable: true
        },
        number: {
            value: 80,
            // density: {enable: true, value_area: 200}
        },
        opacity: {
            value: {min: 0.3, max: 1}
        },
        shape: {
            type: ["circle", "square", "triangle", "polygon"],
            options: {
                polygon: [
                    {
                        sides: 5
                    },
                    {
                        sides: 6
                    },
                    {
                        sides: 8
                    }
                ]
            }
        },
        size: {
            value: {min: 1, max: 3}
        }
    }

});


export const particlesConfig4 = {
    fpsLimit: 60,
    fullScreen: {enable: true},
    particles: {
        number: {
            value: 50
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5
        },
        size: {
            value: 400,
            random: {
                enable: true,
                minimumValue: 200
            }
        },
        move: {
            enable: true,
            speed: 10,
            direction: "top",
            outModes: {
                default: "out",
                top: "destroy",
                bottom: "none"
            }
        }
    },
    interactivity: {
        detectsOn: "canvas",
        events: {
            resize: true
        }
    },
    detectRetina: true,
    themes: [
        {
            name: "light",
            default: {
                value: true,
                mode: "light"
            },
            options: {
                background: {
                    color: "#f7f8ef"
                },
                particles: {
                    color: {
                        value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"]
                    }
                }
            }
        },
        {
            name: "dark",
            default: {
                value: true,
                mode: "dark"
            },
            options: {
                background: {
                    color: "#080710"
                },
                particles: {
                    color: {
                        value: ["#004f74", "#5f5800", "#245100", "#7d0000", "#810c00"]
                    }
                }
            }
        }
    ],
    emitters: {
        direction: "top",
        position: {
            x: 50,
            y: 150
        },
        rate: {
            delay: 0.2,
            quantity: 2
        },
        size: {
            width: 100,
            height: 0
        }
    }
}



export const particlesConfig5 = {
    particles: {
        stroke: {
            width: 5,
            color: {
                value: [
                    "#5bc0eb",
                    "#fde74c",
                    "#9bc53d",
                    "#e55934",
                    "#fa7921",
                    "#2FF3E0",
                    "#F8D210",
                    "#FA26A0",
                    "#F51720"
                ]
            }
        },
        shape: {
            type: "square",
            options: {
                square: {
                    fill: false
                }
            }
        },
        rotate: {
            value: 0,
            direction: "counter-clockwise",
            animation: {
                enable: true,
                speed: 2,
                sync: true
            }
        },
        size: {
            value: {min: 1, max: 500},
            animation: {
                enable: true,
                startValue: "min",
                speed: 60,
                sync: true,
                destroy: "max"
            }
        }
    },

    emitters: {
        direction: "top",
        position: {
            y: 50,
            x: 50
        },
        rate: {
            delay: 1,
            quantity: 1
        }
    }
};

export const particlesConfig6 = {
    particles: {
        color: {
            value: "#FF0000",
            animation: {
                enable: true,
                speed: 10
            }
        },
        effect: {
            type: "trail",
            options: {
                trail: {
                    length: 50,
                    minWidth: 4
                }
            }
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "destroy"
            },
            path: {
                clamp: false,
                enable: true,
                delay: {
                    value: 0
                },
                generator: "polygonPathGenerator",
                options: {
                    sides: 6,
                    turnSteps: 30,
                    angle: 30
                }
            },
            random: false,
            speed: 3,
            straight: false
        },
        number: {
            value: 0
        },
        opacity: {
            value: 1
        },
        shape: {
            type: "circle"
        },
        size: {
            value: 2
        }
    },
    background: {
        color: "#000"
    },
    fullScreen: {
        zIndex: -1
    },
    emitters: {
        direction: "none",
        rate: {
            quantity: 1,
            delay: 0.25
        },
        size: {
            width: 0,
            height: 0
        },
        position: {
            x: 50,
            y: 50
        }
    }
}

export const particlesConfig7 = (bgColor, linksColor, particlesColor) => ({
    "autoPlay": true,
    "background": {
        "color": {
            "value": bgColor
        },
        "image": "",
        "position": "",
        "repeat": "",
        "size": "",
        "opacity": 1
    },
    "backgroundMask": {
        "composite": "destination-out",
        "cover": {
            "color": {
                "value": "#fff"
            },
            "opacity": 1
        },
        "enable": false
    },
    "clear": true,
    "defaultThemes": {},
    "delay": 0,
    "fullScreen": {
        "enable": true,
        "zIndex": -1
    },
    "detectRetina": true,
    "duration": 0,
    "fpsLimit": 120,
    "interactivity": {
        "detectsOn": "window",
        "events": {
            "onClick": {
                "enable": false,
                "mode": []
            },
            "onDiv": {
                "selectors": [],
                "enable": false,
                "mode": [],
                "type": "circle"
            },
            "onHover": {
                "enable": false,
                "mode": "trail",
                "parallax": {
                    "enable": false,
                    "force": 2,
                    "smooth": 10
                }
            },
            "resize": {
                "delay": 0.5,
                "enable": true
            }
        },
        "modes": {
            "trail": {
                "delay": 0.005,
                "pauseOnStop": true,
                "quantity": 25,
                "particles": {
                    "color": {
                        "value": "#ff0000",
                        "animation": {
                            "enable": true,
                            "speed": 400,
                            "sync": true
                        }
                    },
                    "collisions": {
                        "enable": false
                    },
                    "links": {
                        "enable": false
                    },
                    "move": {
                        "outModes": {
                            "default": "destroy"
                        },
                        "speed": 2
                    },
                    "size": {
                        "value": {
                            "min": 1,
                            "max": 5
                        },
                        "animation": {
                            "enable": true,
                            "speed": 5,
                            "sync": true,
                            "startValue": "min",
                            "destroy": "max"
                        }
                    }
                }
            },
            "attract": {
                "distance": 200,
                "duration": 0.4,
                "easing": "ease-out-quad",
                "factor": 1,
                "maxSpeed": 50,
                "speed": 1
            },
            "bounce": {
                "distance": 200
            },
            "bubble": {
                "distance": 200,
                "duration": 0.4,
                "mix": false,
                "divs": {
                    "distance": 200,
                    "duration": 0.4,
                    "mix": false,
                    "selectors": []
                }
            },
            "connect": {
                "distance": 160,
                "links": {
                    "opacity": 0.5
                },
                "radius": 60
            },
            "grab": {
                "distance": 100,
                "links": {
                    "blink": false,
                    "consent": false,
                    "opacity": 1
                }
            },
            "push": {
                "default": true,
                "groups": [],
                "quantity": 4
            },
            "remove": {
                "quantity": 2
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4,
                "factor": 100,
                "speed": 1,
                "maxSpeed": 50,
                "easing": "ease-out-quad",
                "divs": {
                    "distance": 200,
                    "duration": 0.4,
                    "factor": 100,
                    "speed": 1,
                    "maxSpeed": 50,
                    "easing": "ease-out-quad",
                    "selectors": []
                }
            },
            "slow": {
                "factor": 3,
                "radius": 200
            },
            "light": {
                "area": {
                    "gradient": {
                        "start": {
                            "value": "#ffffff"
                        },
                        "stop": {
                            "value": "#000000"
                        }
                    },
                    "radius": 1000
                },
                "shadow": {
                    "color": {
                        "value": "#000000"
                    },
                    "length": 2000
                }
            }
        }
    },
    "manualParticles": [],
    "particles": {
        "bounce": {
            "horizontal": {
                "value": 1
            },
            "vertical": {
                "value": 1
            }
        },
        "collisions": {
            "absorb": {
                "speed": 2
            },
            "bounce": {
                "horizontal": {
                    "value": 1
                },
                "vertical": {
                    "value": 1
                }
            },
            "enable": false,
            "maxSpeed": 50,
            "mode": "bounce",
            "overlap": {
                "enable": true,
                "retries": 0
            }
        },
        "color": {
            "value": particlesColor,
            "animation": {
                "h": {
                    "count": 0,
                    "enable": true,
                    "speed": 50,
                    "decay": 0,
                    "delay": 0,
                    "sync": false,
                    "offset": 0
                },
                "s": {
                    "count": 0,
                    "enable": false,
                    "speed": 1,
                    "decay": 0,
                    "delay": 0,
                    "sync": true,
                    "offset": 0
                },
                "l": {
                    "count": 0,
                    "enable": false,
                    "speed": 1,
                    "decay": 0,
                    "delay": 0,
                    "sync": true,
                    "offset": 0
                }
            }
        },
        "effect": {
            "close": true,
            "fill": true,
            "options": {},
            "type": []
        },
        "groups": {},
        "move": {
            "angle": {
                "offset": 0,
                "value": 90
            },
            "attract": {
                "distance": 10,
                "enable": false,
                "rotate": {
                    "x": 3000,
                    "y": 3000
                }
            },
            "center": {
                "x": 50,
                "y": 50,
                "mode": "percent",
                "radius": 0
            },
            "decay": 0,
            "distance": {},
            "direction": "none",
            "drift": 0,
            "enable": true,
            "gravity": {
                "acceleration": 9.81,
                "enable": false,
                "inverse": false,
                "maxSpeed": 50
            },
            "path": {
                "clamp": true,
                "delay": {
                    "value": 0
                },
                "enable": false,
                "options": {}
            },
            "outModes": {
                "default": "out",
                "bottom": "out",
                "left": "out",
                "right": "out",
                "top": "out"
            },
            "random": false,
            "size": false,
            "speed": 2,
            "spin": {
                "acceleration": 0,
                "enable": false
            },
            "straight": false,
            "trail": {
                "enable": false,
                "length": 40,
                "fill": {}
            },
            "vibrate": false,
            "warp": false
        },
        "number": {
            "density": {
                "enable": true,
                "width": 1920,
                "height": 1080
            },
            "limit": {
                "mode": "delete",
                "value": 0
            },
            "value": 250
        },
        "opacity": {
            "value": {
                "min": 0.5,
                "max": 0.9
            },
            "animation": {
                "count": 0,
                "enable": true,
                "speed": 0.5,
                "decay": 0,
                "delay": 0,
                "sync": false,
                "mode": "auto",
                "startValue": "random",
                "destroy": "none"
            }
        },
        "reduceDuplicates": false,
        "shadow": {
            "blur": 0,
            "color": {
                "value": "#000"
            },
            "enable": false,
            "offset": {
                "x": 0,
                "y": 0
            }
        },
        "shape": {
            "close": true,
            "fill": true,
            "options": {},
            "type": "circle"
        },
        "size": {
            "value": {
                "min": 1,
                "max": 3
            },
            "animation": {
                "count": 0,
                "enable": true,
                "speed": 3,
                "decay": 0,
                "delay": 0,
                "sync": false,
                "mode": "auto",
                "startValue": "random",
                "destroy": "none"
            }
        },
        "stroke": {
            "width": 0
        },
        "zIndex": {
            "value": -1,
            "opacityRate": 1,
            "sizeRate": 1,
            "velocityRate": 1
        },
        "destroy": {
            "bounds": {},
            "mode": "none",
            "split": {
                "count": 1,
                "factor": {
                    "value": 3
                },
                "rate": {
                    "value": {
                        "min": 4,
                        "max": 9
                    }
                },
                "sizeOffset": true,
                "particles": {}
            }
        },
        "roll": {
            "darken": {
                "enable": false,
                "value": 0
            },
            "enable": false,
            "enlighten": {
                "enable": false,
                "value": 0
            },
            "mode": "vertical",
            "speed": 25
        },
        "tilt": {
            "value": 0,
            "animation": {
                "enable": false,
                "speed": 0,
                "decay": 0,
                "sync": false
            },
            "direction": "clockwise",
            "enable": false
        },
        "twinkle": {
            "lines": {
                "enable": false,
                "frequency": 0.05,
                "opacity": 1
            },
            "particles": {
                "enable": false,
                "frequency": 0.05,
                "opacity": 1
            }
        },
        "wobble": {
            "distance": 5,
            "enable": false,
            "speed": {
                "angle": 50,
                "move": 10
            }
        },
        "life": {
            "count": 0,
            "delay": {
                "value": 0,
                "sync": false
            },
            "duration": {
                "value": 0,
                "sync": false
            }
        },
        "rotate": {
            "value": 0,
            "animation": {
                "enable": false,
                "speed": 0,
                "decay": 0,
                "sync": false
            },
            "direction": "clockwise",
            "path": false
        },
        "orbit": {
            "animation": {
                "count": 0,
                "enable": false,
                "speed": 1,
                "decay": 0,
                "delay": 0,
                "sync": false
            },
            "enable": false,
            "opacity": 1,
            "rotation": {
                "value": 45
            },
            "width": 1
        },
        "links": {
            "blink": false,
            "color": {
                "value": linksColor
            },
            "consent": false,
            "distance": 150,
            "enable": true,
            "frequency": 1,
            "opacity": 1,
            "shadow": {
                "blur": 5,
                "color": {
                    "value": "#000"
                },
                "enable": false
            },
            "triangles": {
                "enable": false,
                "frequency": 1
            },
            "width": 1,
            "warp": false
        },
        "repulse": {
            "value": 0,
            "enabled": false,
            "distance": 1,
            "duration": 1,
            "factor": 1,
            "speed": 1
        }
    },
    "pauseOnBlur": true,
    "pauseOnOutsideViewport": true,
    "responsive": [],
    "smooth": false,
    "style": {},
    "themes": [],
    "zLayers": 100,
    "emitters": [],
    "motion": {
        "disable": false,
        "reduce": {
            "factor": 4,
            "value": true
        }
    }
})