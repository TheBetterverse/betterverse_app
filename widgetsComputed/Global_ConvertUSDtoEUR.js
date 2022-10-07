async function getRate(){
      //Get updated exchange rate
      var requestURL = 'https://api.exchangerate.host/convert?from=USD&to=EUR';
      var request = new XMLHttpRequest();
      request.open('GET', requestURL);
      request.responseType = 'json';
      await request.send();

      request.onload = async function() {
        var response = request.response;
        if (response.result != null){
          await $setGlobalModel('exchangeUSDtoEUR', response.result);     
        }     
      }
}

(async () => {
  await getRate()
})()

return function(donationAmountUSD){
  var currentExchangeRate = $getGlobalModel('exchangeUSDtoEUR')
  var donationAmountEUR = donationAmountUSD * currentExchangeRate

  return donationAmountEUR
}


