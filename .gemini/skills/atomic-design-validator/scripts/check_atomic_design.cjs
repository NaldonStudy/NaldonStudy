const fs = require('fs');
const path = require('path');

const ATOMIC_TIERS = ['atoms', 'molecules', 'organisms', 'templates', 'ui'];
const LARGE_FILE_THRESHOLD_KB = 15; // 15KB 이상이면 데이터 분리 권고

/**
 * 프로젝트 구조 및 Organism 무결성을 검사합니다.
 */
function validateStructure(projectRoot) {
    const componentsPath = path.join(projectRoot, 'components');
    const issues = [];

    if (!fs.existsSync(componentsPath)) return [];

    // 1. 최상위 폴더 이름 검사
    const tiers = fs.readdirSync(componentsPath, { withFileTypes: true });
    tiers.forEach(tier => {
        if (tier.isDirectory() && !ATOMIC_TIERS.includes(tier.name)) {
            issues.push(`[ERROR] 잘못된 계층 폴더: 'components/${tier.name}' (허용: ${ATOMIC_TIERS.join(', ')})`);
        }
    });

    // 2. Organisms 상세 검사
    const organismsPath = path.join(componentsPath, 'organisms');
    if (fs.existsSync(organismsPath)) {
        const organisms = fs.readdirSync(organismsPath, { withFileTypes: true });
        
        organisms.forEach(org => {
            const fullPath = path.join(organismsPath, org.name);
            
            // 폴더 기반 Organism인 경우
            if (org.isDirectory()) {
                const files = fs.readdirSync(fullPath);
                
                // index.tsx 존재 여부
                if (!files.includes('index.tsx')) {
                    issues.push(`[WARN] Organism 폴더 누락: '${org.name}' 폴더 내에 'index.tsx'가 없습니다.`);
                }

                // 파일별 크기 및 내용 검사
                files.forEach(file => {
                    const filePath = path.join(fullPath, file);
                    const stats = fs.statSync(filePath);
                    const sizeKB = stats.size / 1024;

                    if (sizeKB > LARGE_FILE_THRESHOLD_KB && !file.includes('data.ts')) {
                        issues.push(`[ADVICE] 파일이 비대함: '${org.name}/${file}' (${sizeKB.toFixed(2)}KB). 데이터를 *-data.ts로 분리하는 것을 권장합니다.`);
                    }

                    // index.tsx에서 dynamic import 확인
                    if (file === 'index.tsx') {
                        const content = fs.readFileSync(filePath, 'utf-8');
                        if (content.includes('Dialog') && !content.includes('next/dynamic')) {
                            issues.push(`[PERF] 지연 로딩 누락: '${org.name}/index.tsx'에서 Dialog(모달)를 사용하지만 next/dynamic이 보이지 않습니다.`);
                        }
                    }
                });
            } else if (org.isFile() && org.name.endsWith('.tsx')) {
                // 단일 파일 형태의 Organism인 경우 크기 검사
                const stats = fs.statSync(fullPath);
                const sizeKB = stats.size / 1024;
                if (sizeKB > 10) {
                    issues.push(`[REFACTOR] 폴더화 권고: '${org.name}' (${sizeKB.toFixed(2)}KB)가 비대합니다. 폴더 구조로 전환하고 쪼개십시오.`);
                }
            }
        });
    }

    return issues;
}

const root = process.cwd();
console.log(`\n🔍 Atomic Design & Domain Structure Audit 시작...`);
const issues = validateStructure(root);

if (issues.length === 0) {
    console.log("✅ 모든 구조 규칙이 잘 준수되고 있습니다.\n");
} else {
    console.log(`❌ ${issues.length}개의 구조적 권고/에러가 발견되었습니다:\n`);
    issues.forEach(issue => console.log(`  ${issue}`));
    console.log("");
}
