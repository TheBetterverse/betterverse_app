async function getRate(){
      //Get updated exchange rate
      var requestURL = 'https://api.exchangerate.host/convert?from=USD&to=GBP';
      var request = new XMLHttpRequest();
      request.open('GET', requestURL);
      request.responseType = 'json';
      await request.send();

      request.onload = async function() {
        var response = request.response;
        if (response.result != null){
          await $setGlobalModel('exchangeUSDtoGBP', response.result);     
        }     
      }
}

(async () => {
  await getRate()
})()

return function(donationAmountUSD){
  var currentExchangeRate = $getGlobalModel('exchangeUSDtoGBP')
  var donationAmountGBP = donationAmountUSD * currentExchangeRate

  return donationAmountGBP
}


