return function(){

    let selectedProject = $getUser('Donation_SelectedProject')
    let donationRows = $getGrid('capturedDonationData').filter(row => row.charityProject == selectedProject) 
    let totalTrees = 0

    for(let i = 0; i < donationRows.length; i++){
        totalTrees = +totalTrees + +donationRows[i].numberOfTreesPlanted
    }

    if(totalTrees > 0){
        return totalTrees.toLocaleString()
    }

    else{
        return 0
    }

}