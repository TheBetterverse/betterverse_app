return async function  (tokenID, wallet, donationRowKeys, json, nftCount) {

    if (tokenID != null && wallet != null && donationRowKeys != null && json != null && nftCount != null){
        if(nftCount == 1){
            let newRow = await $dgAddRow('nFTs',  {tokenID: tokenID,
                                                            walletAddress: wallet,
                                                            user: fbUser.uid,
                                                            initialDonationRow: donationRowKeys,
                                                            json: json
                                                            })
            console.log("NFT row created: " + newRow + " with donation row: " + donationRowKeys)
        }

        else if(nftCount >= 2 && nftCount <= 10){
            for(let i = 0; i < nftCount; i++){
                let newRow = await $dgAddRow('nFTs',  {tokenID: tokenID,
                                                                walletAddress: wallet,
                                                                user: fbUser.uid,
                                                                initialDonationRow: donationRowKeys[i],
                                                                json: json
                                                                })
                console.log("NFT row " + i + " created: " + newRow + " with donation row: " + donationRowKeys[i])
            }
        }
        else{
            console.log('Error creating NFT rows, invalid nftCount value')
            let errorLog = await $dgAddRow('rowCreationErrorLogs',  {name: 'NFT row creation error',
                                errorDetails: 'Invalid nftCount value so the IF statement to create the NFT row(s) (' + nftCount + ') did not execute.',
                                tokenID: tokenID,
                                walletAddress: wallet,
                                owner: fbUser.uid,
                                donationRows: donationRowKeys,
                                donationDate: this.DonorPortal_GetDateTime()
                        })
            return null
        }
    }
    else{
        console.log("Error, invalid/null parameters")
        let errorLog = await $dgAddRow('rowCreationErrorLogs',  {name: 'NFT row creation error',
                                        errorDetails: 'Vital values/parameters were missing therefore the IF statement to create the NFT row(s) (' + nftCount + ') did not execute.',
                                        tokenID: tokenID,
                                        walletAddress: wallet,
                                        owner: fbUser.uid,
                                        donationRows: donationRowKeys,
                                        donationDate: this.DonorPortal_GetDateTime()
                                })
        return null
    }
}