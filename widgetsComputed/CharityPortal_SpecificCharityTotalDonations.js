return function(){

    //Get selected filter
    var activeCharityDashboardFilter = $getUser('activeCharityDashboardFilter')
    var activeCharityDashboardFilterValue = $getUser('activeCharityDashboardFilterValue')
    var activeCharityDashboardFilterValue_EndDate = $getUser('activeCharityDashboardFilterValue_EndDate')

    var specificCharityDonationSum = 0

    //Get Specific Charity Donation Data Rows 
    let specificCharityDonationRows = []

    //Filter logic
    if (activeCharityDashboardFilter == 'alltime'){
        specificCharityDonationRows = $getGrid('capturedDonationData').filter(row => row.charities == $getUser('charityProfile')) 
    }

    if (activeCharityDashboardFilter == 'today'){
        //Start of day to 23:59:59        
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

    //Loop to get sum of donations
    for(let i = 0; i < specificCharityDonationRows.length; i++){
        specificCharityDonationSum = +specificCharityDonationSum + +specificCharityDonationRows[i].initialDonationAmount
        //console.log(specificCharityDonationRows[i].donationDate)
    }

    return specificCharityDonationSum.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
}