const fs = require('fs');

const svg = fs.readFileSync('public/logo.svg', 'utf8');

// We want to add a new class `.cls-5 { fill: #1E1E21; }`
let newSvg = svg.replace('<style>', '<style>\n      .cls-5 {\n        fill: #1E1E21;\n      }');

// We want to change the class of ONLY the paths that make up the letters "digizinc".
// The paths for the letters start with M1132, M1246, M1639, M1788, M2261, M2653, M2867, M1753
const pathsToChange = ['M1132', 'M1246', 'M1639', 'M1788', 'M2261', 'M2653', 'M2867', 'M1753'];

for (const pathStart of pathsToChange) {
  newSvg = newSvg.replace(`class="cls-1" d="${pathStart}`, `class="cls-5" d="${pathStart}`);
}

fs.writeFileSync('public/logo-dark.svg', newSvg, 'utf8');
console.log('Successfully updated logo-dark.svg');
