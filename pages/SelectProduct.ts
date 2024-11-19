import { test,Page } from "@playwright/test"

const { expect } = require("@playwright/test")

const UserSelection = (page:Page)=>({

async chooseCategory(category: string){
    await page.locator('[id="sortfield"]').selectOption(category)
    await expect(await page.locator('[class="ec_product_page_sort"]')).toBeVisible()
    
},


async chooseProduct(itemName: string){
    const productTitle = page.locator('[class="ec_product_title_type1"]')
    const productLink = productTitle.getByRole('link', {name: itemName})

    const productCard = page.locator('[class="ec_product_li"]')
    await productCard.filter({has: productLink}).screenshot({animations: 'disabled', path: 'link.png'})
    await productCard.filter({has: productLink}).click()
    await expect(page.locator('[class="ec_details_content"]')).toBeVisible()
    await page.locator('[class="ec_details_content"]').screenshot({path: 'details.png'})
    
},

async signUp(
    buttonOne:string,
    userFirstName:string,
    userLastName:string, 
    userEmail:string,  
    userPassword: string, 
    buttonTwo:string){
    await page.getByRole('link', {name: buttonOne}).click()
    
    const firstName = await page.locator('[id="ec_account_register_first_name"]')
    await firstName.pressSequentially(userFirstName)

    const lastName = await page.locator('[id="ec_account_register_last_name"]')
    await lastName.pressSequentially(userLastName)

    const emailSection = await page.locator('[id="ec_account_register_email"]')
    await emailSection.pressSequentially(userEmail)
  
    const emailConfirm_Section = await page.locator('[id="ec_account_register_retype_email"]')
    await emailConfirm_Section.pressSequentially(userEmail)

    const password_Section = await page.locator('[id="ec_account_register_password"]')
    await password_Section.pressSequentially(userPassword)

    const retypePassword = await page.locator('[id="ec_account_register_password_retype"]')
    await retypePassword.pressSequentially(userPassword)


    const checkBox = await page.locator('[id="ec_account_register_is_subscriber"]')
    await checkBox.check()

    await page.getByRole('button', { name: buttonTwo }).click()

},


async multipleOrder(desiredItems:string[],buttonType:string){
   
        for (const desireditem of desiredItems){   
    
        const productCard = page.locator('[class="ec_product_li"]')
    
        const productCard_Number = await productCard.count()
    
    
        for(let i = 0; i< productCard_Number; i++){
          const targetItem = productCard.nth(i)
          const productTitle = targetItem.locator('[class="ec_product_title_type1"]')
          const productName = await productTitle.textContent()
    
          if(productName?.includes(desireditem))
    
            {
               await targetItem.getByRole('link', {name: buttonType}).click()
          }
    
        
      }
    }

},

async viewcart(button:string, displayMessage:string){
    expect(await page.locator('[class="ec_product_added_to_cart"]').textContent()).toContain(displayMessage)
    await page.getByRole('link',{name:button}).click()
},


async assertTable(desiredItems:string[]){
    const shopping_itemDetails = await page.locator('[class="ec_cart"]')
    await expect(await shopping_itemDetails).toBeVisible()
        for(const desiredItem of desiredItems){
    
    const rowsItem = shopping_itemDetails.locator('[class="ec_cartitem_row"]')
    const rowItem_count = await rowsItem.count()
    
    for (let i=0; i< rowItem_count; i++)
    {
      const targetRows = await rowsItem.nth(i)
      const targetRow_link =await targetRows.locator('[class="ec_cartitem_details"]').getByRole('link')
      if (await targetRow_link.textContent()=== desiredItem ){
    await expect (await targetRow_link).toBeVisible()
      }
    }
      
    }

},


async clickCheckout(buttonType:string){
    const cartTotals = page.locator('[id="ec_cart_totals"]')
const totalSection = await page.locator('[class="ec_cart_button_row ec_cart_button_row_checkout"]')
await expect(await cartTotals).toBeVisible()
await totalSection.getByRole('link',{name:buttonType}).click()
},


async fillCountry(countryName: string){
    const countryField = page.locator('[id="ec_cart_billing_country"]')
     await countryField.selectOption(countryName)

},


async fill_firstName(firstName: string){
    const firstName_field = page.locator('[id="ec_cart_billing_first_name"]')
await firstName_field.fill(firstName)
},


async fill_lastName(lastName:string){
    const lastName_field = page.locator('[id="ec_cart_billing_last_name"]')
await lastName_field.fill(lastName)
},

async fillCompanyName(companyName:string){
    const companyName_field = page.locator('[id="ec_cart_billing_company_name"]')
await companyName_field.fill(companyName)
},

async filladdress(address:string){
    const address_field = page.locator('[id="ec_cart_billing_address"]')
await address_field.fill(address)

},

async fillcity(city:string){
    const city_field = page.locator('[id="ec_cart_billing_city"]')
await city_field.fill(city)
},

async fillState(state:string){
    const state_field = page.locator('[id="ec_cart_billing_state"]')
await state_field.fill(state)
}




    })    


export default UserSelection;



