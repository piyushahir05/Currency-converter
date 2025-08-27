const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form .btn");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

window.addEventListener("load",()=>{
    updateExchangeRate();
})
for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFLag(evt.target)
    });
}
const updateFLag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
    });

const updateExchangeRate= async()=>{
     let amount = document.querySelector("form input");
    let amtVal = amount.value;
    if (amtVal == "" || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    }
    let to = toCurr.value.toLowerCase();
    let from = fromCurr.value.toLowerCase();
    const URL = `${BASE_URL}/${from}.json`;
    try {
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[from][to];
        let finalAmt = rate * amtVal;
         msg.innerText=`${amtVal}  ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
    }
    catch (err) {
        console.error("Fetch error:", err);
    }

}

  
