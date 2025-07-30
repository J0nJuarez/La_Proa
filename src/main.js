import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { generarGrid } from './logica/generadorMapa.js';
import { renderizarGrid } from './logica/escenaRestaurante.js';
import { animarPersonaje } from './Personaje/animar.js';
import { configurarControles } from './teclado/movPersonaje.js';

import './style.css';

let escenaMapa, camara, camaraPersonaje, renderer, controles, escenaPersonaje, personaje;
const offset = new THREE.Vector3(0, 8, 2.5); 
const objetivo = new THREE.Vector3();


renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camara.position.set(0, 25, 25);

camaraPersonaje = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camaraPersonaje.position.set(0, 25, 25);

controles = new OrbitControls(camara, renderer.domElement);
controles.target.set(0, 0, 0);
controles.update();

const luz = new THREE.DirectionalLight(0xffffff, 10);
//luz.position.set(10, 20, 10);

//initPersonaje();

// Prueba personaje
//function initPersonaje() {
//  escenaPersonaje = new THREE.Scene();
//  escenaPersonaje.background = new THREE.Color(0x49f9f9);
//
//  const ambientaLuz = new THREE.AmbientLight(0xffffff, 1);
//  escenaPersonaje.add(ambientaLuz);
//  escenaPersonaje.add(luz);
//
//  personaje = crearPersonaje(); // ← ahora está en el scope global
//  escenaPersonaje.add(personaje);
//
//  const grid = new THREE.GridHelper(35, 35);
//  escenaPersonaje.add(grid);
//
//  animate();
//}

let actualizarMovimiento;


initMapa();


function initMapa() {
  escenaMapa = new THREE.Scene();
  escenaMapa.background = new THREE.Color(0x000);
  const ambientaLuz = new THREE.AmbientLight(0xffffff, 1);
  escenaMapa.add(ambientaLuz);

  const semilla = Math.floor(Math.random() * 10000);
  const grid = generarGrid(semilla, 20, 20);
  personaje = renderizarGrid(grid, escenaMapa); 
  actualizarMovimiento = configurarControles(personaje); 

  // Al crear el personaje
  personaje.userData.moverX = (x) => { personaje.position.x += x * 0.01; };
  personaje.userData.moverZ = (z) => { personaje.position.z += z * 0.01; };
  personaje.position.x

  animate();
}



function animate(time) {
  requestAnimationFrame(animate);

  if (personaje) {
    if (actualizarMovimiento) actualizarMovimiento();
    animarPersonaje(personaje, time * 0.001);

    // Cámara sigue al personaje desde arriba y atrás
    objetivo.copy(personaje.position);
    camaraPersonaje.position.copy(personaje.position).add(offset);
    camaraPersonaje.lookAt(objetivo);
  }

  renderer.render(escenaMapa, camaraPersonaje);
}

// ajustar para siempre el tamaño de la pantalla
window.addEventListener('resize', () => {
  camaraPersonaje.aspect = window.innerWidth / window.innerHeight;
  camaraPersonaje.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
