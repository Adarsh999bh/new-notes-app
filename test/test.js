const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");
async function example() {
  let email = "mux@gmail.com";
  let password = "muxMUXmux"
  //To wait for browser to build and launch properly
  let driver = await new Builder().forBrowser("chrome").build();
  //To fetch http://google.com from the browser with our code.
  await driver.get("http://localhost:3000/login");
  //To send a search query by passing the value in searchString.
  await driver.findElement(By.id("email")).sendKeys(email, Key.RETURN);
  await driver.findElement(By.id("password")).sendKeys(password, Key.RETURN);
  await driver.findElement(By.id("submit")).click();
  //Verify the page title and print it
  var title = await driver.getTitle();
  console.log("Title is:", title);
  //It is always a safe practice to quit the browser after execution
  await driver.sleep(3000);
  await driver.quit();
}
example();