(async () => {

    //GBP -> USD
    var requestURL = 'https://api.exchangerate.host/convert?from=GBP&to=USD';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
      var response = request.response;
      $setGlobalModel('exchangeGBPtoUSD', response.result);
    }

    //Exchange Rates Variables
    var exchangeGBPtoUSD = $getGlobalModel('exchangeGBPtoUSD');

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