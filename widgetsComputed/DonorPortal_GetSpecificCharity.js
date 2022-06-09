return function(){

    let selectedCharity = $getUser('Donation_SelectedCharity')
    let charityRow = $dataGrid('charities')[selectedCharity]

    return charityRow
}