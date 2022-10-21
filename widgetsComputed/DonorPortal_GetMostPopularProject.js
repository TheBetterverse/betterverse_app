return function(){

    var projectsRows = this.DonorPortal_GetAllPublicCharityProjects()
    var projectsTotalDonationAmount = []

    //get donation rows for each project
    for (x = 0; x < projectsRows.length; x++) {

        let donationRows = $getGrid('capturedDonationData').filter(row => row.charityProject == projectsRows[x].rowKey) 
        var totalDonation = 0

        //add total donation amount in all project donation rows
        for (d = 0; d < donationRows.length; d++){

            totalDonation = totalDonation + donationRows[d].donationAmount

            projectsTotalDonationAmount[x] = totalDonation
        }
    }            
    
    //change null to 0
    for (n = 0; n < projectsTotalDonationAmount.length; n++){
        if (projectsTotalDonationAmount[n] == null){
            projectsTotalDonationAmount[n] = 0
        }
    }

    const max = Math.max(...projectsTotalDonationAmount);
    const mostPopularProjectIndex = [];
    projectsTotalDonationAmount.forEach((item, index) => item === max ? mostPopularProjectIndex.push(index): null);

    const min = Math.min(...projectsTotalDonationAmount);
    const leastPopularProjectIndex = [];
    projectsTotalDonationAmount.forEach((item, index) => item === min ? leastPopularProjectIndex.push(index): null);

    var mostPopular = projectsRows[mostPopularProjectIndex]
    var leastPopular = projectsRows[leastPopularProjectIndex]

    return projectsRows[mostPopularProjectIndex].projectName
}