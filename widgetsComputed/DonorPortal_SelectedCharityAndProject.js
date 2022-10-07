/* DonorPortal_SelectedCharityAndProject.js */

return async function (charityRowKey, charityName, projectRowKey, projectName, projectImage) {

    await $setUser('Donation_SelectedCharity', charityRowKey)
    await $setUser('Donation_SelectedCharityName', charityName)
    await $setUser('Donation_SelectedProject', projectRowKey)
    await $setUser('Donation_SelectedProjectName', projectName)
    //$setUser('SelectedProject_Image', projectImage)
 
}
