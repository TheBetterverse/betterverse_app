(async () => {

    let nftRow = await $dataGrid('nFTs')[$getUser('Donation_SelectedNFTRowKey')]

    return nftRow
})();  