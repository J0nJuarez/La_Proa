// controles.js

import * as THREE from 'three';

export function configurarControles(personaje) {
    const teclas = {
        w: false,
        a: false,
        s: false,
        d: false,
        o: false
    };

    function actualizarMovimiento() {
        const velocidad = teclas.o ? 20 : 5;
        let orientacion = null;


        const z = (teclas.w ? -velocidad : 0) + (teclas.s ? velocidad : 0);
        const x = (teclas.a ? -velocidad : 0) + (teclas.d ? velocidad : 0);

        personaje.userData?.moverX(x);
        personaje.userData?.moverZ(z);
        personaje.userData.isSprinting = teclas.o;


    if (teclas.s && teclas.a) {
        orientacion = 135;
    } else if (teclas.w && teclas.a) {
        orientacion = 45;
    } else if (teclas.s && teclas.d) {
        orientacion = 225;
    } else if (teclas.w && teclas.d) {
        orientacion = 315;
    } else if (teclas.d) {
        orientacion = 90;
    } else if (teclas.a) {
        orientacion = 270;
    } else if (teclas.s) {
        orientacion = 180;
    } else if (teclas.w) {
        orientacion = 0;
    }

    if (orientacion !== null) {
        personaje.rotation.y = THREE.MathUtils.degToRad(orientacion);
        
    }

    }

    window.addEventListener('keydown', (e) => {
        if (e.key in teclas) {
            teclas[e.key] = true;
            actualizarMovimiento();
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.key in teclas) {
            teclas[e.key] = false;
            actualizarMovimiento();
        }
    });
}
