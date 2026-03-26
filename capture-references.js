const { chromium } = require('playwright');

const MAIN_URL   = 'https://www.sansung.org/main';
const SUBPAGE_URL = 'https://www.sansung.org/introduce';
const OUT = `${__dirname}/references`;

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet:  { width: 768,  height: 1024 },
  mobile:  { width: 390,  height: 844 },
};

// ── sansung.org 실제 섹션 좌표 (inspect-page.js 결과 기반) ──
// header  : y=0,    h=106
// hero    : y=106,  h=607   (주일예배 + 퀵액션 포함)
// community: y=713, h=375
// unknown : y=1088, h=636
// contents: y=1724, h=1269
// gallery : y=2993, h=681
// footer  : y=3674, h=394

async function goto(page, url) {
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(1500); // 애니메이션/이미지 대기
}

async function clip(page, y, h, filePath, w = 1440) {
  // 해당 y 위치가 뷰포트 안에 오도록 스크롤
  await page.evaluate((scrollY) => window.scrollTo(0, Math.max(0, scrollY - 50)), y);
  await page.waitForTimeout(300);
  const scrolled = await page.evaluate(() => window.scrollY);
  await page.screenshot({
    path: filePath,
    clip: { x: 0, y: y - scrolled, width: w, height: Math.min(h, 1400) },
  });
}

async function run() {
  const browser = await chromium.launch({ channel: 'chrome' });

  // ════════════════════════════════════════════
  // DESKTOP (1440px)
  // ════════════════════════════════════════════
  {
    const page = await browser.newPage();
    await page.setViewportSize(VIEWPORTS.desktop);
    await goto(page, MAIN_URL);

    // 전체 페이지
    await page.screenshot({ path: `${OUT}/pages/main-full.png`, fullPage: true });
    console.log('✅ pages/main-full.png');

    // 헤더 — 최상단
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/desktop/07-header-top.png`, clip: { x: 0, y: 0, width: 1440, height: 106 } });
    console.log('✅ desktop/07-header-top.png');

    // 헤더 — 스크롤 후 (sticky 상태)
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/desktop/07-header-scroll.png`, clip: { x: 0, y: 0, width: 1440, height: 106 } });
    console.log('✅ desktop/07-header-scroll.png');

    // 히어로 섹션 (section_first, y=106, h=607)
    await clip(page, 106, 607, `${OUT}/desktop/01-hero.png`);
    console.log('✅ desktop/01-hero.png');

    // 퀵 액션 — 히어로 하단 영역 (빠른 링크 바)
    // "처음 오셨나요 / 예배시간" 텍스트가 히어로 내부에 위치
    const qaRect = await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll('*')).find(e =>
        (e.innerText || '').includes('처음 오셨나요') && e.children.length > 1
      );
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { y: Math.round(r.top + window.scrollY), h: Math.round(r.height) };
    });
    if (qaRect && qaRect.h > 20) {
      await clip(page, qaRect.y, qaRect.h + 40, `${OUT}/desktop/02-quick-actions.png`);
      console.log('✅ desktop/02-quick-actions.png');
    } else {
      // fallback: 히어로 하단 200px
      await clip(page, 106 + 607 - 200, 200, `${OUT}/desktop/02-quick-actions.png`);
      console.log('✅ desktop/02-quick-actions.png (fallback)');
    }

    // 공동체 섹션 (y=713 타이틀 + y=1088 아이콘 카드 그리드 — 연결 캡처)
    await clip(page, 713, 375 + 636, `${OUT}/desktop/03-community.png`);
    console.log('✅ desktop/03-community.png');

    // 콘텐츠 영상 섹션 (y=1724, h=1269)
    await clip(page, 1724, 1269, `${OUT}/desktop/04-contents.png`);
    console.log('✅ desktop/04-contents.png');

    // 포토 갤러리 섹션 (y=2993, h=681)
    await clip(page, 2993, 681, `${OUT}/desktop/05-gallery.png`);
    console.log('✅ desktop/05-gallery.png');

    // 푸터 (y=3674, h=394)
    await clip(page, 3674, 394, `${OUT}/desktop/06-footer.png`);
    console.log('✅ desktop/06-footer.png');

    // 서브페이지 히어로 배너
    await goto(page, SUBPAGE_URL);
    await page.evaluate(() => window.scrollTo(0, 0));
    // 첫 번째 section_wrap이 서브페이지 배너
    const bannerH = await page.evaluate(() => {
      const el = document.querySelector('.section_first, .section_wrap');
      return el ? Math.round(el.getBoundingClientRect().height) : 350;
    });
    await page.screenshot({ path: `${OUT}/desktop/08-subpage-banner.png`, clip: { x: 0, y: 106, width: 1440, height: bannerH || 350 } });
    console.log('✅ desktop/08-subpage-banner.png');

    await page.close();
  }

  // ════════════════════════════════════════════
  // TABLET (768px)
  // ════════════════════════════════════════════
  {
    const page = await browser.newPage();
    await page.setViewportSize(VIEWPORTS.tablet);
    await goto(page, MAIN_URL);

    await page.screenshot({ path: `${OUT}/tablet/01-main-full.png`, fullPage: true });
    console.log('✅ tablet/01-main-full.png');

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `${OUT}/tablet/02-hero.png`, clip: { x: 0, y: 0, width: 768, height: 700 } });
    console.log('✅ tablet/02-hero.png');

    // 태블릿 메뉴 (MENU 텍스트 버튼)
    try {
      const menuBtn = page.locator('div.icon_type_menu, button.navbar-toggle:not(.close), [class*="menu_open"]').first();
      await menuBtn.click({ timeout: 4000 });
      await page.waitForTimeout(600);
      await page.screenshot({ path: `${OUT}/tablet/03-menu.png` });
      console.log('✅ tablet/03-menu.png');
    } catch {
      console.warn('⚠️  tablet: menu button not found');
    }

    await page.close();
  }

  // ════════════════════════════════════════════
  // MOBILE (390px)
  // ════════════════════════════════════════════
  {
    const page = await browser.newPage();
    await page.setViewportSize(VIEWPORTS.mobile);
    await goto(page, MAIN_URL);

    await page.screenshot({ path: `${OUT}/mobile/01-hero-mobile.png`, clip: { x: 0, y: 0, width: 390, height: 700 } });
    console.log('✅ mobile/01-hero-mobile.png');

    await page.evaluate(() => window.scrollTo(0, 900));
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/mobile/03-cards-mobile.png`, clip: { x: 0, y: 0, width: 390, height: 844 } });
    console.log('✅ mobile/03-cards-mobile.png');

    // 모바일 메뉴
    try {
      const menuBtn = page.locator('div.icon_type_menu, .mobile_menu_btn, [class*="ham"]').first();
      await menuBtn.click({ timeout: 4000 });
      await page.waitForTimeout(600);
      await page.screenshot({ path: `${OUT}/mobile/02-menu-mobile.png` });
      console.log('✅ mobile/02-menu-mobile.png');
    } catch {
      console.warn('⚠️  mobile: menu button not found');
    }

    await page.close();
  }

  await browser.close();
  console.log('\n🎉 레퍼런스 스크린샷 캡처 완료 → references/');
}

run().catch(err => { console.error(err); process.exit(1); });
