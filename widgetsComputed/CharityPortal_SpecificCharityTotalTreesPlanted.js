return function(){

    var treeSum = 0
    let specificCharityDonationRows = []
    specificCharityDonationRows = $getGrid('capturedDonationData').filter(row => row.charities == $getUser('charityProfile')) 

    for(let i = 0; i < specificCharityDonationRows.length; i++){
        treeSum = +treeSum + +specificCharityDonationRows[i].numberOfTreesPlanted
    }

    const formattedTreeSum = treeSum.toLocaleString('en-US');

    return formattedTreeSum
}