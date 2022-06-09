return function(currency){

    let currentUser = fbUser.uid
    let myDonationRows = $getGrid('capturedDonationData').filter(row => row.user == currentUser) 
    let amount = 0

    if(currency == "$"){
        for(let i = 0; i < myDonationRows.length; i++){
            amount = +amount + +myDonationRows[i].donationAmount
        }

        if(amount > 0){
            return amount
        }

        else{
            return 0
        }
    }

    else if(currency == "£"){
        
    }

}