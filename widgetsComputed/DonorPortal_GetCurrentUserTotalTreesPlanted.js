return function(){

    let currentUser = fbUser.uid
    let myDonationRows = $getGrid('capturedDonationData').filter(row => row.user == currentUser) 
    let totalTrees = 0

    for(let i = 0; i < myDonationRows.length; i++){
        totalTrees = +totalTrees + +myDonationRows[i].numberOfTreesPlanted
    }

    if(totalTrees > 0){
        return totalTrees.toLocaleString()
    }

    else{
        return 0
    }

}