import { expect, type Page } from "@playwright/test"
import { createBdd } from "playwright-bdd"

const { Given, When, Then, Step } = createBdd()

export const VALID_OWNER = {
  firstName: "Jean",
  lastName: "Dupont",
  address: "1 Rue de la Paix",
  city: "Paris",
  telephone: "0123456789",
}

export async function fillOwnerForm(page: Page, overrides: Partial<typeof VALID_OWNER>) {
  const owner = { ...VALID_OWNER, ...overrides }
  await page.getByLabel("First name").fill(owner.firstName)
  await page.getByLabel("Last name").fill(owner.lastName)
  await page.getByLabel("Address").fill(owner.address)
  await page.getByLabel("City").fill(owner.city)
  await page.getByLabel("Telephone").fill(owner.telephone)
}

async function submitOwnerForm(page: Page) {
  await page.getByRole("button", { name: "Register owner" }).click()
}

Given("the owner registration form is empty", async ({ page }) => {
  await page.goto("/owners/new")
})

Given("the owner registration form", async ({ page }) => {
  await page.goto("/owners/new")
})

Given("a successfully submitted registration", async ({ page }) => {
  await page.goto("/owners/new")
  await fillOwnerForm(page, {})
})

When(
  "clinic staff enters a valid first name, last name, address, city, and a 10-digit telephone number and submits",
  async ({ page }) => {
    await fillOwnerForm(page, {})
  }
)

When("clinic staff submits with one or more required fields left blank", async ({ page }) => {
  await fillOwnerForm(page, { firstName: "" })
  await submitOwnerForm(page)
})

When("clinic staff enters a first name or last name longer than 30 characters", async ({ page }) => {
  await fillOwnerForm(page, { firstName: "a".repeat(31) })
  await submitOwnerForm(page)
})

When("clinic staff enters an address longer than 255 characters", async ({ page }) => {
  await fillOwnerForm(page, { address: "a".repeat(256) })
  await submitOwnerForm(page)
})

When("clinic staff enters a city longer than 80 characters", async ({ page }) => {
  await fillOwnerForm(page, { city: "a".repeat(81) })
  await submitOwnerForm(page)
})

When(
  "clinic staff enters a telephone number that does not contain exactly 10 digits",
  async ({ page }) => {
    await fillOwnerForm(page, { telephone: "12345" })
    await submitOwnerForm(page)
  }
)

Step("the owner is saved", async ({ page }) => {
  await submitOwnerForm(page)
  await expect(page).toHaveURL(/\/owners\/[^/]+$/)
})

Then("the owner's details are displayed", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: `${VALID_OWNER.firstName} ${VALID_OWNER.lastName}` })
  ).toBeVisible()
  await expect(page.getByText(VALID_OWNER.address)).toBeVisible()
  await expect(page.getByText(VALID_OWNER.city)).toBeVisible()
  await expect(page.getByText(VALID_OWNER.telephone)).toBeVisible()
})

Then("the submission is rejected", async ({ page }) => {
  await expect(page).toHaveURL(/\/owners\/new$/)
})

Then("the user is shown which field\\(s) are missing", async ({ page }) => {
  await expect(page.getByText("First name is required")).toBeVisible()
})

Then("the user is shown that the field exceeds the allowed length", async ({ page }) => {
  await expect(page.getByText(/must be \d+ characters or fewer/)).toBeVisible()
})

Then("the user is shown that the telephone number is invalid", async ({ page }) => {
  await expect(page.getByText("Telephone must contain exactly 10 digits")).toBeVisible()
})

Then(
  "the system opens the newly created owner's details without further navigation by the user",
  async ({ page }) => {
    await expect(page).toHaveURL(/\/owners\/[^/]+$/)
    await expect(
      page.getByRole("heading", { name: `${VALID_OWNER.firstName} ${VALID_OWNER.lastName}` })
    ).toBeVisible()
  }
)
