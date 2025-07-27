// src/main.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { generarGrid } from './logica/generadorMapa.js';
import { renderizarGrid} from './logica/escenaRestaurante.js';
import './style.css';

let escena, camara, renderer, controles;

init();

function init() {
  escena = new THREE.Scene();
  escena.background = new THREE.Color(0xf0f0f0);

  camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camara.position.set(0, 25, 25);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controles = new OrbitControls(camara, renderer.domElement);
  controles.target.set(0, 0, 0);
  controles.update();

  const luz = new THREE.DirectionalLight(0xffffff, 1);
  luz.position.set(10, 20, 10);
  escena.add(luz);

  //const semilla = new Date().getDay() + new Date().getMonth() + new Date().getFullYear(); 
  const semilla = Math.floor(Math.random() * 10000); 
  const grid = generarGrid(semilla,20,30);
  renderizarGrid(grid, escena);

  animate();
}



function animate() {
  requestAnimationFrame(animate);
  renderer.render(escena, camara);
}


// ajustar para siempre el tamaño de la pantalla
window.addEventListener('resize', () => {
  camara.aspect = window.innerWidth / window.innerHeight;
  camara.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
