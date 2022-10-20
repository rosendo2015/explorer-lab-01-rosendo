import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogoCard = document.querySelector(".cc-logo span:nth-child(2) img")
const ccBgColorCard = document.querySelector("#app section div.cc-bg")

function setCardType(type) {
  const colors = {
    visa: ["#436d99", "#2d57f2"],
    mastercard: ["#df6f29", "c69347"],
    americanExpress: ["#F4D011", "#F558E6"],
    hipercard: ["#700303", "#822124"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogoCard.setAttribute("src", `cc-${type}.svg`)
}
const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMascked = IMask(securityCode, securityCodePattern)

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
      /*
       */
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
}
const expirationDateMascked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    /*Ex. 4413 3851 7946 0736*/
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: "mastercard",
    },
    {
      /*3416 897927 81351 - 3455 821758 12024*/
      mask: "0000 000000 00000",
      regex: /^3[47]\d{1,2}(| |-)\d{6}\1\d{6}$/,
      cardType: "americanExpress",
    },
    {
      /*Ex.: 6062 8250 2846 4479*/
      mask: "0000 0000 0000 0000",
      regex: /^606282|^3841(?:[0|4|6]{1})0/,
      cardType: "hipercard",
    },
    /*  hipercard    */
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    //console.log(foundMask)
    return foundMask
  },
}
const cardNumberMascked = IMask(cardNumber, cardNumberPattern)

const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", ()=> {
  
  alert("Cartã adicionado.")
})

document.querySelector("form").addEventListener("submit", (event) => {
event.preventDefault();
})

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")

  ccHolder.innerText = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value; 
})

securityCodeMascked.on("accept", () => {
  updateSecurityCode(securityCodeMascked.value);
})
function updateSecurityCode(code){
  const ccSecurity = document.querySelector(".cc-security .value");

  ccSecurity.innerText = code.length === 0 ? "123" : code
}

cardNumberMascked.on("accept", () => {
const cardType = cardNumberMascked.masked.currentMask.cardType
setCardType(cardType)
updateCardNunber(cardNumberMascked.value)
})
function updateCardNunber(number){
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}
expirationDateMascked.on("accept", () => {
updateExprationDate(expirationDateMascked.value)

})
function updateExprationDate(date){
  const ccExpiration = document.querySelector(".cc-extra .value")
  ccExpiration.innerText = date.length === 0 ? "02/32" : date
}
