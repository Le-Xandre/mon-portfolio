const fs = require('fs');
const execSync = require('child_process').execSync;

const REMOVE_LIST = [
  "all", "bin",     // suspicious/placeholder packages
  "node", "update"  // only keep if you are SURE you want them!
];

// 1. Read and parse package.json
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// 2. Remove bad/suspicious dependencies
for (const field of ['dependencies', 'devDependencies']) {
  if (!pkg[field]) continue;
  REMOVE_LIST.forEach(dep => {
    if (pkg[field][dep]) {
      console.log(`Removing ${dep} from ${field}`);
      delete pkg[field][dep];
    }
  });
}

// 3. Remove duplicated packages in devDependencies if already in dependencies
if (pkg.devDependencies) {
  for (const dep of Object.keys(pkg.devDependencies)) {
    if (pkg.dependencies && pkg.dependencies[dep]) {
      console.log(`Removing duplicate ${dep} from devDependencies`);
      delete pkg.devDependencies[dep];
    }
  }
}

// 4. Optionally upgrade all to the latest version (EXPERIMENTAL, can break APIs)
// To skip, comment out or remove the below block:
const { execSync: exec } = require('child_process');
console.log("Upgrading all dependencies to their latest versions...");
exec('npx npm-check-updates -u', {stdio: 'inherit'});

// 5. Write the cleaned file
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('Cleaned package.json written. Now run: npm install && npm audit fix');