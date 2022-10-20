const TestBTRCAddress = this.ContractsTESTNET().TestBTRCAddress
const TreeContractAddress = this.ContractsTESTNET().TreeContractAddress
const MinterContractAddress = this.ContractsTESTNET().MinterContractAddress
const TreeContractABI = this.ContractsTESTNET().TreeContractABI
const MinterContractABI = this.ContractsTESTNET().MinterContractABI
const TestBTRCABI = this.ContractsTESTNET().TestBTRCABI
const getTokenURI = this.DonorPortal_GetTokenURITESTNET
const walletProvider = this.DonorPortal_GetCurrentUserWalletProvider()

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
var availableTrees

return async function () {
  if (!walletProvider) {
    alert('No wallet connected')
  } else {

    if (document.getElementById('bv__donatemodal__nosplit').checked == true){
        nftCount = 1
    }

    else {
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

    var donationSuccess
    var nftMint
    let web3
    let provider
    var nftType = 'tree'

    if (walletProvider == 'torus') {
      web3 = new Web3(window.torus.provider)
      provider = new ethers.providers.Web3Provider(window.torus.provider)
    } else if (walletProvider === 'slide') {
      window.slide.send = function (request, callback) {
        slide.request(request).then((result) => {
          console.log({ request });
          callback(null, {
            id: request.id,
            jsonrpc: request.jsonrpc,
            method: request.method,
            result,
            error: undefined,
          });
        }).catch(e => {
          callback(e, null);
        });
      }
      web3 = new Web3(window.slide);
      provider = new ethers.providers.Web3Provider(slide);
    } else {
      let ethereum
      if (window.ethereum.providers && window.ethereum.providers.length == 2) {
        if (walletProvider == 'coinbase') {
          ethereum = window.ethereum.providers[0]
        } else {
          ethereum = window.ethereum.providers[1]
          ethereum.request({ method: 'eth_requestAccounts' });
        }
        } else {
          ethereum = window.ethereum
        }

      web3 = new Web3(ethereum)
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{
            chainId: '0x13881', //mumbai test network chain id 80001
        }]
      })
      provider = new ethers.providers.Web3Provider(ethereum)
    }

    const TreeContract = new web3.eth.Contract(TreeContractABI, TreeContractAddress, {
      from: wallet,
    });
 
    const MinterContract = new web3.eth.Contract(MinterContractABI, MinterContractAddress);

    const TestBTRContract = new web3.eth.Contract(TestBTRCABI, TestBTRCAddress, {
      from: wallet
    })
    const signer = await provider.getSigner()
    const TreeContractWithEther = new ethers.Contract(TreeContractAddress, TreeContractABI, signer)
    const TestBTRContractWithEther = new ethers.Contract(TestBTRCAddress, TestBTRCABI, signer)

    //Check if charity and cause values are not null/invalid
    if (charity == null || cause == null) {
      let pricePerTree = null
      let yearlyCO2Sequestration = null
      document.getElementById("bv__spinner").style.display = "none";
      alert("Error donating to charity. Invalid or null charity and/or project selected.")
    }
    else if (charity != null && cause != null) {
      let project = $dataGrid('charityProjects')[cause]
      let charityRow = $dataGrid('charities')[charity]
      let pricePerTree = project.pricePerTree
      let yearlyCO2Sequestration = project.yearlyCO2Sequestration

      //Check if selected cause/project is valid
      if (project.inactiveProject == true) {
        document.getElementById("bv__spinner").style.display = "none";
        document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
        alert("Error, inactive project selected. Please select an active project.")
      }
      else if (project.inactiveProject != true) {
        //Check if nft count value is within valid range
        if (nftCount => 1 && nftCount <= 10) {

          //Value to work out whether donation amount and nft count combination is valid
          var nftCountByDonationAmount = amount / nftCount

          //Check if donation amount and nft count values are ♦valid♠
          if (amount < 10 || amount == null) {
            document.getElementById("bv__spinner").style.display = "none";
            document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
            alert("Invalid donation amount, the donation needs to be atleast $10")
          }
          else if (nftCountByDonationAmount < 10) {
            document.getElementById("bv__spinner").style.display = "none";
            document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
            alert("Invalid donation amount and NFT count combination. Each NFT has a minimum donation amount of $10")
          }
          else if (nftCountByDonationAmount => 10) {

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
              try{
                availableTrees = await TreeContract.methods.treesInStorage().call({
                  from: wallet
                });
                console.log('available trees: ' + availableTrees)
                console.log('Requested NFT(s): ' + nftCount)
              }
              catch(err){
                console.log(err)
                document.getElementById("bv__spinner").style.display = "none";
                document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
                alert('Error checking trees available, please try again later. If the problem persists feel free to contact support.');
              }

              if (parseInt(nftCount) > parseInt(availableTrees)) {
                document.getElementById("bv__spinner").style.display = "none";
                document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
                alert("No trees available, try again later.")
              }
              else {
                var currencyCode = $dataGrid('currencies')[currency].code
                var currencyContractAddress = $dataGrid('currencies')[currency].contract
                var currencyTokenID = $dataGrid('currencies')[currency].smartContractID
                console.log('Selected currency is: ' + currencyCode + ' with the address of: ' + currencyContractAddress)

                //BTRC TO BE CHANGED TO USDC
                currencyContractAddress = '0xFc376f2199AC29357e907929842c6fFdedf77182'

                //TASK 2 | Check if the token the user is donating with is accepted in the smart contract.                         
                try {
                  const { token } = await MinterContract.methods.tokens(currencyTokenID).call()
                  console.log(token, 'token')
                  console.log(currencyContractAddress)
                  if (currencyContractAddress === token || true) {

                    var charityID = charityRow.smartContractCharityID

                    //TASK 3 | Prepare variable and call the mintTree function from the smart contract.
                    document.getElementById("bv__donate__buttontext").innerText = 'Requesting approval'
                    const approveAmount = Web3.utils.toWei(amount.toString(), 'ether')
                    if(walletProvider == 'coinbase') {	
                      const tx = await TestBTRContractWithEther.approve(MinterContractAddress, approveAmount)	
                      await tx.wait()	
                      await TestBTRContract.methods.approve(MinterContractAddress, approveAmount).call()
                    } else if (walletProvider !== 'slide') {	// Don't do approval step for slide
                      await TestBTRContract.methods.approve(MinterContractAddress, approveAmount).send({	
                        from: wallet	
                      })	
                      await TestBTRContract.methods.approve(MinterContractAddress, approveAmount).call()
                    }	
                    console.log('==============after approval')
                    
                    console.log('NFT COUNT: ' + nftCount)
                    console.log('CHARITY ID: ' + charityID)
                    console.log('AMOUNT (WEI) ' + approveAmount)
                    console.log('TOKEN: ' + TestBTRCAddress)

                    let gas;
                    if (walletProvider === 'slide') {
                      // Set gas for slide so estimating gas doesn't fail
                      gas = "0x3000000"
                    }

                    document.getElementById("bv__donate__buttontext").innerText = 'Requesting mint'
                    
                    MinterContract.methods.mintTree(nftCount, charityID, approveAmount, TestBTRCAddress).send({ from: wallet, gas }, async (err, txHash) => {
                      //Unsuccessful mint
                      if (err) {
                        document.getElementById("bv__spinner").style.display = "none";
                        alert("An error occured when attemping to donate & mint a tree. If this problem persists please contact support.")
                        console.log(err)
                        donationSuccess = false
                        nftMint = false
                      //Successful mint
                      } else {
                        donationSuccess = true
                        nftMint = true
                        document.getElementById("bv__donate__buttontext").innerText = 'Please wait'
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        document.getElementById("bv__donate__buttontext").innerText = 'Do not close this window'

                        //Task 3.4 Save NFT Data
                        let nftIDs = []
                        let jsonArray = []
                        TreeContractWithEther.on('minted', async (token, user, event) => {
                          const mintedTokenID = web3.utils.hexToNumber(token)
                          console.log(mintedTokenID, '====minted Token ID')
                          if (user.toLowerCase() == wallet.toLowerCase()) {
                            nftIDs.push(mintedTokenID)
                          }

                          if (nftCount == nftIDs.length) {
                            for (let i = 0; i < nftCount; i++) {
                              let tokenURI = await getTokenURI(nftIDs[i])
                              jsonArray.push(tokenURI)
                            }

                            web3.eth.getTransaction(txHash, async (error, res) => {
                              gas = res.gasPrice
                              let data = []
                              nftIDs.map((nftID, idx) => {

                                data.push({
                                  nftID,
                                  gas,
                                  json: jsonArray[idx]
                                })
                              })
                              console.log(data, '==========DATA*******')

                              console.log(nftIDs)

                              //Once donation is succesful create a row to store data
                              if (donationSuccess == true && nftMint == true) {

                                document.getElementById("bv__donate__buttontext").innerText = 'Generating NFT'

                                if (nftCount == 1){

                                    this.DonorPortal_RedirectToGeneration()

                                    nftCount = 1

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
                                            gas: gas,
                                            date: date,
                                            nftCount: nftCount,
                                            json: jsonArray,
                                            nftType: nftType,
                                            charityName: charityRow.charityName
                                    }
                                    console.log("Writing entry to DB")
                                    await this.callWf({
                                        workflow: '-NAA9tsNod6psXPRUZr0',
                                        payload: payload,
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
                                            gas: gas,
                                            date: date,
                                            nftCount: nftCount,
                                            json: jsonArray,
                                            nftType: nftType,
                                            charityName: charityRow.charityName
                                        },
                                    })
                                    return null
                                }
                              }
                              else {
                                document.getElementById("bv__spinner").style.display = "none";
                                document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
                                alert("Error with transaction/mint. Please contact support@betterverse.app");
                              }

                            })
                          }
                        })
                      }
                    })
                  }
                  else{
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
          }
          else {
            document.getElementById("bv__spinner").style.display = "none";
            document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
            return null
          }
        }
        else {
          document.getElementById("bv__spinner").style.display = "none";
          document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
          alert("Invalid NFT count value");
          return null
        }
      }
      else {
        document.getElementById("bv__spinner").style.display = "none";
        document.getElementById("bv__donate__buttontext").innerText = 'Donate and Generate NFT'
        console.log("Error obtaining cause/charity data")
        alert("Error, there is something wrong with obtaining the charity project data. Please contact support.")
      }
    }
    return null
  }
}
