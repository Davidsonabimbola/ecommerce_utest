import { Page } from "@playwright/test"

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

}





}

)
export default UserSelection;



