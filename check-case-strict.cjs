const fs = require('fs');
const path = require('path');

function getActualCasePath(filepath) {
    const parts = filepath.split(path.sep);
    let currentPath = '';

    for (let i = 0; i < parts.length; i++) {
        if (parts[i] === '') {
            currentPath = path.sep; // Handle absolute root or empty parts
            continue;
        }

        const dir = currentPath || '.';
        if (!fs.existsSync(path.join(dir, parts[i]))) {
            return null; // Path doesn't exist at all
        }

        const files = fs.readdirSync(dir);
        const exactMatch = files.find(f => f === parts[i]);
        
        if (!exactMatch) {
            return null; // Case mismatch found!
        }
        
        currentPath = path.join(currentPath, exactMatch);
    }
    return currentPath;
}

function checkImports(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      checkImports(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const importRegex = /import\s+.*?from\s+['"]([^'"]+)['"]/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        if (importPath.startsWith('@/')) {
          let resolvedPath = path.join(__dirname, 'src', importPath.slice(2));
          let found = false;
          
          const exts = ['.tsx', '.ts', '/index.tsx', '/index.ts', '.css', ''];
          for(const ext of exts) {
             if (fs.existsSync(resolvedPath + ext)) {
                if (getActualCasePath(resolvedPath + ext) === null) {
                    console.log(`[CASE MISMATCH] File: ${fullPath} -> Import: ${importPath}`);
                }
                found = true;
                break;
             }
          }
          if(!found) {
             console.log(`[MISSING] File: ${fullPath} -> Import: ${importPath}`);
          }
        }
      }
    }
  }
}

console.log("Checking strict case match...");
checkImports(path.join(__dirname, 'src'));
console.log("Done.");
