function checkCashRegister() {
  let penny = Number(document.getElementById('penny').value)
  let nickel = Number(document.getElementById('nickel').value)
  let dime = Number(document.getElementById('dime').value)
  let quarter = Number(document.getElementById('quarter').value)
  let one = Number(document.getElementById('one').value)
  let five = Number(document.getElementById('five').value)
  let ten = Number(document.getElementById('ten').value)
  let twenty = Number(document.getElementById('twenty').value)
  let oneHundred = Number(document.getElementById('oneHundred').value)
  let productsPrice = Number(document.getElementById('productsPrice').value)
  let cashReceived = Number(document.getElementById('cashReceived').value)

  let answerHtml = document.getElementById('answer')

  let cid = [['PENNY', penny], [' NICKEL', nickel], [' DIME', dime], [' QUARTER', quarter], [' ONE', one], [' FIVE', five], [' TEN', ten], [' TWENTY', twenty], [' ONE HUNDRED', oneHundred]]; 

  let change = parseFloat(cashReceived*100) - parseFloat(productsPrice*100);
  let changedue = Math.max(change).toFixed(2)

  let cidTotal = 0;

  if (productsPrice > cashReceived) {
    return answerHtml.innerHTML = 'The money received is insufficient to pay for the products.'
  } else {
    for (let elem of cid){
      cidTotal += elem[1]*100
    } 
    if (changedue > cidTotal){
      return answerHtml.innerHTML = 'status: "INSUFFICIENT_FUNDS", change: 0'
    } else if (changedue === cidTotal) {
      return answerHtml.innerHTML = `status: "CLOSED", change: ${cid}`
    } else {
      let answer = [] 
      cid=cid.reverse()
      let moneyUnits = {' ONE HUNDRED': 10000, ' TWENTY': 2000, ' TEN': 1000, ' FIVE': 500,' ONE': 100, ' QUARTER': 25, ' DIME': 10, ' NICKEL': 5, 'PENNY': 1}
      for (let elem of cid){
        let holder = [elem[0], 0]
        elem[1]=elem[1]*100
        while (changedue >= moneyUnits[elem[0]] && elem[1] > 0){
          changedue -= moneyUnits[elem[0]]
          elem[1] -= moneyUnits[elem[0]]
          holder[1] += moneyUnits[elem[0]]/100
        }
        if (holder[1]>0){
          answer.push(holder[0])
          answer.push(holder[1].toFixed(2))
        }
      }
      if (changedue > 0){
        return answerHtml.innerHTML =  'status: "INSUFFICIENT_FUNDS", change: 0'
      }
        return answerHtml.innerHTML = `status: "OPEN", change: ${answer}`
  
    }
  }
}
 