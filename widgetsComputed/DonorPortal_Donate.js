const paymentMethod = '-MuQuXTPrcNddIlCbmAL'
const currency = '-MvOSbx1QKOeHNJWW7pQ'

return async event => {
    if(this.Global_IsProduction() == true){
        const USDCAddress = this.Contracts().USDCAddress
        const TreeContractAddress = this.Contracts().TreeContractAddress
        const MinterContractAddress = this.Contracts().MinterContractAddress
        const TreeContractABI = this.Contracts().TreeContractABI
        const MinterContractABI = this.Contracts().MinterContractABI
        const USDCABI = this.Contracts().USDCABI
        const getTokenURI = this.DonorPortal_GetTokenURI
        const walletProvider = this.DonorPortal_GetCurrentUserWalletProvider()

        //Get Donation modal data
        const wallet = await this.DonorPortal_GetCurrentUserWalletAddress();
        const user = await fbUser.uid
        const charity = await $getUser('Donation_SelectedCharity')
        const cause = await $getUser('Donation_SelectedProject')
        const location = await this.DonorPortal_GetCurrentUserProfileLocation()
        const amount = await this.DonorPortal_GetDonationAmountNumber()
        const date = await this.DonorPortal_GetDateTime()
        var nftCount = await this.DonorPortal_GetDonationNFTCount()
        var availableTrees
        var rowCreation = false

        if (!walletProvider) {
            alert('No wallet connected to account.')
        } else {
            if (document.getElementById('bv__donatemodal__nosplit').checked == true) {
                nftCount = 1
            } else {
                nftCount = document.getElementById('bv__comps__nftcount').value
            }
            document.getElementById("bv__spinner").style.display = "block";

            // Preparing data for workflows
            const userRow = await ($dataGrid('users')[this.DonorPortal_GetCurrentUserRowKey()])
            const userParam = await JSON.stringify(userRow)
            const causeRow = await ($dataGrid('charityProjects')[cause])
            const projectParam = await JSON.stringify(causeRow)

            //Declaring charity variables needed for checks
            var project
            var pricePerTree
            var yearlyCO2Sequestration
            let web3
            let provider
            var nftType = 'tree'

            if (walletProvider == 'torus') {
                web3 = new Web3(window.torus.provider)
                provider = new ethers.providers.Web3Provider(window.torus.provider)
            } else {
                let window_ethereumm
                if (window.ethereum.providers && window.ethereum.providers.length == 2) {
                    if (walletProvider == 'coinbase') {
                        window_ethereum = window.ethereum.providers[0]
                    } else {
                        window_ethereum = window.ethereum.providers[1]
                    }
                } else {
                    window_ethereum = window.ethereum
                }
                web3 = new Web3(window_ethereum)
                provider = new ethers.providers.Web3Provider(window_ethereum)
                await provider.send("eth_requestAccounts", [])
                const signer = provider.getSigner();
                await window_ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{
                        chainId: '0x89',
                    }]
                })
            }

            const TreeContract = new web3.eth.Contract(TreeContractABI, TreeContractAddress, {
                from: wallet,
            });

            const MinterContract = new web3.eth.Contract(MinterContractABI, MinterContractAddress);

            const USDCContract = new web3.eth.Contract(USDCABI, USDCAddress, {
                from: wallet
            })

            const signer = await provider.getSigner()
            const TreeContractWithEther = new ethers.Contract(TreeContractAddress, TreeContractABI, signer)
            const USDCContractWithEther = new ethers.Contract(USDCAddress, USDCABI, signer)

            //Check if charity and cause values are not null/invalid
            if (charity == null || cause == null) {
                let pricePerTree = null
                let yearlyCO2Sequestration = null
                document.getElementById("bv__spinner").style.display = "none";
                alert("Error donating to charity. Invalid or null charity and/or project selected.")
            } else if (charity != null && cause != null) {
                let project = $dataGrid('charityProjects')[cause]
                let charityRow = $dataGrid('charities')[charity]
                let pricePerTree = project.pricePerTree
                let yearlyCO2Sequestration = project.yearlyCO2Sequestration

                //Check if selected cause/project is valid
                if (project.inactiveProject == true) {
                    document.getElementById("bv__spinner").style.display = "none";
                    document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
                    alert("Error, inactive project selected. Please select an active project.")
                } else if (project.inactiveProject != true) {
                    //Check if nft count value is within valid range
                    if (nftCount => 1 && nftCount <= 10) {

                        //Value to work out whether donation amount and nft count combination is valid
                        var nftCountByDonationAmount = amount / nftCount

                        //Check if donation amount and nft count values are ♦valid♠
                        if (amount < 1 || amount == null) {
                            document.getElementById("bv__spinner").style.display = "none";
                            document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
                            alert("Invalid donation amount, the donation needs to be atleast $1")
                        } else if (nftCountByDonationAmount < 1) {
                            document.getElementById("bv__spinner").style.display = "none";
                            document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
                            alert("Invalid donation amount and NFT count combination. Each NFT has a minimum donation amount of $1")
                        } else if (nftCountByDonationAmount => 1) {

                            //If wallet is not connected, alert user
                            if (wallet == null) {
                                document.getElementById("bv__spinner").style.display = "none";
                                document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
                                alert("No wallet connected!");
                            }
                            //If wallet is connected
                            else if (wallet != null) {
                                //TASK 1 | Check if there are trees available to be minted in the smart contract.
                                document.getElementById("bv__donate__buttontext").innerText = 'Checking trees'
                                try {
                                    availableTrees = await TreeContract.methods.treesInStorage().call({
                                        from: wallet
                                    });
                                    console.log('Available trees: ' + availableTrees)
                                } catch (err) {
                                    console.log(err)
                                    document.getElementById("bv__spinner").style.display = "none";
                                    document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
                                    alert('Error checking trees available, please try again later. If the problem persists feel free to contact support.');
                                }

                                if (parseInt(nftCount) > parseInt(availableTrees)) {
                                    document.getElementById("bv__spinner").style.display = "none";
                                    document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
                                    alert("No trees available, try again later.")
                                } else {
                                    var currencyCode = $dataGrid('currencies')[currency].code
                                    var currencyContractAddress = $dataGrid('currencies')[currency].contract
                                    var currencyTokenID = $dataGrid('currencies')[currency].smartContractID

                                    //USDC Token Address
                                    currencyContractAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'

                                    //TASK 2 | Check if the token the user is donating with is accepted in the smart contract.                         
                                    try {
                                        const {
                                            token
                                        } = await MinterContract.methods.tokens(currencyTokenID).call()
                                        if (currencyContractAddress === token || true) {

                                            var charityID = charityRow.smartContractCharityID

                                            //TASK 3 | Prepare variable and call the mintTree function from the smart contract.
                                            document.getElementById("bv__donate__buttontext").innerText = 'Requesting approval'

                                            //USDC Conversion
                                            const approveAmount = ethers.utils.parseUnits(amount.toString(), 6)

                                            if (walletProvider == 'coinbase') {
                                                const tx = await USDCContractWithEther.approve(MinterContractAddress, approveAmount)
                                                await tx.wait()
                                                await USDCContract.methods.approve(MinterContractAddress, approveAmount).call()
                                            } else {
                                                await USDCContract.methods.approve(MinterContractAddress, approveAmount).send({
                                                    from: wallet
                                                })
                                                await USDCContract.methods.approve(MinterContractAddress, approveAmount).call()
                                            }
                                            console.log('NFT COUNT: ' + nftCount)
                                            console.log('CHARITY ID: ' + charityID)
                                            console.log('AMOUNT (WEI) ' + approveAmount)
                                            console.log('TOKEN: ' + USDCAddress)

                                            let gas;

                                            document.getElementById("bv__donate__buttontext").innerText = 'Requesting mint'

                                            try {
                                                MinterContract.methods.mintTree(nftCount, charityID, approveAmount, USDCAddress).send({
                                                    from: wallet,
                                                    gas
                                                }, async (err, txHash) => {
                                                    //Unsuccessful mint
                                                    if (err) {
                                                        document.getElementById("bv__spinner").style.display = "none";
                                                        document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
                                                        alert("An error occured when attemping to donate & mint a tree. If this problem persists please contact support.")
                                                        console.log(err)
                                                        return
                                                        //Successful mint
                                                    } else {
                                                        // document.getElementById("bv__donate__buttontext").innerText = 'Please wait'
                                                        // await new Promise(resolve => setTimeout(resolve, 3000));
                                                        document.getElementById("bv__donate__buttontext").innerText = 'Do not close this window'

                                                        //Task 3.4 Save NFT Data
                                                        let nftIDs = []
                                                        let jsonArray = []
                                                        try {
                                                            console.log('getting minted token')
                                                            
                                                            const handleNFTMinted = async (token, user, event) => {
                                                                const mintedTokenID = web3.utils.hexToNumber(token)
                                                                console.log(mintedTokenID, ': minted TokenID')
                                                                nftIDs.push(mintedTokenID)

                                                                console.log('getting json urls')
                                                                if (nftCount == nftIDs.length) {
                                                                    for (let i = 0; i < nftCount; i++) {
                                                                        /*if(walletProvider == 'metamask'){
                                                                            let tokenURI = await getTokenURI(nftIDs[i], window_ethereum)
                                                                            console.log('TokenID:' + nftIDs[i] + 'returned JSON ' + tokenURI)
                                                                            jsonArray.push(tokenURI)
                                                                        }
                                                                        else {*/
                                                                        let tokenURI = await this.DonorPortal_GetTokenURIAlchemy(nftIDs[i])
                                                                        console.log('TokenID:' + nftIDs[i] + 'returned JSON ' + tokenURI)
                                                                        jsonArray.push(tokenURI)
                                                                        //}
                                                                    }

                                                                    /*web3.eth.getTransaction(txHash, async (error, res) => {
                                                                    gas = res.gasPrice
                                                                    let data = []
                                                                    nftIDs.map((nftID, idx) => {
                                                                    data.push({
                                                                        nftID,
                                                                        gas,
                                                                        json: jsonArray[idx]
                                                                    })
                                                                    })
                                                                    })*/

                                                                    //Once donation is succesful create a row to store data
                                                                    document.getElementById("bv__donate__buttontext").innerText = 'Generating tree'

                                                                    console.log('prepping data rows for db')
                                                                    if (nftCount == 1) {

                                                                        nftCount = 1
                                                                        await $setUser('Donation_NFTCount', nftCount)

                                                                        this.DonorPortal_RedirectToGeneration()

                                                                        const finalDonationAmount = await this.DonorPortal_DonationCut(amount)
                                                                        const donationAmountGBP = await this.Global_ConvertUSDtoGBP(finalDonationAmount)
                                                                        const donationAmountEUR = await this.Global_ConvertUSDtoEUR(finalDonationAmount)
                                                                        const numberOfTrees = await this.DonorPortal_CalculateDonationTreesPlanted(finalDonationAmount, causeRow.pricePerTree)
                                                                        const carbonSequestration = await this.DonorPortal_CalculateDonationCarbonSequestration(causeRow.yearlyCO2Sequestration, numberOfTrees)
                                                                        const payload = {
                                                                            tokenID: nftIDs,
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
                                                                            //gas: gas,
                                                                            date: date,
                                                                            nftCount: nftCount,
                                                                            json: jsonArray,
                                                                            nftType: nftType,
                                                                            charityName: charityRow.charityName
                                                                        }
                                                                        await this.callWf({
                                                                            workflow: '-NAA9tsNod6psXPRUZr0',
                                                                            payload: payload,
                                                                        })

                                                                        return
                                                                    } else if (nftCount >= 2 && nftCount <= 10) {
                                                                        
                                                                        await $setUser('Donation_NFTCount', nftCount)
                                                                        this.DonorPortal_RedirectToGeneration()

                                                                        const finalDonationAmount = await this.DonorPortal_DonationCut(amount)
                                                                        const donationAmountGBP = await this.Global_ConvertUSDtoGBP(finalDonationAmount)
                                                                        const donationAmountEUR = await this.Global_ConvertUSDtoEUR(finalDonationAmount)
                                                                        const equalDonationAmount = await finalDonationAmount / nftCount
                                                                        const equalDonationAmountGBP = await donationAmountGBP / nftCount
                                                                        const equalDonationAmountEUR = await donationAmountEUR / nftCount
                                                                        const equalNumberOfTrees = await this.DonorPortal_CalculateDonationTreesPlanted(equalDonationAmount, causeRow.pricePerTree)
                                                                        const equalCarbonSequestration = await this.DonorPortal_CalculateDonationCarbonSequestration(causeRow.yearlyCO2Sequestration, equalNumberOfTrees)
                                                                        const payload = {
                                                                            tokenID: nftIDs,
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
                                                                            //gas: gas,
                                                                            date: date,
                                                                            nftCount: nftCount,
                                                                            json: jsonArray,
                                                                            nftType: nftType,
                                                                            charityName: charityRow.charityName
                                                                        }
                                                                        await this.callWf({
                                                                            workflow: '-NAA9tsNod6psXPRUZr0',
                                                                            payload: payload,
                                                                        })

                                                                        return
                                                                    } else {
                                                                        document.getElementById("bv__spinner").style.display = "none";
                                                                        document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
                                                                        alert("Error. Please contact support@betterverse.app");
                                                                    }
                                                                }
                                                            };

                                                            console.log({ txHash });

                                                            const transactionHash = typeof txHash === "string" ? txHash : txHash[0];

                                                            const receipt = await provider.getTransactionReceipt(transactionHash);

                                                            console.log({ receipt });

                                                            if (receipt) {
                                                                let mintEvent;
                                                                receipt.logs.forEach((log) => {
                                                                    try {
                                                                        event = TreeContractWithEther.interface.parseLog(log)

                                                                        if (event.name.toLowerCase() === "minted") {
                                                                            mintEvent = event;
                                                                        }
                                                                    } catch {}
                                                                });

                                                                if (!mintEvent) {
                                                                    throw new Error("mint event not found on transaction");
                                                                }

                                                                console.log({ mintEvent });

                                                                handleNFTMinted(mintEvent.args.token.toHexString(), mintEvent.args.user, mintEvent);
                                                            } else {
                                                                TreeContractWithEther.on('minted', handleNFTMinted);
                                                            }
                                                        } catch (err) {
                                                            console.log({ err });
                                                            document.getElementById("bv__spinner").style.display = "none";
                                                            document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
                                                            alert("Error getting minted token. Please contact support@betterverse.app!");
                                                        }
                                                    }
                                                })
                                            } catch (err) {
                                                console.warn(err)
                                                document.getElementById("bv__spinner").style.display = "none";
                                                document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
                                                alert("Error with transaction/mint. Please contact support@betterverse.app");
                                            }
                                        } else {
                                            document.getElementById("bv__spinner").style.display = "none";
                                            document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
                                            alert('Error')
                                            console.warn(currencyContractAddress)
                                            console.warn(token)
                                        }
                                    } catch (ex) {
                                        document.getElementById("bv__spinner").style.display = "none";
                                        document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
                                        console.log('error occured on minting nft')
                                        console.log('error msg:', ex)
                                    }
                                }
                            }
                        } else {
                            document.getElementById("bv__spinner").style.display = "none";
                            document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
                            return null
                        }
                    } else {
                        document.getElementById("bv__spinner").style.display = "none";
                        document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
                        alert("Invalid NFT count value");
                        return null
                    }
                } else {
                    document.getElementById("bv__spinner").style.display = "none";
                    document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
                    console.log("Error obtaining cause/charity data")
                    alert("Error, there is something wrong with obtaining the charity project data. Please contact support.")
                }
            }
            return null
        }
    }
    else {
        this.DonorPortal_DonateTESTNET()
        return
    }
}