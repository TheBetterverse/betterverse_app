(async () => {

   //EUR -> USD

    var myHeaders = new Headers();
    myHeaders.append("apikey", "cHg1hzg5CveCJjBEjDMKTyICbehgNap5");

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    await fetch("https://api.apilayer.com/exchangerates_data/convert?to=USD&from=EUR&amount=1", requestOptions)
      .then(response => response.json())
      .then(result => $setGlobalModel('exchangeEURtoUSD', result.result))
      .catch(error => console.log('error', error));


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