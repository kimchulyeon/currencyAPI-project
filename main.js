//https://api.exchangerate-api.com/v4/latest/USD

// SELECT
const firstCountry = document.getElementById('currency-one')
const secondCountry = document.getElementById('currency-two')
// INPUT
const firstMoneyInput = document.getElementById('amount-one')
const secondMoneyInput = document.getElementById('amount-two')
// BTN
const btnEl = document.querySelector('.btn')
// RESULT
const resultBox = document.querySelector('.rate')

function calculate(){
  const firstCountryValue = firstCountry.value
  const secondCountryValue = secondCountry.value

  fetch(`https://api.exchangerate-api.com/v4/latest/${firstCountryValue}`)
  .then(res => res.json())
  .then(data => {
    //console.log(data.rates)
    //console.log(firstCountry.value)
    
    // 두번째 나라 input박스에 값 가져와야한다.
    // data.rates.두번째나라 or data.rates['두번째나라']
    //console.log(data.rates[secondCountryValue])
    // 두번째 input에 표시해주기
    secondMoneyInput.value = ( firstMoneyInput.value * data.rates[secondCountryValue] ).toFixed(2)
    // resultBox에 기본 환율 표시해주기
    resultBox.innerText = `1 ${firstCountryValue} = ${data.rates[secondCountryValue]} ${secondCountryValue}`
  })
}

firstCountry.addEventListener('change', calculate)
secondCountry.addEventListener('change', calculate)
firstMoneyInput.addEventListener('change', calculate)
secondMoneyInput.addEventListener('change', calculate)
btnEl.addEventListener('click', ()=> {
  let origin = firstCountry.value
  firstCountry.value = secondCountry.value
  secondCountry.value = origin
  //붙여줘야 버튼을 클릭할 때마다 자동으로 바껴져서 실행됨
  calculate()
})

// 페이지 로딩될 때마다 자동으로 실행
calculate()