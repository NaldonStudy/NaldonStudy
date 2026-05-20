const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, '../public/assets/projects');

async function convertDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await convertDir(fullPath);
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.svg') {
      const webpPath = fullPath.replace(/\.svg$/i, '.webp');
      
      try {
        console.log(`Converting: ${entry.name} -> ${entry.name.replace(/\.svg$/i, '.webp')}`);
        const startTime = Date.now();
        await sharp(fullPath)
          .webp({ quality: 80 }) // 갤러리 이미지에 충분히 선명하면서 용량이 대폭 줄어드는 80 품질 설정
          .toFile(webpPath);
        
        const origSize = fs.statSync(fullPath).size;
        const newSize = fs.statSync(webpPath).size;
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        
        console.log(`  └─ [성공] ${(origSize / 1024 / 1024).toFixed(2)} MB -> ${(newSize / 1024).toFixed(1)} KB (용량 ${( (1 - newSize / origSize) * 100 ).toFixed(1)}% 감소, 소요: ${duration}초)`);
      } catch (err) {
        console.error(`  └─ [실패] ${entry.name} 변환 중 에러 발생:`, err.message);
      }
    }
  }
}

async function main() {
  console.log('=== SVG to WebP 변환 프로세스 시작 ===');
  if (!fs.existsSync(targetDir)) {
    console.error(`대상 디렉토리를 찾을 수 없습니다: ${targetDir}`);
    return;
  }
  await convertDir(targetDir);
  console.log('=== 모든 이미지 변환 완료 ===');
}

main();
