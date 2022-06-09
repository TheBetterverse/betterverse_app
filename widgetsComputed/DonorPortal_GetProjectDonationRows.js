return function(){

    let selectedProject = $getUser('Donation_SelectedProject')
    let donationRows = $getGrid('capturedDonationData').filter(row => row.charityProject == selectedProject) 

    return donationRows

}