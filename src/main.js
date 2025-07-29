import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { generarGrid } from './logica/generadorMapa.js';
import { renderizarGrid } from './logica/escenaRestaurante.js';
import { crearPersonaje } from './Personaje/personaje.js';

import './style.css';

let escenaMapa, camara, renderer, controles, escenaPersonaje, personaje;

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camara.position.set(0, 25, 25);

controles = new OrbitControls(camara, renderer.domElement);
controles.target.set(0, 0, 0);
controles.update();

const luz = new THREE.DirectionalLight(0xffffff, 10);
luz.position.set(10, 20, 10);

initPersonaje();

// Prueba personaje
function initPersonaje() {
  escenaPersonaje = new THREE.Scene();
  escenaPersonaje.background = new THREE.Color(0x49f9f9);

  const ambientaLuz = new THREE.AmbientLight(0xffffff, 1);
  escenaPersonaje.add(ambientaLuz);
  escenaPersonaje.add(luz);

  personaje = crearPersonaje(); // ← ahora está en el scope global
  escenaPersonaje.add(personaje);

  const grid = new THREE.GridHelper(35, 35);
  escenaPersonaje.add(grid);

  animate();
}

// initMapa(); // Opcional

function initMapa() {
  escenaMapa = new THREE.Scene();
  escenaMapa.background = new THREE.Color(0x49f9f9);

  const semilla = Math.floor(Math.random() * 10000);
  const grid = generarGrid(semilla, 20, 30);
  renderizarGrid(grid, escenaMapa);

  animate();
}

function animate(time) {
  requestAnimationFrame(animate);

  if (personaje?.userData?.actualizar) {
    personaje.userData.actualizar(time * 0.001); // ← ¡esto ya animará!
  }

  renderer.render(escenaPersonaje, camara);
}

// ajustar para siempre el tamaño de la pantalla
window.addEventListener('resize', () => {
  camara.aspect = window.innerWidth / window.innerHeight;
  camara.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
