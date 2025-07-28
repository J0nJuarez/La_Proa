import * as THREE from 'three';
import { animarPersonaje } from './animar.js';
import { configurarControles } from '../teclado/movPersonaje.js';

export function crearPersonaje() {
    const cuerpo = new THREE.Mesh(
        new THREE.CapsuleGeometry(5, 2, 10, 20),
        new THREE.MeshStandardMaterial({ color: 0xfdef00 })
    );

    const brazIzq = new THREE.Mesh(
        new THREE.ConeGeometry(1.3, 7, 21),
        new THREE.MeshStandardMaterial({ color: 0xff4400 })
    );
    brazIzq.position.x = -5.5;
    brazIzq.rotation.z = -0.35;
    brazIzq.position.y = 0.5;


    const brazDer = new THREE.Mesh(
        new THREE.ConeGeometry(1.3, 7, 21),
        new THREE.MeshStandardMaterial({ color: 0xff4400 })
    );
    brazDer.position.x = 5.5;
    brazDer.rotation.z = 0.35;
    brazDer.position.y = 0.5;

    const cabeza = new THREE.Mesh(
        new THREE.SphereGeometry(4, 21, 21),
        new THREE.MeshStandardMaterial({ color: 0x5def00 })
    );
    cabeza.position.y = 10;

    const personaje = new THREE.Group();
    personaje.add(cuerpo, brazIzq, brazDer, cabeza);
    personaje.position.y = 2;

    const velocidad = 0.1;
    const movimiento = { x: 0, z: 0 };

    personaje.userData = {
        cabeza,
        brazIzq,
        brazDer,
        moverX: (val) => (movimiento.x = val),
        moverZ: (val) => (movimiento.z = val),
        actualizar: (t) => {
            animarPersonaje(personaje, t);
            personaje.position.x += movimiento.x * velocidad;
            personaje.position.z += movimiento.z * velocidad;
        }
    };

    // humo de correr

    const geometriaHumo = new THREE.SphereGeometry(4, 4, 4);
    const materialHumo = new THREE.MeshBasicMaterial({ color: 0xf8f8f8, transparent: true, opacity: 0.2 });

    const humo = new THREE.Group();
    for (let i = 0; i < 10; i++) {
        const particula = new THREE.Mesh(geometriaHumo, materialHumo.clone());
        particula.visible = false;
        humo.add(particula);
    }
    humo.position.y = -3;
    personaje.add(humo);
    personaje.userData.humo = humo;


    configurarControles(personaje);

    return personaje;
}
