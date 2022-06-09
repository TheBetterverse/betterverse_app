return function  () {

    let currentUser = fbUser.uid
    let myDonationRows = []
    myDonationRows = $getGrid('capturedDonationData').filter(row => row.user == currentUser) 
    count = myDonationRows.length

    if(count != null){
        return count
    }

    else if(count == null){
        return 0
    }
}