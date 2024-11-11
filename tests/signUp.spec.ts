import { test, expect } from '@playwright/test';
//const {faker} = require('@faker-js/faker')
import { faker } from '@faker-js/faker';




test.describe('find bugs on uTest',()=>{


  const enum buttonType {
    logoLink = 'AcademyBugs.com',
    productRating = 'Title Z-A',
    signUp = 'Sign Up',
    firstOrder = 'Dark Grey Jeans',
    add_To_Cart = 'ADD TO CART',
    checkOut = 'CHECKOUT NOW',
    register = 'REGISTER',
    checkout = 'Checkout'
    
      }



      const nigeriaCities = [
        'Lagos',
        'Abia',
        'Ibadan',
        'Port-Harcourt',
        'Benin',
        'Minna',
        'Suleja',
        'Abeokuta',
        'Ijebu-Ode',
        'Ogbomosho',
        'Sokoto',
        'Kaduna'
      ]

      const randomCityinNigeria = faker.helpers.arrayElement(nigeriaCities)
      const countryName = 'Poland'
      

      type userDetails = {
        firstName: string,
        lastname: string,
        email: string,
        password: any,
        companyName: string,
        address: any,
        city: string,
        state: string,
        zipCode: string
        phoneNumber: any,
        city2: string,
       
       
      };


      const user: userDetails = {
        firstName: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        companyName: faker.company.name(),
        address: faker.location.streetAddress(),
        city: randomCityinNigeria,
        city2: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        phoneNumber: faker.phone.number(),
        
        
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
    await emailConfirm_Section.pressSequentially(user.email)

    const password_Section = await page.locator('[id="ec_account_register_password"]')
    await password_Section.pressSequentially(user.password)

    const retypePassword = await page.locator('[id="ec_account_register_password_retype"]')
    await retypePassword.pressSequentially(user.password)


    const checkBox = await page.locator('[id="ec_account_register_is_subscriber"]')
    await checkBox.check()

    await page.getByRole('button', { name: buttonType.register }).click()
  });





  test('single order with selecting location', async ({ page }) => {
    test.setTimeout(400000)
    
    await page.goto('https://academybugs.com/find-bugs/');
    await expect(await page.getByRole('link',{name: buttonType.logoLink})).toBeVisible()
    await expect(page.locator('[class="sq-site-title"]')).toBeVisible()
    const productTitle = page.locator('[class="ec_product_title_type1"]')
    const productLink = productTitle.getByRole('link', {name: buttonType.firstOrder})

    const productCard = page.locator('[class="ec_product_li"]')
    await productCard.filter({has: productLink}).screenshot({animations: 'allow', path: 'link.png'})
    const targetProduct = await productCard.filter({has: productLink})
    const productPrice = targetProduct.locator('[class="ec_price_type1"]')
    console.log(await productPrice.textContent())
await targetProduct.getByRole('link', {name: buttonType.add_To_Cart}).click()
await expect(targetProduct.locator('[class="ec_product_successfully_added"]')).toBeVisible()
await targetProduct.locator('[class="ec_product_successfully_added"]').screenshot({animations:'allow', path: 'sucessMessage.png'})
await targetProduct.getByRole('link', {name: buttonType.checkOut}).click()
await expect (page.locator('[id="main"]')).toBeVisible()
const shippingCost = page.locator('[id="ec_cart_shipping"]')
console.log(await shippingCost.textContent())

await page.getByRole('link',{name: 'Checkout'}).click()

await expect(page.getByRole('link', {name: 'CHECKOUT DETAILS'})).toBeVisible()


//checkout details


const countryField = page.locator('[id="ec_cart_billing_country"]')
 const countryPick = await countryField.selectOption(countryName)

if(countryPick.includes('Nigeria')){
  const firstName_field = page.locator('[id="ec_cart_billing_first_name"]')
await firstName_field.fill(user.firstName)

const lastName_field = page.locator('[id="ec_cart_billing_last_name"]')
await lastName_field.fill(user.lastname)

const companyName_field = page.locator('[id="ec_cart_billing_company_name"]')
await companyName_field.fill(user.companyName)

const address_field = page.locator('[id="ec_cart_billing_address"]')
await address_field.fill(user.address)


const city_field = page.locator('[id="ec_cart_billing_city"]')
await city_field.fill(user.city)


const state_field = page.locator('[id="ec_cart_billing_state"]')
await state_field.fill(user.state)

}

else{

  const countryField = page.locator('[id="ec_cart_billing_country"]')
await countryField.selectOption(countryName)

const firstName_field = page.locator('[id="ec_cart_billing_first_name"]')
await firstName_field.fill(user.firstName)

const lastName_field = page.locator('[id="ec_cart_billing_last_name"]')
await lastName_field.fill(user.lastname)

const companyName_field = page.locator('[id="ec_cart_billing_company_name"]')
await companyName_field.fill(user.companyName)

const address_field = page.locator('[id="ec_cart_billing_address"]')
await address_field.fill(user.address)


const city_field = page.locator('[id="ec_cart_billing_city"]')
await city_field.fill(user.city2)


const state_field = page.locator('[id="ec_cart_billing_state"]')
await state_field.fill(user.state)

}


  })





})




