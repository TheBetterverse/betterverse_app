return function(){

    var yearlyCarbonSum = 0
    let specificCharityDonationRows = []
    specificCharityDonationRows = $getGrid('capturedDonationData').filter(row => row.charities == $getUser('charityProfile')) 

    for(let i = 0; i < specificCharityDonationRows.length; i++){
        yearlyCarbonSum = +yearlyCarbonSum + +specificCharityDonationRows[i].yearlyCarbonSequestration
    }

    const formattedYearlyCarbonSum = yearlyCarbonSum.toLocaleString('en-US');

    return formattedYearlyCarbonSum
}