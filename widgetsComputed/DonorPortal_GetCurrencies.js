return function  (yesFiat) {

    let rows = []

    /*if(yesFiat == true){
        rows = $getGrid('currencies').filter(row => row.code != "$USDT" && row.code != "$USDC")
    }
    
    if(yesFiat == false){*/
      
      
        rows = $getGrid('currencies').filter(row => row.code == "$USDT" || row.code == "$USDC" || row.code == "$DAI")
    
    //}

    return rows
}