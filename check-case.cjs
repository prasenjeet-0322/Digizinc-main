const fs = require('fs');
const path = require('path');

function checkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      checkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      
      // Match all local imports
      const matches = [...content.matchAll(/from\s+['"]([^'"]+)['"]/g), ...content.matchAll(/import\s+['"]([^'"]+)['"]/g)];
      
      for (const match of matches) {
        let importPath = match[1];
        if (!importPath.startsWith('.')) continue; // skip external/alias imports for now
        
        const absoluteImportPath = path.resolve(path.dirname(fullPath), importPath);
        const baseName = path.basename(absoluteImportPath);
        const dirName = path.dirname(absoluteImportPath);
        
        if (fs.existsSync(dirName)) {
          const actualFiles = fs.readdirSync(dirName);
          const actualFile = actualFiles.find(f => f.replace(/\.(tsx|ts|js|jsx)$/, '') === baseName);
          if (actualFile && actualFile.replace(/\.(tsx|ts|js|jsx)$/, '') !== baseName) {
            console.log(`CASE MISMATCH: imported '${importPath}' in ${fullPath}`);
            console.log(`Expected: ${baseName}, Found: ${actualFile}`);
          }
        }
      }
    }
  }
}

checkDir('src');
console.log('Case check complete.');
