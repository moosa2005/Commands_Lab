const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'data', 'generators');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.ts')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix all instances of: import { GeneratorConfig } from '../types/generator';
    // To: import type { GeneratorConfig } from '../../types/generator';
    content = content.replace(/import\s+\{\s*GeneratorConfig\s*\}\s+from\s+['"]\.\.\/types\/generator['"];/g, "import type { GeneratorConfig } from '../../types/generator';");
    
    // Also fix index.ts where it already has '../../types/generator' but lacking 'type'
    content = content.replace(/import\s+\{\s*GeneratorConfig\s*\}\s+from\s+['"]\.\.\/\.\.\/types\/generator['"];/g, "import type { GeneratorConfig } from '../../types/generator';");

    content = content.replace(/generateCommand:\s*\(values\)\s*=>\s*\{/g, "generateCommand: (values: any) => {");

    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('Fixed imports recursively.');
