const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const configPath = path.resolve(process.cwd(), 'tsconfig.app.json');
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
if (configFile.error) {
  console.error('Failed to read tsconfig.app.json', configFile.error);
  process.exit(1);
}
const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(configPath));
const program = ts.createProgram({ rootNames: parsed.fileNames, options: parsed.options });
let problems = [];
for (const file of program.getSourceFiles()) {
  try {
    if (file.referencedFiles && file.referencedFiles.length) {
      file.referencedFiles.forEach((rf, idx) => {
        if (!rf) {
          problems.push({ file: file.fileName, kind: 'referencedFiles', index: idx });
        }
      });
    }
    if (file.typeReferenceDirectives && file.typeReferenceDirectives.length) {
      file.typeReferenceDirectives.forEach((rf, idx) => {
        if (!rf) problems.push({ file: file.fileName, kind: 'typeReferenceDirectives', index: idx });
      });
    }
    if (file.libReferenceDirectives && file.libReferenceDirectives.length) {
      file.libReferenceDirectives.forEach((rf, idx) => {
        if (!rf) problems.push({ file: file.fileName, kind: 'libReferenceDirectives', index: idx });
      });
    }
  } catch (e) {
    console.error('Error inspecting', file.fileName, e.message);
  }
}
if (problems.length) {
  console.error('Found broken reference entries:');
  problems.forEach(p => console.error(p));
  process.exit(2);
}
console.log('No broken reference entries found.');
