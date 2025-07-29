import * as THREE from 'three';

export function animarPersonaje(personaje, tiempo) {
    const { cabeza, brazIzq, brazDer } = personaje.userData;

    if (!personaje.userData.lastPosition) {
        personaje.userData.lastPosition = new THREE.Vector3().copy(personaje.position);
    }

   const humo = personaje.userData.humo;

    if (humo && cabeza) {
        if (personaje.userData.isSprinting) {
            humo.children.forEach((p, i) => {
                p.visible = true;
                const offset = (i - 5) * 0.2;
                const dist = 5 + Math.random() * 2.5; 
                p.position.set(
                    cabeza.position.z * dist + offset,
                    personaje.position.y -1,
                    cabeza.position.z * dist + offset
                );
                p.material.opacity = 0.3 + Math.random() * 0.2;
            });
        } else {
            humo.children.forEach(p => p.visible = false);
        }
    }

    const movimiento = personaje.position.distanceTo(personaje.userData.lastPosition);
    const estaMoviendose = movimiento > 0.001;

    const velocidad = estaMoviendose ? 20 : 7;
    const amplitud = estaMoviendose ? 0.8 : 0.1;

    if (cabeza) {
        cabeza.rotation.z = Math.sin(tiempo * velocidad) * 0.1;
        cabeza.position.x = Math.sin(tiempo * velocidad * 0.5) * 0.3;
    }

    if (brazIzq) {
        brazIzq.rotation.x = Math.sin(tiempo * velocidad) * amplitud;
    }

    if (brazDer) {
        brazDer.rotation.x = -Math.sin(tiempo * velocidad) * amplitud;
    }

    personaje.userData.lastPosition.copy(personaje.position);
}
