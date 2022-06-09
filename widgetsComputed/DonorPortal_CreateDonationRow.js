return async function  (tokenID, wallet, user, charity, cause, paymentMethod, currency, location, amount, gas, date, nftCount) {

        //Get specific charity project details
        let project = $dataGrid('charityProjects')[cause]
        let pricePerTree = project.pricePerTree
        let yearlyCO2Sequestration = project.yearlyCO2Sequestration

        //10% of Donation
        let donationCut = amount * 0.1
        let donationAmount = amount - donationCut 

        //Single NFT
        if(nftCount == 1){
                
                //Impact Data
                let numberOfTrees = Math.floor(donationAmount/pricePerTree)
                let totalCarbonSequestration = (yearlyCO2Sequestration*numberOfTrees)

                let newRow = await $dgAddRow('capturedDonationData',  {tokenID: tokenID,
                                                                        walletAddress: wallet,
                                                                        user: user,
                                                                        charity: charity, 
                                                                        charityProject: cause,
                                                                        paymentMethod: paymentMethod,
                                                                        //Default USDC
                                                                        currency: "-MvOSbx1QKOeHNJWW7pQ",
                                                                        donationLocation: location,
                                                                        donationAmount: donationAmount,
                                                                        gas: gas,
                                                                        donationDate: date,
                                                                        numberOfTreesPlanted: numberOfTrees,
                                                                        yearlyCarbonSequestration: totalCarbonSequestration
                                                                        })
        }
        
        //Multiple NFTs
        else if(nftCount >= 2 && nftCount <= 10){
            
                //Impact Data
                let equalDonationAmount = donationAmount / nftCount
                let equalNumberOfTrees = Math.floor(equalDonationAmount/pricePerTree)
                let equalCarbonSequestration = (yearlyCO2Sequestration*equalNumberOfTrees)

                for(let i = 0; i < nftCount; i++){
                        let newRows = await $dgAddRow('capturedDonationData',  {tokenID: tokenID,
                                                                                walletAddress: wallet,
                                                                                user: user,
                                                                                charity: charity, 
                                                                                charityProject: cause,
                                                                                paymentMethod: paymentMethod,
                                                                                //Default USDC
                                                                                currency: "-MvOSbx1QKOeHNJWW7pQ",
                                                                                donationLocation: location,
                                                                                donationAmount: equalDonationAmount,
                                                                                gas: gas,
                                                                                donationDate: date,
                                                                                numberOfTreesPlanted: equalNumberOfTrees,
                                                                                yearlyCarbonSequestration: equalCarbonSequestration
                                                                        })                
                }
        }
        else{
                console.log("Error creating donation row")
        }



}
