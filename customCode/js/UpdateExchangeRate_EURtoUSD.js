(async () => {

   //EUR -> USD
    var requestURL = 'https://api.exchangerate.host/convert?from=EUR&to=USD';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
      var response = request.response;
      $setGlobalModel('exchangeEURtoUSD', response.result);
    }

    //Exchange Rates Variables
    var exchangeEURtoUSD = $getGlobalModel('exchangeEURtoUSD');

    //Get EUR Projects
    let EUR_charityProjectRows = $getGrid('charityProjects').filter(row => row.$currency$display == "EUR") 

    //Do not update EUR Projects if value of exchange rate <=0 or null
    if(!exchangeEURtoUSD <= 0 || !exchangeEURtoUSD == null){
        
        //Loop through rows
        for (var i = 0; i < EUR_charityProjectRows.length; i++){

          if(EUR_charityProjectRows[i].$projectAccess$display == "Public" && EUR_charityProjectRows[i].charityCurrencyTreeCost != null){

            let pricePerTreeEUR = EUR_charityProjectRows[i].charityCurrencyTreeCost
            let pricePerTreeUSD = pricePerTreeEUR * exchangeEURtoUSD

            //Update exchange rate value
            $setDataGridVal("charityProjects", EUR_charityProjectRows[i].rowKey + ".pricePerTree", pricePerTreeUSD);
          }

        }
    }

})();