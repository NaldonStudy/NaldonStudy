const fs = require('fs');
const path = require('path');

/**
 * 간단한 정규표현식을 사용하여 파일 내의 컴포넌트 및 함수 이름을 검사합니다.
 */
function checkFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath, path.extname(filePath));
    const results = [];

    // 1. 파일명 기반 예상 컴포넌트명 (PascalCase)
    const expectedComponentName = fileName.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');

    // 2. export function 또는 const ... = () => { ... } 형태의 컴포넌트 찾기
    const componentRegex = /export\s+(?:function|const)\s+([A-Z][a-zA-Z0-9]+)/g;
    let match;
    let mainComponentFound = false;

    while ((match = componentRegex.exec(content)) !== null) {
        const foundName = match[1];
        if (foundName === expectedComponentName) {
            mainComponentFound = true;
        }
    }

    if (filePath.includes('components') && !mainComponentFound && !fileName.includes('index') && !fileName.includes('utils')) {
        results.push(`[FAIL] 파일명 '${fileName}'과 일치하는 PascalCase 컴포넌트 '${expectedComponentName}'을 찾을 수 없습니다.`);
    }

    // 3. Hooks 검사 (use* prefix)
    if (filePath.includes('hooks')) {
        const hookRegex = /export\s+(?:function|const)\s+(use[A-Z][a-zA-Z0-9]*)/g;
        let hookMatch;
        let mainHookFound = false;
        const expectedHookName = fileName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

        while ((hookMatch = hookRegex.exec(content)) !== null) {
            if (hookMatch[1] === expectedHookName) {
                mainHookFound = true;
            }
        }

        if (!mainHookFound) {
            results.push(`[WARN] Hook 파일 '${fileName}' 내에 일치하는 이름 '${expectedHookName}'이 정의되지 않았을 수 있습니다.`);
        }
    }

    return results;
}

const target = process.argv[2];
if (!target) {
    console.log("Usage: node validate_functions.cjs <file_or_directory>");
    process.exit(1);
}

const stats = fs.statSync(target);
if (stats.isFile()) {
    const issues = checkFile(target);
    issues.forEach(issue => console.log(issue));
} else {
    // 디렉토리인 경우 재귀적으로 탐색
    function walk(dir) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            const relativePath = path.relative(target, fullPath);
            
            // 제외 패턴
            if (file.startsWith('.') || file === 'node_modules' || file === 'Next.js' || file === 'dist' || file === '.next') return;

            if (fs.statSync(fullPath).isDirectory()) {
                walk(fullPath);
            } else if (/\.(tsx|ts)$/.test(file)) {
                const issues = checkFile(fullPath);
                if (issues.length > 0) {
                    console.log(`\n--- ${relativePath} ---`);
                    issues.forEach(issue => console.log(issue));
                }
            }
        });
    }
    walk(target);
}
