return function  () {

    let currentUser = fbUser.uid
    let myDonationRows = []
    myDonationRows = $getGrid('capturedDonationData').filter(row => row.user == currentUser) 

    return myDonationRows
    
}