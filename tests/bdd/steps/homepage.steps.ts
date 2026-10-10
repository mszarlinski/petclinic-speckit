import { createBdd } from "playwright-bdd";

const { Given, Then } = createBdd();

Given("I am on the homepage", async ({ page }) => {
  await page.goto("/");
});

Then("I should see the heading {string}", async ({ page }, heading: string) => {
  await page.getByRole("heading", { name: heading }).waitFor();
});
