import { test } from "@playwright/test";

// 2-1-G 헤더 시각 검증
test("header - desktop scroll", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "screenshots/desktop/header-initial.png", clip: { x: 0, y: 0, width: 1440, height: 80 } });
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(400);
  await page.screenshot({ path: "screenshots/desktop/header-scrolled.png", clip: { x: 0, y: 0, width: 1440, height: 80 } });
});

test("header - mobile menu", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "screenshots/mobile/header-closed.png", clip: { x: 0, y: 0, width: 390, height: 80 } });
  await page.getByRole("button", { name: "메뉴 열기" }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: "screenshots/mobile/header-menu-open.png" });
});

// 2-3-C 서브페이지 히어로 배너 시각 검증
test("subpage hero banner - desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/about");
  await page.waitForLoadState("networkidle");
  const hero = page.locator("section").first();
  await hero.screenshot({ path: "screenshots/desktop/subpage-banner.png" });
});

const pages = [
  { path: "/", name: "main" },
  { path: "/about", name: "about" },
  { path: "/worship", name: "worship" },
  { path: "/staff", name: "staff" },
  { path: "/newcomer", name: "newcomer" },
  { path: "/location", name: "location" },
  { path: "/media/sermons", name: "sermons" },
  { path: "/media/gallery", name: "gallery" },
];

for (const { path, name } of pages) {
  test(`screenshot ${name} - desktop`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: `screenshots/desktop/${name}.png`, fullPage: true });
  });

  test(`screenshot ${name} - tablet`, async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: `screenshots/tablet/${name}.png`, fullPage: true });
  });

  test(`screenshot ${name} - mobile`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: `screenshots/mobile/${name}.png`, fullPage: true });
  });
}
