import seedrandom from 'seedrandom';

export function generarGrid(semilla, alto, ancho) {
  const rng = seedrandom(semilla);
  const grid = Array.from({ length: alto }, () => Array(ancho).fill(1));
  // Inicializar bordes como muros
  for (let z = 0; z < alto; z++) {  
    grid[z][0] = 21; // muro izquierdo
    grid[z][ancho - 1] = 21; // muro derecho
  }
  for (let x = 0; x < ancho; x++) {
    grid[0][x] = 21; // muro superior
    grid[alto - 1][x] = 21; // muro inferior
  } 

  const startX = Math.floor(ancho / 2);
  const startZ = Math.floor(alto / 2);

  const abiertos = [[startZ, startX]];
  const visitados = new Set();
  const key = (z, x) => `${z},${x}`;

  let pasos = 0;
  const maxPasos = Math.floor(ancho * alto * 0.7);

  while (abiertos.length > 0 && pasos < maxPasos) {
    const [z, x] = abiertos.pop();
    if (visitados.has(key(z, x))) continue;

    visitados.add(key(z, x));
    grid[z][x] = 0;

    const vecinos = [
      [z - 1, x], [z + 1, x], [z, x - 1], [z, x + 1]
    ];

    for (const [nz, nx] of vecinos) {
      if (nz <= 0 || nz >= alto - 1 || nx <= 0 || nx >= ancho - 1) continue;
      if (!visitados.has(key(nz, nx)) && rng() < 0.8) {
        abiertos.push([nz, nx]);
      }
    }

    pasos++;
  }

  // Crear segunda sala en la esquina inferior derecha (ajustable)
  const sala2 = {
    x0: ancho - 10,
    z0: alto - 10,
    w: 8,
    h: 8
  };

  for (let z = sala2.z0; z < sala2.z0 + sala2.h; z++) {
    for (let x = sala2.x0; x < sala2.x0 + sala2.w; x++) {
      grid[z][x] = 0;
    }
  }


  const maxIntentos = 1000;

  // SOLO colocar las 5 mesas en la segunda sala
  colocarExactamenteEnZona(grid, rng, 3, 5, sala2.x0, sala2.z0, sala2.w, sala2.h, maxIntentos);

  // otros objetos en cualquier parte del mapa abierta (valor 0)
  colocarExactamente(grid, rng, 4, 1, ancho, alto, maxIntentos); // fregadero
  colocarExactamente(grid, rng, 5, 2, ancho, alto, maxIntentos); // fuegos

  for (let tipo = 6; tipo <= 10; tipo++) {
    colocarExactamente(grid, rng, tipo, 1, ancho, alto, maxIntentos);
  }

  return grid;
}

function contarCeldas(grid, tipo) {
  return grid.flat().filter(v => v === tipo).length;
}

function coordsAleatorias(rng, ancho, alto) {
  const x = Math.floor(rng() * (ancho - 2)) + 1;
  const z = Math.floor(rng() * (alto - 2)) + 1;
  return [x, z];
}

function colocarExactamente(grid, rng, tipo, cantidad, ancho, alto, maxIntentos) {
  let colocados = contarCeldas(grid, tipo);
  let intentos = 0;
  while (colocados < cantidad && intentos < maxIntentos) {
    const [x, z] = coordsAleatorias(rng, ancho, alto);
    if (grid[z][x] === 0) {
      grid[z][x] = tipo;
      colocados++;
    }
    intentos++;
  }
}

function colocarExactamenteEnZona(grid, rng, tipo, cantidad, x0, z0, w, h, maxIntentos) {
  let colocados = 0;
  let intentos = 0;
  while (colocados < cantidad && intentos < maxIntentos) {
    const x = Math.floor(rng() * w) + x0;
    const z = Math.floor(rng() * h) + z0;
    if (grid[z][x] === 0) {
      grid[z][x] = tipo;
      colocados++;
    }
    intentos++;
  }
}
