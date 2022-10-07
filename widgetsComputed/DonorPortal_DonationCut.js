return function(amount){

    //Fee structure here
    const cut = 0.05

    const donationFee = amount * cut
    const finalDonationAmount = amount - donationFee 

    return finalDonationAmount
}