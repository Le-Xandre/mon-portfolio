const fs = require('fs');
const BAD_PACKAGES = [
  "all",
  "bin",
  "node",
  "update"
];

// Read and parse the lockfile
const lock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));

// Recursively delete bad packages from 'packages' key (npm v7+ style lockfiles)
if (lock.packages) {
  for (const bad of BAD_PACKAGES) {
    for (const key of Object.keys(lock.packages)) {
      if (key === `node_modules/${bad}`) {
        console.log(`Removing ${key} from lockfile`);
        delete lock.packages[key];
      }
    }
  }
}

// Also delete from dependencies and devDependencies, recursively
function cleanDeps(obj) {
  if (!obj) return;
  for (const bad of BAD_PACKAGES) {
    if (obj[bad]) {
      console.log(`Removing dependency ${bad}`);
      delete obj[bad];
    }
  }
  Object.keys(obj).forEach(dep => {
    if (obj[dep] && typeof obj[dep] === 'object') {
      cleanDeps(obj[dep].dependencies);
      cleanDeps(obj[dep].devDependencies);
    }
  });
}
if (lock.dependencies) cleanDeps(lock.dependencies);

fs.writeFileSync('package-lock.json', JSON.stringify(lock, null, 2));
console.log('package-lock.json cleaned! Now run: npm install');
