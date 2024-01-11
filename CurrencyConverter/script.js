const Base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown = document.querySelectorAll(".dropdown select")

const btn=document.querySelector("form button")
const fromCurr=document.querySelector("form select")
const toCurr=document.querySelector(".to select")
const msg=document.querySelector(".msg")

// for (let code  in countryList){
//     console.log(code,countryList[code]);
// }
window.addEventListener("load",()=>{
updateExchangeRate();
})


for (let select of dropdown) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");//create option tag
        newOption.innerText = currCode;//currCode is like "IND" and value is like same"IND"
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected"
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected"
        }
        select.append(newOption)//append in the select tag which are comming form the loop or codes.js 
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });

}

const updateFlag=(element)=>{
    // console.log(element) it has select tag
    let currCode=element.value//jo select krege wo he aayega
    // console.log(currCode) it has currency code
    let countryCode=countryList[currCode]
    // console.log(countryCode) // it has country code like"IN"

    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img =element.parentElement.querySelector("img");
    img.src=newSrc
}


btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    
})
const updateExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal===""||amtVal<1){
        amtVal=1;
        amount.value="1"
    }
    console.log(amtVal,amount.value,"amtVal")//100
    console.log(fromCurr.value,toCurr.value,"fromCurr")//INR
// })
    const URL =`${Base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;//INR
    let response= await fetch(URL)
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()]
    // console.log(rate)
    let FinalAmount =amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value}=${FinalAmount} ${toCurr.value}`;
}
