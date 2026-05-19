const fs = require('fs');
const path = require('path');

const ATOMIC_TIERS = ['atoms', 'molecules', 'organisms', 'templates', 'ui'];

/**
 * components/ 하위 폴더가 Atomic Design 계층을 준수하는지 검사합니다.
 */
function validateAtomicStructure(projectRoot) {
    const componentsPath = path.join(projectRoot, 'components');
    
    if (!fs.existsSync(componentsPath)) {
        console.log(" 'components' 폴더가 존재하지 않아 검사를 건너뜁니다.");
        return [];
    }

    const entries = fs.readdirSync(componentsPath, { withFileTypes: true });
    const results = [];

    entries.forEach(entry => {
        if (entry.isDirectory()) {
            if (!ATOMIC_TIERS.includes(entry.name)) {
                results.push(`[FAIL] Atomic Design 위반: 'components/${entry.name}' 폴더는 허용되지 않습니다. (허용: ${ATOMIC_TIERS.join(', ')})`);
            }
        }
    });

    return results;
}

const root = process.argv[2] || process.cwd();
const issues = validateAtomicStructure(root);

if (issues.length === 0) {
    console.log(" components/ 폴더가 Atomic Design 계층을 잘 준수하고 있습니다.");
} else {
    issues.forEach(issue => console.log(issue));
}
