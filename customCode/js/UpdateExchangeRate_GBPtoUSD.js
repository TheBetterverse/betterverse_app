(async () => {

    //GBP -> USD

    var myHeaders = new Headers();
    myHeaders.append("apikey", "cHg1hzg5CveCJjBEjDMKTyICbehgNap5");

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    await fetch("https://api.apilayer.com/exchangerates_data/convert?to=USD&from=GBP&amount=1", requestOptions)
      .then(response => response.json())
      .then(result => $setGlobalModel('exchangeGBPtoUSD', result.result))
      .catch(error => console.log('error', error));

    //Exchange Rates Variables
    var exchangeGBPtoUSD = $getGlobalModel('exchangeGBPtoUSD');

    console.log(exchangeGBPtoUSD)

    //Get GBP Projects
    let GBP_charityProjectRows = $getGrid('charityProjects').filter(row => row.$currency$display == "GBP") 

    //Do not update GBP Projects if value is <=0 or null
    if(!exchangeGBPtoUSD <= 0 || !exchangeGBPtoUSD == null){
        
        //Loop through rows
        for (var i = 0; i < GBP_charityProjectRows.length; i++){

          if(GBP_charityProjectRows[i].$projectAccess$display == "Public" && GBP_charityProjectRows[i].charityCurrencyTreeCost != null){

            let pricePerTreeGBP = GBP_charityProjectRows[i].charityCurrencyTreeCost
            let pricePerTreeUSD = pricePerTreeGBP * exchangeGBPtoUSD

            //Update exchange rate value
            $setDataGridVal("charityProjects", GBP_charityProjectRows[i].rowKey + ".pricePerTree", pricePerTreeUSD);
        }
        }
    }
    
})();