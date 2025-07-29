import * as THREE from 'three';

export function renderizarGrid(grid, escena) {
  const materiales = {
    21: new THREE.MeshStandardMaterial({ color: 0x000 }), // muro
    0: new THREE.MeshStandardMaterial({ color: 0xf0ffdd}), // espacio vacío
    1: new THREE.MeshStandardMaterial({ color: 0xfff444 }), // muro
    3: new THREE.MeshStandardMaterial({ color: 0x00ff00 }), // mesa de trabajo
    4: new THREE.MeshStandardMaterial({ color: 0x3399ff }), // fregadero
    5: new THREE.MeshStandardMaterial({ color: 0xff3300 }), // fuego
    6: new THREE.MeshStandardMaterial({ color: 0xf9f9f0 }), // comida 1
    7: new THREE.MeshStandardMaterial({ color: 0xffcc00 }), // comida 2
    8: new THREE.MeshStandardMaterial({ color: 0xff9999 }), // comida 3
    9: new THREE.MeshStandardMaterial({ color: 0xcc66ff }), // comida 4
    10: new THREE.MeshStandardMaterial({ color: 0x00ffff })  // comida 5
  };

  for (let z = 0; z < grid.length; z++) {
    for (let x = 0; x < grid[0].length; x++) {
      const tipo = grid[z][x];

      let altura = 1; // altura por defecto
      if (tipo === 21) altura = 3; // muro
      else if (tipo === 0) altura = 0.00001; // espacio vacío
      else if (tipo === 3) altura = 0.7; // mesa de trabajo
      else if (tipo === 4) altura = 1; // fregadero
      else if (tipo === 5) altura = 1; // fuego
      else if (tipo >= 6 && tipo <= 10) altura = 0.9; // objetos de comida
      

      const geometria = new THREE.BoxGeometry(1, altura, 1);
      const cubo = new THREE.Mesh(geometria, materiales[tipo]);
      cubo.position.set(
        x - grid[0].length / 2,
        altura / 2,
        z - grid.length / 2
      );
      escena.add(cubo);
    }
  }
}
