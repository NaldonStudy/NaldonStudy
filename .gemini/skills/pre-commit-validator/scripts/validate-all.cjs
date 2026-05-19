const { execSync } = require('child_process');
const path = require('path');

function runCommand(command, name) {
  console.log(`\n>>> [${name}] 실행 중: ${command}`);
  try {
    const stdout = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    return { success: true, output: stdout };
  } catch (error) {
    return { success: false, output: error.stdout || error.message };
  }
}

async function runAllChecks() {
  const projectRoot = process.cwd();
  const results = [];

  // 1. 타입 체크
  results.push({ name: '타입 체크', ...runCommand('pnpm exec tsc --noEmit', 'Type Check') });

  // 2. 린트 체크
  results.push({ name: '린트 체크', ...runCommand('pnpm lint', 'Lint Check') });

  // 3. 빌드 체크 (next build 직접 호출 권장)
  results.push({ name: '빌드 체크', ...runCommand('pnpm exec next build', 'Build Check') });

  // 4. Atomic Design 구조 검사
  results.push({ 
    name: '구조 (Atomic)', 
    ...runCommand(`node .gemini/skills/atomic-design-validator/scripts/check_atomic_design.cjs .`, 'Atomic Design') 
  });

  // 5. 폴더 명명 규칙 검사
  results.push({ 
    name: '폴더 명명', 
    ...runCommand(`node .gemini/skills/folder-naming-validator/scripts/check_folder_names.cjs .`, 'Folder Naming') 
  });

  // 6. 함수/컴포넌트 명명 규칙 검사
  results.push({ 
    name: '함수 명명', 
    ...runCommand(`node .gemini/skills/function-naming-validator/scripts/validate_functions.cjs .`, 'Function Naming') 
  });

  console.log('\n' + '='.repeat(50));
  console.log('🛡️ 깃 푸시 전 통합 검증 결과 요약');
  console.log('='.repeat(50));

  let allPassed = true;
  results.forEach(res => {
    const status = res.success ? '✅ 통과' : '❌ 실패';
    console.log(`${res.name.padEnd(12)} : ${status}`);
    if (!res.success) {
      allPassed = false;
      const errorLines = res.output.split('\n').slice(0, 5).join('\n');
      console.log(`   > 에러 요약: ${errorLines}...\n`);
    } else if (res.output.includes('[WARN]')) {
       // Warn이 포함된 경우 출력 (성공으로 간주되나 주의 필요)
       console.log(`   > 경고 사항 존재 (확인 권장)\n`);
    }
  });

  console.log('='.repeat(50));
  if (allPassed) {
    console.log('\n[AI의견] 모든 핵심 검증을 통과했습니다. 안전하게 커밋하고 푸시하셔도 좋습니다.');
  } else {
    console.log('\n[AI의견] 일부 검증 항목에서 실패가 발생했습니다. 위 내용을 수정하신 후 다시 검증해 주세요.');
    process.exit(1);
  }
}

runAllChecks();
