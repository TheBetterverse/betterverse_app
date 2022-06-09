return function(){

    let currentUser = fbUser.uid
    let myDonationRows = $getGrid('capturedDonationData').filter(row => row.user == currentUser) 
    let myCarbonSequestrationSum = 0

    for(let i = 0; i < myDonationRows.length; i++){
        myCarbonSequestrationSum = +myCarbonSequestrationSum + +myDonationRows[i].yearlyCarbonSequestration
    }

    return myCarbonSequestrationSum.toLocaleString()

}