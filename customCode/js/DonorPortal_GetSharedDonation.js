(async () => {

    var nftParam = await $vm.$route.query.nft

    let sharedPagesGrid = await $getGrid('sharedPages')

    let sharedPage = await _.find(sharedPagesGrid, { urlExtension: nftParam } )

    await $setUser('Donation_SelectedDonation', sharedPage.donation)
    await $setUser('Donation_SelectedNFTRowKey', sharedPage.nft)    

    let nftRow = await $dataGrid('nFTs')[sharedPage.nft]

    let json = await nftRow.json
    await $setUser('Donation_SelectedNFT', json)

})();   