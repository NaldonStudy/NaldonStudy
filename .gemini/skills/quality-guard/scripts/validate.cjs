const { execSync } = require('child_process');

function runCommand(command, name) {
  console.log(`\n--- Running ${name} (${command}) ---`);
  try {
    const stdout = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    console.log(`✅ ${name} passed.`);
    return { success: true, output: stdout };
  } catch (error) {
    console.log(`❌ ${name} failed.`);
    return { success: false, output: error.stdout || error.message };
  }
}

async function validate() {
  const results = [];

  // 1. Type Check
  results.push({ name: '타입 체크', ...runCommand('pnpm exec tsc --noEmit', 'Type Check') });

  // 2. Lint Check
  results.push({ name: '린트 체크', ...runCommand('pnpm lint', 'Lint Check') });

  // 3. Build Check
  results.push({ name: '빌드 체크', ...runCommand('pnpm build', 'Build Check') });

  console.log('\n### ✅ 최종 품질 검증 결과');
  let allPassed = true;
  results.forEach(res => {
    console.log(`* **${res.name}:** ${res.success ? '통과' : '실패'}`);
    if (!res.success) {
      allPassed = false;
      // Show first 10 lines of error for brevity
      const errorLines = res.output.split('\n').slice(0, 10).join('\n');
      console.log(`  > 에러 요약:\n${errorLines}\n`);
    }
  });

  if (allPassed) {
    console.log('\n[AI의견] 모든 검증이 완료되었습니다. 이제 안전하게 작업을 마무리할 수 있습니다.');
  } else {
    console.log('\n[AI의견] 검증 중 에러가 발견되었습니다. 위 에러를 수정한 후 다시 시도하십시오.');
    process.exit(1);
  }
}

validate();
