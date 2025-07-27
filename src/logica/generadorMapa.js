import seedrandom from 'seedrandom';

export function generarGrid(semilla, alto, ancho) {
  const rng = seedrandom(semilla);
  const grid = Array.from({ length: alto }, () => Array(ancho).fill(1));

  const startX = Math.floor(ancho / 2);
  const startZ = Math.floor(alto / 2);

  const abiertos = [[startZ, startX]];
  const visitados = new Set();
  const key = (z, x) => `${z},${x}`;

  let pasos = 0;
  const maxPasos = Math.floor(ancho * alto * 0.75);

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

  const maxIntentos = 1000;
  let intentos = 0;

  // 5 mesas
  colocarExactamente(grid, rng, 3, 5, ancho, alto, maxIntentos);

  // 1 fregadero 
  colocarExactamente(grid, rng, 4, 1, ancho, alto, maxIntentos);

  // 2 fuegos 
  colocarExactamente(grid, rng, 5, 2, ancho, alto, maxIntentos);

  // 1 comida
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
