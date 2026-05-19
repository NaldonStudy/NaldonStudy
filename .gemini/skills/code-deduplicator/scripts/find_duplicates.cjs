const fs = require('fs');
const path = require('path');

/**
 * 간단한 중복 코드 탐색 스크립트
 * 사용법: node find_duplicates.cjs <directory_path>
 */

const targetDir = process.argv[2];
if (!targetDir) {
  console.error('오류: 대상 디렉토리 경로를 입력하세요.');
  process.exit(1);
}

const MIN_LINES = 5; // 최소 중복 라인 수

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

function scan() {
  const files = getFiles(targetDir);
  const codeBlocks = {}; // hash -> { file, startLine, content }

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    for (let i = 0; i <= lines.length - MIN_LINES; i++) {
      const block = lines.slice(i, i + MIN_LINES).join('\n');
      if (codeBlocks[block]) {
        if (!codeBlocks[block].seenIn) {
            codeBlocks[block].seenIn = [codeBlocks[block].file];
        }
        if (!codeBlocks[block].seenIn.includes(file)) {
            codeBlocks[block].seenIn.push(file);
        }
      } else {
        codeBlocks[block] = { file, startLine: i + 1, content: block };
      }
    }
  });

  const duplicates = Object.values(codeBlocks).filter(b => b.seenIn && b.seenIn.length > 1);

  if (duplicates.length === 0) {
    console.log('중복된 코드 블록을 찾지 못했습니다.');
  } else {
    console.log(`발견된 중복 블록: ${duplicates.length}개\n`);
    duplicates.forEach((dup, idx) => {
      console.log(`[중복 ${idx + 1}]`);
      console.log(`파일들: ${dup.seenIn.join(', ')}`);
      console.log(`내용 요약:\n${dup.content.substring(0, 100)}...\n`);
    });
  }
}

scan();
