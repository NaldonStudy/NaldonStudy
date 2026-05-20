const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const portfolioDir = path.join(__dirname, '../public/assets/projects/portfolio');
const srcPng = path.join(portfolioDir, 'portfolio-intro.png');
const destWebp = path.join(portfolioDir, 'portfolio-intro.webp');
const oldWebp = path.join(portfolioDir, 'thumbnail.webp');

async function run() {
  console.log('=== 포트폴리오 메인 이미지 교체 및 최적화 시작 ===');
  
  if (!fs.existsSync(srcPng)) {
    console.error(`[오류] 소스 파일이 존재하지 않습니다: ${srcPng}`);
    process.exit(1);
  }

  // 1. png -> webp 최적화 변환
  try {
    await sharp(srcPng)
      .webp({ quality: 85 })
      .toFile(destWebp);
    console.log(`[성공] portfolio-intro.png -> portfolio-intro.webp 변환 완료`);
  } catch (err) {
    console.error('[오류] 이미지 변환 실패:', err.message);
    process.exit(1);
  }

  // 2. 기존 임시 thumbnail.webp 삭제
  if (fs.existsSync(oldWebp)) {
    try {
      fs.unlinkSync(oldWebp);
      console.log(`[성공] 기존 임시 thumbnail.webp 파일 삭제 완료`);
    } catch (err) {
      console.warn('[경고] 기존 thumbnail.webp 삭제 실패:', err.message);
    }
  }

  console.log('=== 포트폴리오 이미지 교체 프로세스 완료 ===');
}

run();
