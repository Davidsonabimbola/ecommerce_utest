import { test, expect } from '@playwright/test';
const {faker} = require('@faker-js/faker')


test.describe('find bugs on uTest',()=>{


  const enum buttonType {
    logoLink = 'AcademyBugs.com',
    productRating = 'Title Z-A',
    signUp = 'Sign Up'
    
      }

      type userDetails = {
        firstName: string,
        lastname: string,
        email: string,
        confirmemail : string,
        password: string,
        confirmpassword : string
      };


      const user: userDetails = {
        firstName: 'Bola',
        lastname: 'Cardoso',
        email: 'cardosk@yahoo.com',
        confirmemail: 'cardosk@yahoo.com',
        password: '12.Bricks.12',
        confirmpassword: '12.Bricks.12'
      }
      



  test.beforeEach(async ({ page }) => {
    await page.goto('https://academybugs.com/find-bugs/');
     await expect(await page.getByRole('link',{name: buttonType.logoLink})).toBeVisible()
     await expect(page.locator('[class="sq-site-title"]')).toBeVisible()
  });


 


  test('choose product category', async ({ page }) => {
    await page.locator('[id="sortfield"]').selectOption(buttonType.productRating)
    await expect(await page.locator('[class="ec_product_page_sort"]')).toBeVisible()
  
  });



  test('select product', async ({ page }) => {

    
    await page.goto('https://academybugs.com/find-bugs/');
    await expect(await page.getByRole('link',{name: buttonType.logoLink})).toBeVisible()
    await expect(page.locator('[class="sq-site-title"]')).toBeVisible()
    await page.locator('[id="sortfield"]').selectOption(buttonType.productRating)
    await expect(await page.locator('[class="ec_product_page_sort"]')).toBeVisible()

    const productTitle = page.locator('[class="ec_product_title_type1"]')
    const productLink = productTitle.getByRole('link', {name: 'DNK Yellow Shoes'})

    const productCard = page.locator('[class="ec_product_li"]')
    //await productCard.filter({has: productLink}).screenshot({animations: 'disabled', path: 'link.png'})
    await productCard.filter({has: productLink}).click()
    await expect(page.locator('[class="ec_details_content"]')).toBeVisible()
    await page.locator('[class="ec_details_content"]').screenshot({path: 'details.png'})

    // register/sign up
    await page.getByRole('link', {name: buttonType.signUp}).click()
    
    const firstName = await page.locator('[id="ec_account_register_first_name"]')
    await firstName.pressSequentially(user.firstName)

    const lastName = await page.locator('[id="ec_account_register_last_name"]')
    await lastName.pressSequentially(user.lastname)

    const emailSection = await page.locator('[id="ec_account_register_email"]')
    await emailSection.pressSequentially(user.email)
  
    const emailConfirm_Section = await page.locator('[id="ec_account_register_retype_email"]')
    await emailConfirm_Section.pressSequentially(user.confirmemail)

    const password_Section = await page.locator('[id="ec_account_register_password"]')
    await password_Section.pressSequentially(user.password)

    const retypePassword = await page.locator('[id="ec_account_register_password_retype"]')
    await retypePassword.pressSequentially(user.confirmpassword)


    const checkBox = await page.locator('[id="ec_account_register_is_subscriber"]')
    await checkBox.check()

    await page.getByRole('button', { name: 'REGISTER' }).click()
  });


})




