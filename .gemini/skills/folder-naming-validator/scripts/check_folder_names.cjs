const fs = require('fs');
const path = require('path');

/**
 * 프로젝트 내의 폴더명(directory name)이 kebab-case를 준수하는지 검사합니다.
 */
function validateFolderNames(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const results = [];

    entries.forEach(entry => {
        if (entry.isDirectory()) {
            const folderName = entry.name;
            
            // 제외 대상 (숨김 폴더, node_modules, .next 등)
            if (folderName.startsWith('.') || folderName === 'node_modules' || folderName === 'Next.js') return;

            // kebab-case 검사 (소문자, 숫자, 하이픈만 허용)
            const isKebabCase = /^[a-z0-9-]+$/.test(folderName);

            if (!isKebabCase) {
                results.push(`[WARN] 폴더명 규칙 위반: '${folderName}' (소문자와 하이픈만 사용하는 kebab-case를 권장합니다.)`);
            }

            // 재귀적 탐색 (depth 제한 등 없이 단순 구현)
            const subResults = validateFolderNames(path.join(dirPath, folderName));
            results.push(...subResults);
        }
    });

    return results;
}

const targetPath = process.argv[2] || process.cwd();
const issues = validateFolderNames(targetPath);

if (issues.length === 0) {
    console.log(" 모든 폴더명이 규칙(kebab-case)을 잘 준수하고 있습니다.");
} else {
    // 중복 제거 및 출력
    [...new Set(issues)].forEach(issue => console.log(issue));
}
