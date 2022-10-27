return async function(){

    //Get Donation modal data
    const wallet = await this.DonorPortal_GetCurrentUserWalletAddress();
    const user = await fbUser.uid
    const charity = await $getUser('Donation_SelectedCharity')
    const cause = await $getUser('Donation_SelectedProject')
    const paymentMethod = '-MuQuXTPrcNddIlCbmAL'
    const currency = '-MvOSbx1QKOeHNJWW7pQ'
    const location = await this.DonorPortal_GetCurrentUserProfileLocation()
    const amount = await this.DonorPortal_GetDonationAmountNumber()
    const date = await this.DonorPortal_GetDateTime()
    var nftCount = await this.DonorPortal_GetDonationNFTCount()

    //Preparing data for workflows
    const userRow = await ($dataGrid('users')[this.DonorPortal_GetCurrentUserRowKey()])
    const userParam = await JSON.stringify(userRow)
    const causeRow = await ($dataGrid('charityProjects')[cause])
    const projectParam = await JSON.stringify(causeRow)

    //Declaring charity variables needed for checks
    var project
    var pricePerTree
    var yearlyCO2Sequestration

    var donationSuccess
    var nftMint
    var nftType = 'tree'

    //Check if charity and cause values are not null/invalid
    if (charity == null || cause == null){
        let pricePerTree = null
        let yearlyCO2Sequestration = null
        alert("Error donating to charity. Invalid or null charity and/or project selected.")
    }
    else if(charity != null && cause != null){
        let project = $dataGrid('charityProjects')[cause]
        let charityRow = $dataGrid('charities')[charity]
        let pricePerTree = project.pricePerTree
        let yearlyCO2Sequestration = project.yearlyCO2Sequestration

        //Check if selected cause/project is valid
        if(project.inactiveProject == true){
            alert("Error, inactive project selected. Please select an active project.")
        }
        else if(project.inactiveProject != true){
            //Check if nft count value is within valid range
            if(nftCount => 1 && nftCount <= 10){
                
                //Value to work out whether donation amount and nft count combination is valid
                var nftCountByDonationAmount = amount/nftCount

                //Check if donation amount and nft count values are valid
                if(amount < 10 || amount == null){
                    alert("Invalid donation amount, the donation needs to be atleast $10")
                }
                else if(nftCountByDonationAmount < 10){
                    alert("Invalid donation amount and NFT count combination. Each NFT has a minimum donation amount of $10")
                }
                else if(nftCountByDonationAmount => 10){

                    $setUser('Donation_NFTCount', nftCount)

                    //If wallet is not connected, alert user
                    if(wallet == null){
                        alert("No wallet connected!");
                    }
                    //If wallet is connected
                    else if(wallet != null){

                        donationSuccess = true
                        nftMint = true

                        gas = 0.1
                        var tokenID = [nftCount] //If nftCount == 1, store in [0]

                        var json = 'https://ipfs.io/ipfs/bafybeib2nrkchurmel2sj47vrxacpbezmhg6hfrue66n2scsk7geytrwam/29a.json'

                        json = await this.DonorPortal_ResolveNFTURL(json)

                        console.log(json)
                    }
                        //Once donation is succesful create a row to store data
                        if (donationSuccess == true && nftMint == true){

                            if (nftCount == 1){

                                this.DonorPortal_RedirectToGeneration()

                                nftCount = 1

                                const finalDonationAmount = await this.DonorPortal_DonationCut(amount)
                                const donationAmountGBP = await this.Global_ConvertUSDtoGBP(finalDonationAmount)
                                const donationAmountEUR = await this.Global_ConvertUSDtoEUR(finalDonationAmount)
                                const numberOfTrees = await this.DonorPortal_CalculateDonationTreesPlanted(finalDonationAmount, causeRow.pricePerTree)
                                const carbonSequestration = await this.DonorPortal_CalculateDonationCarbonSequestration(causeRow.yearlyCO2Sequestration, numberOfTrees)

                                await this.callWf({
                                    workflow: '-NAA9tsNod6psXPRUZr0',
                                    payload: {
                                        tokenID: tokenID,
                                        wallet: wallet,
                                        user: userParam,
                                        charity: charity,
                                        cause: projectParam,
                                        numberOfTrees: numberOfTrees,
                                        carbonSequestration: carbonSequestration,
                                        paymentMethod: paymentMethod,
                                        currency: currency,
                                        location: location,
                                        donationAmount: finalDonationAmount,
                                        donationAmountGBP: donationAmountGBP,
                                        donationAmountEUR: donationAmountEUR,
                                        gas: gas,
                                        date: date,
                                        nftCount: nftCount,
                                        json: json,
                                        nftType: nftType,
                                        charityName: charityRow.charityName
                                    },
                                })

                                return null

                            }
                            else if(nftCount >= 2 && nftCount <= 10){

                                this.DonorPortal_RedirectToGeneration()

                                const finalDonationAmount = await this.DonorPortal_DonationCut(amount)
                                const donationAmountGBP = await this.Global_ConvertUSDtoGBP(finalDonationAmount)
                                const donationAmountEUR = await this.Global_ConvertUSDtoEUR(finalDonationAmount)
                                const equalDonationAmount = await finalDonationAmount / nftCount

                                const equalDonationAmountGBP = await donationAmountGBP / nftCount
                                const equalDonationAmountEUR = await donationAmountEUR / nftCount

                                const equalNumberOfTrees = await this.DonorPortal_CalculateDonationTreesPlanted(equalDonationAmount, causeRow.pricePerTree)
                                const equalCarbonSequestration = await this.DonorPortal_CalculateDonationCarbonSequestration(causeRow.yearlyCO2Sequestration, equalNumberOfTrees)

                                await this.callWf({
                                    workflow: '-NAA9tsNod6psXPRUZr0',
                                    payload: {
                                        tokenID: tokenID,
                                        wallet: wallet,
                                        user: userParam,
                                        charity: charity,
                                        cause: projectParam,
                                        numberOfTrees: equalNumberOfTrees,
                                        carbonSequestration: equalCarbonSequestration,
                                        paymentMethod: paymentMethod,
                                        currency: currency,
                                        location: location,
                                        donationAmount: equalDonationAmount,
                                        donationAmountGBP: equalDonationAmountGBP,
                                        donationAmountEUR: equalDonationAmountEUR,
                                        gas: gas,
                                        date: date,
                                        nftCount: nftCount,
                                        json: json,
                                        nftType: nftType,
                                        charityName: charityRow.charityName
                                    },
                                })
                                return null
                            }
                        }
                        else{
                            alert("Error with transaction/mint. Please contact support@betterverse.app");
                        }
                    }
                }
                else{
                    return null
                }
            }
            else{
                alert("Invalid NFT count value");
                return null
            }
        }
        else{
            console.log("Error obtaining cause/charity data")
            alert("Error, there is something wrong with obtaining the charity project data. Please contact support@betterverse.app.")
        }
    }
    return null
