let nav = document.querySelector("nav") // Selects the <nav> element
let collapsibleNavBar = document.getElementsByClassName("collapsibleNavBar") // Selects elements with the class "collapsibleNavBar"
let i

// Attaches event listeners to the collapsibleNavBar elements
for (i = 0; i < collapsibleNavBar.length; i++) {
  collapsibleNavBar[i].addEventListener("click", function () {
    this.classList.toggle("active") // Toggles the "active" class
    let content = this.nextElementSibling // Selects the next sibling element
    if (content.style.display === "block") {
      content.style.display = "none"
      nav.style.marginBottom = "0px" // Updates the margin bottom of the <nav> element
    } else {
      content.style.display = "block"
      nav.style.marginBottom = "65px" // Updates the margin bottom of the <nav> element
    }
  })
}

// Selects various elements by their IDs or classes
let donutButton = document.images["donutButton"]
let purchaseAutoClicker = document.querySelector("#purchase-auto-clicker")
let autoClickerPriceSpan = document.querySelector("#auto-clicker-price")
let autoClickerSpan = document.querySelector("#auto-clickers-total")
let purchaseClickMultipliers = document.querySelector("#purchase-click-multiplier")
let clickMultiplierPriceSpan = document.querySelector("#click-multiplier-price")
let clickMultiplierSpan = document.querySelector("#click-multiplier")
let resetButton = document.querySelector("#reset-game-button")

// Attaches event listeners to the respective elements
donutButton.addEventListener("click", addDonut)
purchaseAutoClicker.addEventListener("click", purchaseAutoClickerCount)
purchaseClickMultipliers.addEventListener("click", purchaseClickMultiplier)
resetButton.addEventListener("click", resetGame)

// Selects the donut count element and initializes variables
let donutNumber = document.querySelector(".donut-count")
let donutCount = 0
let autoClickerPrice = 100
let autoClickerCount = 0
let clickMultiplierPrice = 10
let clickMultiplierCount = 0

updateAutoClickerButton() // Calls the function to update the auto-clicker button

// Updates the state of the auto-clicker button based on the donut count
function updateAutoClickerButton() {
  if (donutCount < autoClickerPrice) {
    purchaseAutoClicker.disabled = true
    purchaseAutoClicker.style.backgroundColor = "gray"
  } else {
    purchaseAutoClicker.disabled = false
    purchaseAutoClicker.style.backgroundColor = ""
  }
}

// Opens a modal with the specified ID
function openModal(modalId) {
  const modal = document.getElementById(`${modalId}Modal`)
  modal.style.display = "block"
}

// Closes a modal with the specified ID
function closeModal(modalId) {
  const modal = document.getElementById(`${modalId}Modal`)
  modal.style.display = "none"
}

// Event handler for adding a donut
function addDonut() {
  donutCount += Math.pow(1.2, clickMultiplierCount)
  donutNumber.innerText = numberWithCommas(Math.round(donutCount))
  updateAutoClickerButton()
}

// Retrieves the current donut count
function retrieveDonutCount() {
  return donutCount
}

// Event handler for purchasing an auto-clicker
function purchaseAutoClickerCount() {
  if (donutCount >= autoClickerPrice) {
    donutCount -= autoClickerPrice
    autoClickerCount += 1
    autoClickerPrice = Math.round(autoClickerPrice * 1.1)
    donutNumber.innerText = numberWithCommas(Math.round(donutCount))
    autoClickerPriceSpan.innerText = numberWithCommas(autoClickerPrice)
    autoClickerSpan.innerText = numberWithCommas(autoClickerCount)
    if (autoClickerCount <= 1) {
      activateAutoClickers()
    }
    updateAutoClickerButton()
  }
}

// Retrieves the current auto-clicker count
function retrieveAutoClickerCount() {
  return autoClickerCount
}

// Activates the auto-clickers to automatically add donuts
function activateAutoClickers() {
  setInterval(function () {
    donutCount += autoClickerCount * Math.pow(1.2, clickMultiplierCount)
    donutNumber.innerText = numberWithCommas(Math.round(donutCount))
  }, 1000)
}

// Event handler for purchasing a click multiplier
function purchaseClickMultiplier() {
  if (donutCount >= clickMultiplierPrice) {
    donutCount -= clickMultiplierPrice
    clickMultiplierCount += 1
    clickMultiplierPrice = Math.round(clickMultiplierPrice * 1.1)
    donutNumber.innerText = numberWithCommas(Math.round(donutCount))
    clickMultiplierPriceSpan.innerText = numberWithCommas(clickMultiplierPrice)
    clickMultiplierSpan.innerText = numberWithCommas(clickMultiplierCount)
  }
}

// Formats a number with commas
function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

// Resets the game by reloading the page
function resetGame() {
  location.reload()
}
