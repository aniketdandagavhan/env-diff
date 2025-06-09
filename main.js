const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

function parseEnvFile(filePath) {
  const content = fs.readFileSync(path.resolve(filePath), 'utf8');
  return dotenv.parse(content);
}

function diffEnvKeysByPrefix(devPath, uatPath, prefix = 'IMAGE_SERVICE') {
  const devEnv = parseEnvFile(devPath);
  const uatEnv = parseEnvFile(uatPath);

  const devKeys = Object.keys(devEnv).filter(key => key.startsWith(prefix));
  const uatKeys = Object.keys(uatEnv).filter(key => key.startsWith(prefix));

  const devKeySet = new Set(devKeys);
  const uatKeySet = new Set(uatKeys);

  const onlyInDev = devKeys.filter(k => !uatKeySet.has(k));
  const onlyInUat = uatKeys.filter(k => !devKeySet.has(k));

  return {
    onlyInDev,  // Present in dev but missing in uat
    onlyInUat   // Present in uat but not in dev
  };
}

// Example usage:
const result = diffEnvKeysByPrefix('.old.env', '.new.env', '');
console.log('✅ Keys missing in NEW:\n', result.onlyInDev);
console.log('\n⚠️  Extra keys in NEW:\n', result.onlyInUat);
