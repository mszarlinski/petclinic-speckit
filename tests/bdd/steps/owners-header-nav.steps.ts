import { expect, type Page } from "@playwright/test"
import { createBdd } from "playwright-bdd"
import { fillOwnerForm } from "./register-owner.steps"

const { Given, When, Then } = createBdd()

async function openOwnersMenu(page: Page) {
  await page.getByRole("button", { name: "Owners" }).click()
}

async function selectAddNew(page: Page) {
  await page.getByRole("menuitem", { name: "Add new" }).click()
}

Given("I am on the owner registration page reached via the header", async ({ page }) => {
  await page.goto("/")
  await openOwnersMenu(page)
  await selectAddNew(page)
})

Given("I have just registered an owner via the header", async ({ page }) => {
  await page.goto("/")
  await openOwnersMenu(page)
  await selectAddNew(page)
  await fillOwnerForm(page, {})
  await page.getByRole("button", { name: "Register owner" }).click()
  await expect(page).toHaveURL(/\/owners\/[^/]+$/)
})

Given("I am on the homepage with a narrow viewport", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto("/")
})

When("I open the {string} menu in the header", async ({ page }, menuName: string) => {
  await page.getByRole("button", { name: menuName }).click()
})

When(
  "I select {string} from the {string} menu",
  async ({ page }, itemName: string, _menuName: string) => {
    await page.getByRole("menuitem", { name: itemName }).click()
  }
)

When("I navigate to owner registration using only the header", async ({ page }) => {
  await openOwnersMenu(page)
  await selectAddNew(page)
})

When("I submit a valid owner registration", async ({ page }) => {
  await fillOwnerForm(page, {})
  await page.getByRole("button", { name: "Register owner" }).click()
})

Then(
  "I should see an {string} entry in the header distinct from {string}",
  async ({ page }, ownersLabel: string, homeLabel: string) => {
    await expect(page.getByRole("button", { name: ownersLabel })).toBeVisible()
    await expect(page.getByRole("link", { name: homeLabel })).toBeVisible()
  }
)

Then(
  "I should see an {string} item inside the {string} menu",
  async ({ page }, itemName: string, _menuName: string) => {
    await expect(page.getByRole("menuitem", { name: itemName })).toBeVisible()
  }
)

Then("I should be on the owner registration page with the form ready", async ({ page }) => {
  await expect(page).toHaveURL(/\/owners\/new$/)
  await expect(page.getByRole("heading", { name: "Register an owner" })).toBeVisible()
})

Then(
  "the owner is saved without ever navigating to the registration page by its address",
  async ({ page }) => {
    await expect(page).toHaveURL(/\/owners\/[^/]+$/)
  }
)

Then("the {string} entry in the header shows an active state", async ({ page }, label: string) => {
  await expect(page.getByRole("button", { name: label })).toHaveAttribute("aria-current", "page")
})

Then(
  "the {string} item inside the {string} menu is fully visible on screen",
  async ({ page }, itemName: string, _menuName: string) => {
    await expect(page.getByRole("menuitem", { name: itemName })).toBeVisible()
  }
)
