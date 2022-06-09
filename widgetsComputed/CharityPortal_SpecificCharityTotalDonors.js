return function(){

    //Get selected filter
    var activeCharityDashboardFilter = $getUser('activeCharityDashboardFilter')
    var activeCharityDashboardFilterValue = $getUser('activeCharityDashboardFilterValue')
    var activeCharityDashboardFilterValue_EndDate = $getUser('activeCharityDashboardFilterValue_EndDate')

    //Get Specific Charity Donation Data Rows 
    let specificCharityTotalDonorsRows = []

    //Filter logic
    if (activeCharityDashboardFilter == 'alltime'){
        specificCharityTotalDonorsRows = $getGrid('capturedDonationData').filter(row => row.charities == $getUser('charityProfile')) 
    }

    if (activeCharityDashboardFilter == 'today'){
        //Start of day to 23:59:59        
        var oneDay = activeCharityDashboardFilterValue + 86399999
        specificCharityTotalDonorsRows = $getGrid('capturedDonationData').filter(row => row.charities == $getUser('charityProfile') && row.donationDate >= activeCharityDashboardFilterValue && row.donationDate <= oneDay) 
    }

    if (activeCharityDashboardFilter == 'thisweek'){
        var oneWeek = activeCharityDashboardFilterValue + 604799999
        specificCharityTotalDonorsRows = $getGrid('capturedDonationData').filter(row => row.charities == $getUser('charityProfile') && row.donationDate >= activeCharityDashboardFilterValue && row.donationDate <= oneWeek) 
    }

    if (activeCharityDashboardFilter == 'thismonth'){
        specificCharityTotalDonorsRows = $getGrid('capturedDonationData').filter(row => row.charities == $getUser('charityProfile') && row.donationDate >= activeCharityDashboardFilterValue && row.donationDate <= activeCharityDashboardFilterValue_EndDate) 
    }

    if (activeCharityDashboardFilter == 'thisyear'){
        specificCharityTotalDonorsRows = $getGrid('capturedDonationData').filter(row => row.charities == $getUser('charityProfile') && row.donationDate >= activeCharityDashboardFilterValue && row.donationDate <= activeCharityDashboardFilterValue_EndDate) 
    }

    var specificCharityTotalDonors = specificCharityTotalDonorsRows.length

    return specificCharityTotalDonors
}