import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:8888/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Boorista - a coffee journal app/);
});

test('create new brew', async ({ page }) => {
  await page.goto('http://localhost:8888/');
  await page.getByRole('button', { name: 'Add new brew' }).click();
  await page.getByPlaceholder('Name', { exact: true }).fill('test-brew');
  await page.locator('[aria-label="rating 3"]').click();
  await page.getByPlaceholder('Modellname').fill('test-sage');
  await page.getByText('2 Cup').click();
  await page.getByPlaceholder('Size').fill('3');
  await page.getByLabel('Grind Amount*').fill('2');
  await page.getByPlaceholder('Beschreibung zu Geschmack der').fill('blahblah');
  // await page.getByRole('button', { name: 'Save' }).click();
  // await page.waitForURL('**/brews');

  // await expect(page.locator('text=test-brew')).toBeVisible();
});

test('display error messages when required fields are empty or website is invalid', async ({ page }) => {
  await page.goto('http://localhost:8888/');
  await page.getByRole('button', { name: 'Add new brew' }).click();

  // Attempt to submit the form without filling the required fields
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.locator('text=Coffee bean name is required')).toBeVisible();
  await expect(page.locator('text=Brewing Method / coffee machine is required')).toBeVisible();
  await expect(page.locator('text=Please choose a cup size')).toBeVisible();
  await expect(page.locator('text=Grind size is required')).toBeVisible();
  await expect(page.locator('text=Grind amount is required')).toBeVisible();

  await page.getByPlaceholder('Name', { exact: true }).fill('Test-Kaffee');
  await page.getByPlaceholder('https://awesome-coffee.com').fill('aksldjfajsdlk');

  await expect(page.locator('text=Invalid URL (Example: https://awesome-coffee.com)')).toBeVisible();

  await page.getByPlaceholder('https://awesome-coffee.com').fill('https://vicafe.ch');
  await page.getByPlaceholder('Modellname').fill('Sage');
  await page.getByLabel('1 Cup').check();
  await page.getByPlaceholder('Size').fill('4');
  await page.getByLabel('Grind Amount*').fill('3');
  // await page.getByRole('button', { name: 'Save' }).click();
  // await page.waitForURL('**/brews');

  // await expect(page.locator('text=Test-Kaffee')).toBeVisible();
});

test('links all correct in the navigation and lead to the correct page', async ({ page }) => {
  await page.goto('http://localhost:8888/');

  await page.click('text=Brews');
  await expect(page).toHaveURL('http://localhost:8888/brews');
  await expect(page.getByRole('heading', { name: 'Last Brews' })).toBeVisible();

  await page.click('text=Favs');
  await expect(page).toHaveURL('http://localhost:8888/favs');
  await expect(page.getByRole('heading', { name: 'Favs' })).toBeVisible();

  await page.click('text=Statistics');
  await expect(page).toHaveURL('http://localhost:8888/statistics');
  await expect(page.getByRole('heading', { name: 'Statistik' })).toBeVisible();

  await page.click('text=Rezepte');
  await expect(page).toHaveURL('http://localhost:8888/rezepte');
  await expect(page.getByRole('heading', { name: 'Rezepte' })).toBeVisible();

  await page.click('text=Lexikon');
  await expect(page).toHaveURL('http://localhost:8888/lexikon');
  await expect(page.getByRole('heading', { name: 'Lexikon' })).toBeVisible();

  await page.click('text=Impressum');
  await expect(page).toHaveURL('http://localhost:8888/impressum');
  await expect(page.getByRole('heading', { name: 'Impressum' })).toBeVisible();

  await page.click('text=Datenschutz');
  await expect(page).toHaveURL('http://localhost:8888/privacy');
  await expect(page.getByRole('heading', { name: 'Datenschutz' })).toBeVisible();
});

test('button "add new brew" available on landing and brews page and forward to correct page', async ({ page }) => {
  await page.goto('http://localhost:8888/');
  await page.getByRole('button', { name: 'Add new brew' }).click();
  await expect(page).toHaveURL('http://localhost:8888/brews/create-brew');
  await expect(page.getByRole('heading', { name: 'New Brew' })).toBeVisible();

  await page.goto('http://localhost:8888/brews');
  await page.getByRole('button', { name: 'Add new brew' }).click();
  await expect(page).toHaveURL('http://localhost:8888/brews/create-brew');
  await expect(page.getByRole('heading', { name: 'New Brew' })).toBeVisible();
});
