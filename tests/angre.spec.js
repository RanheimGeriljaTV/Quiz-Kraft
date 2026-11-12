// Ende-til-ende-test av «Angre» (Undo).
// Kjør: se «Tester» i README.md (npm install, npx playwright install chromium, npm test)
const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

// Appen virker rett fra fil (som når du dobbeltklikker index.html), så testen trenger ingen server.
const APP_URL = pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
const STORAGE_KEY = 'quiz_kraft_state_v1';

const lagretTilstand = page =>
  page.evaluate(key => JSON.parse(localStorage.getItem(key)), STORAGE_KEY);

const celle = (page, lag, runde) =>
  page.locator(`.score-input[data-team-idx="${lag}"][data-round-idx="${runde}"]`);

async function skrivPoeng(page, lag, runde, verdi) {
  await celle(page, lag, runde).fill(verdi);
  await celle(page, lag, runde).blur();
}

test.beforeEach(async ({ page }) => {
  await page.goto(APP_URL);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForSelector('.quiz-table');
});

test('Angre fjerner bare siste poeng: de andre poengene og den nye runden blir stående, også etter reload', async ({ page }) => {
  await page.click('#btn-add-round'); // 5 -> 6 runder
  const nyRunde = 5;
  await skrivPoeng(page, 0, nyRunde, '10');
  await skrivPoeng(page, 1, nyRunde, '4');
  await skrivPoeng(page, 2, nyRunde, '6');
  await skrivPoeng(page, 3, nyRunde, '77'); // skrivefeil

  await page.click('#btn-undo');

  const sjekk = async () => {
    const st = await lagretTilstand(page);
    expect(st.roundCount).toBe(6);
    expect(st.teams.slice(0, 4).map(t => t.scores[nyRunde])).toEqual(['10', '4', '6', '']);
    await expect(celle(page, 0, nyRunde)).toHaveValue('10');
    await expect(celle(page, 1, nyRunde)).toHaveValue('4');
    await expect(celle(page, 2, nyRunde)).toHaveValue('6');
    await expect(celle(page, 3, nyRunde)).toHaveValue('');
  };

  await sjekk();
  await page.reload();
  await page.waitForSelector('.quiz-table');
  await sjekk();
});

test('Ett angresteg per redigert celle, ikke per tastetrykk, og strukturendringen angres sist', async ({ page }) => {
  await page.click('#btn-add-round');
  await celle(page, 0, 5).pressSequentially('12');
  await celle(page, 0, 5).blur();
  await celle(page, 1, 5).pressSequentially('8,5');
  await celle(page, 1, 5).blur();

  // Første angring: bare «8,5» forsvinner, hele verdien på én gang.
  await page.click('#btn-undo');
  let st = await lagretTilstand(page);
  expect(st.teams[1].scores[5]).toBe('');
  expect(st.teams[0].scores[5]).toBe('12');
  expect(st.roundCount).toBe(6);

  // Andre angring: «12» forsvinner, runden står fortsatt.
  await page.click('#btn-undo');
  st = await lagretTilstand(page);
  expect(st.teams[0].scores[5]).toBe('');
  expect(st.roundCount).toBe(6);

  // Tredje angring: den nye runden forsvinner, og det er ikke mer å angre.
  await page.click('#btn-undo');
  st = await lagretTilstand(page);
  expect(st.roundCount).toBe(5);
  await expect(page.locator('#btn-undo')).toBeDisabled();
});

test('Å gå gjennom en celle uten å endre den lager ikke et angresteg', async ({ page }) => {
  await skrivPoeng(page, 0, 0, '3');
  await celle(page, 1, 0).focus();
  await celle(page, 1, 0).blur();
  await celle(page, 0, 0).focus();
  await celle(page, 0, 0).blur();

  await page.click('#btn-undo');
  const st = await lagretTilstand(page);
  expect(st.teams[0].scores[0]).toBe('');
  await expect(page.locator('#btn-undo')).toBeDisabled();
});
