// @ts-check
import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page).toHaveScreenshot();
});
