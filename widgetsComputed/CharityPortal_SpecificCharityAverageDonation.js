return function(){

    //Get selected filter
    var activeCharityDashboardFilter = $getUser('activeCharityDashboardFilter')
    var activeCharityDashboardFilterValue = $getUser('activeCharityDashboardFilterValue')
    var activeCharityDashboardFilterValue_EndDate = $getUser('activeCharityDashboardFilterValue_EndDate')

    let specificCharityDonationRows = []
    var specificCharityDonationSum = 0

    //Filter logic
    if (activeCharityDashboardFilter == 'alltime'){
        specificCharityDonationRows = $getGrid('capturedDonationData').filter(row => row.charities == $getUser('charityProfile')) 
    }

    if (activeCharityDashboardFilter == 'today'){
        var oneDay = activeCharityDashboardFilterValue + 86399999
        specificCharityDonationRows = $getGrid('capturedDonationData').filter(row => row.charities == $getUser('charityProfile') && row.donationDate >= activeCharityDashboardFilterValue && row.donationDate <= oneDay) 
    }

    if (activeCharityDashboardFilter == 'thisweek'){
        var oneWeek = activeCharityDashboardFilterValue + 604799999
        specificCharityDonationRows = $getGrid('capturedDonationData').filter(row => row.charities == $getUser('charityProfile') && row.donationDate >= activeCharityDashboardFilterValue && row.donationDate <= oneWeek) 
    }

    if (activeCharityDashboardFilter == 'thismonth'){
        specificCharityDonationRows = $getGrid('capturedDonationData').filter(row => row.charities == $getUser('charityProfile') && row.donationDate >= activeCharityDashboardFilterValue && row.donationDate <= activeCharityDashboardFilterValue_EndDate) 
    }

    if (activeCharityDashboardFilter == 'thisyear'){
        specificCharityDonationRows = $getGrid('capturedDonationData').filter(row => row.charities == $getUser('charityProfile') && row.donationDate >= activeCharityDashboardFilterValue && row.donationDate <= activeCharityDashboardFilterValue_EndDate) 
    }

    var specificCharityTotalDonors = specificCharityDonationRows.length

    //Loop to get sum of donations
    for(let i = 0; i < specificCharityDonationRows.length; i++){
        specificCharityDonationSum = +specificCharityDonationSum + +specificCharityDonationRows[i].initialDonationAmount
    }

    var specificCharityAverageDonation = specificCharityDonationSum/specificCharityTotalDonors


    if(specificCharityDonationRows.length <= 0){
        specificCharityAverageDonation = 0
    }

    return specificCharityAverageDonation.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
}

