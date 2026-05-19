const fs = require('fs');
const path = require('path');

const ROOT_COMPONENTS_DIR = path.join(process.cwd(), 'components');
const ALLOWED_FOLDERS = ['atoms', 'molecules', 'organisms', 'templates', 'ui'];

function checkStructure() {
    console.log('--- Atomic Design Structure Check ---');
    
    if (!fs.existsSync(ROOT_COMPONENTS_DIR)) {
        console.error('Error: components directory not found.');
        return;
    }

    const items = fs.readdirSync(ROOT_COMPONENTS_DIR);
    let violations = 0;

    items.forEach(item => {
        const fullPath = path.join(ROOT_COMPONENTS_DIR, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            if (!ALLOWED_FOLDERS.includes(item)) {
                console.warn(`[Violation] Unexpected folder found: components/${item}`);
                violations++;
            }
        } else {
            // It's a file
            console.warn(`[Violation] File found directly under components/: ${item}`);
            violations++;
        }
    });

    if (violations === 0) {
        console.log('Success: All components are correctly placed.');
    } else {
        console.log(`\nFound ${violations} violations.`);
    }
}

checkStructure();
