import { expect, test } from "@playwright/test";

test.describe("Header Component", () => {
    test("displays the correct title", async ({ page }) => {
        await page.goto("/");
        const title = page.locator(".header__title");
        await expect(title).toHaveText("TuneTools");
    });

    test("navigation links are visible on desktop", async ({ page }) => {
        await page.goto("/");
        await page.setViewportSize({ width: 1280, height: 720 });
        const navLinks = page.locator(".header__nav-links a");
        await expect(navLinks).toHaveCount(4);
        await expect(navLinks.first()).toHaveText("Home");
        await expect(navLinks.nth(1)).toHaveText("Features");
        await expect(navLinks.nth(2)).toHaveText("About");
        await expect(navLinks.nth(3)).toHaveText("Contact");
    });

    test("menu button toggles sidenav on mobile", async ({ page }) => {
        await page.goto("/");
        await page.setViewportSize({ width: 375, height: 667 });
        const menuButton = page.locator(".header__menu-btn");
        await menuButton.click();
        const sidenav = page.locator(".main-content__sidenav");
        await expect(sidenav).toBeVisible();
        await page.mouse.click(365, 657);
        await expect(sidenav).toBeHidden();
    });
});

test.describe("Main Content Component", () => {
    test("sidenav links are accessible on mobile", async ({ page }) => {
        await page.goto("/");
        await page.setViewportSize({ width: 375, height: 667 });
        const menuButton = page.locator(".header__menu-btn");
        await menuButton.click();
        const navLinks = page.locator(
            ".main-content__sidenav .main-content__nav-link",
        );
        await expect(navLinks).toHaveCount(4);

        await expect(navLinks.nth(0)).toContainText("Home");
        await expect(navLinks.nth(1)).toContainText("Features");
        await expect(navLinks.nth(2)).toContainText("About");
        await expect(navLinks.nth(3)).toContainText("Contact");
    });
});

test.describe("Footer Component", () => {
    test("displays the current year", async ({ page }) => {
        await page.goto("/");
        const footerText = page.locator(".footer__text");
        const currentYear = new Date().getFullYear().toString();
        await expect(footerText).toContainText(currentYear);
    });
});