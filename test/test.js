const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");
// async function example() {
//   let email = "mux@gmail.com";
//   let password = "muxMUXmux";
//   //To wait for browser to build and launch properly
//   let driver = await new Builder().forBrowser("chrome").build();
//   //To fetch http://google.com from the browser with our code.
//   await driver.get("http://localhost:3000/login");
//   //To send a search query by passing the value in searchString.
//   await driver.findElement(By.id("email")).sendKeys(email, Key.RETURN);
//   await driver.findElement(By.id("password")).sendKeys(password, Key.RETURN);
//   await driver.findElement(By.id("submit")).click();
//   //Verify the page title and print it
//   var title = await driver.getTitle();
//   console.log("Title is:", title);
//   //It is always a safe practice to quit the browser after execution
//   await driver.sleep(3000);
//   await driver.quit();
// }


async function registration(){
  let firstName="Aaksh";
  let LastName="Rao";
  let email="aakshrao@gmail.com";
  let password="aakashrao";
  let noteTitle="dan brown's";
  let noteContent ="Langdon novels Angels & Demons, The Da Vinci Code, The Lost Symbol, Inferno, and Origin."

  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/login");
  // await driver.findElement(By.id("first-name")).sendKeys(firstName);
  // await driver.findElement(By.id("last-name")).sendKeys(LastName);
  // await driver.findElement(By.id("email")).sendKeys(email);
  // await driver.findElement(By.id("password")).sendKeys(password);
  // await driver.findElement(By.id("confirm")).sendKeys(password);
  // await driver.findElement(By.id("submit")).click();
  // await driver.findElement(By.id("sign-in-button")).click();
  await driver.findElement(By.id("email")).sendKeys(email);
  await driver.findElement(By.id("password")).sendKeys(password);
  await driver.findElement(By.id("submit")).click();
  await driver.sleep(1000);
  await driver.findElement(By.id("note-title")).click();
  await driver.findElement(By.id("note-title")).sendKeys(noteTitle);
  await driver.findElement(By.id("note-content")).sendKeys(noteContent);
  await driver.findElement(By.id("note-submit")).click();
  await driver.sleep(1000);
  await driver.findElement(By.id("color-btn")).click();
  await driver.sleep(1000);
  await driver.findElement(By.id("8")).click();
  await driver.sleep(3000);
  await driver.quit();

}
registration();