return function(charityRowKey, charityName, projectRowKey, projectName){

    $setUser('Donation_SelectedCharity', charityRowKey)
    $setUser('Donation_SelectedCharityName', charityName)

    $setUser('Donation_SelectedProject', projectRowKey)
    $setUser('Donation_SelectedProjectName', projectName)

    return null
}