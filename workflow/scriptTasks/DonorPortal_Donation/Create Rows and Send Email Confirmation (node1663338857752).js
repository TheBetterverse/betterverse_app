const { userId } = context.webhookdata
const email = await getUserEmailByUID(userId)
context.data = email

const tokenID = await context.webhookdata.payload.tokenID
const wallet = await context.webhookdata.payload.wallet
const user = await JSON.parse(context.webhookdata.payload.user)
const charity = await context.webhookdata.payload.charity
const cause = await JSON.parse(context.webhookdata.payload.cause)
const carbonSequestration = await context.webhookdata.payload.carbonSequestration
const numberOfTrees = await context.webhookdata.payload.numberOfTrees
const paymentMethod = await context.webhookdata.payload.paymentMethod
const currency = await context.webhookdata.payload.currency
const location = await context.webhookdata.payload.location
const donationAmount = await context.webhookdata.payload.donationAmount
const donationAmountGBP = await context.webhookdata.payload.donationAmountGBP
const donationAmountEUR = await context.webhookdata.payload.donationAmountEUR
const gas = await context.webhookdata.payload.gas
const date = await context.webhookdata.payload.date
const nftCount = await context.webhookdata.payload.nftCount
const json = await context.webhookdata.payload.json
const nftType = await context.webhookdata.payload.nftType

var emailTemplate = 
                       `
                       
                       <div>
  <table width="100%" border="0" cellspacing="0" cellpadding="0"
    style="background: #EFEDE7; height: 500px;"
    >
      <tr height="100px;">
          <td align="center">
                  <img src="https://uploads-ssl.webflow.com/62554ccc10f0e2be91a8c9fc/633c46678133f7deb08265bc_betterverse-logo.png" 
                  style="height: 50px;"/>
      </tr>

      <tr height="300px;">
          <td align="center">
            <div style=" text-align: left; font-family: 'Courier New', monospace; height: 100%; font-size: 14px; position: relative; background-color: #ECEAE3; line-height: 21px; border-bottom: 1px solid #E3E1DB; border-top: 1px solid #E3E1DB; vertical-align:middle; ">
                <div style="margin: auto; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 50%;">
                  <h3 style="color: black;">Contratulations!</h3>
                  <p>
                  <div style="color: black;"> Your account has been successfully created. </div>
                  <br>
                  <div style="color: black;"> You’re all set to make your first donation and mint your NFT tree. </div>
                  </p>
                  <button style="border-radius: 20px; padding: 0px 15px; gap: 10px; width: 87px; height: 28px; background: #000000;">
                    <a href="https://give.betterverse.app" target="_blank" style="color: #ECEAE3; text-decoration: none;">
                    <b style="font-family: 'Courier New', monospace; ">Donate</b>
                    </a>
                  </button>
                </div>
            </div>
      </tr>

      <tr height="100px;">
          <div style="text-align: center;  font-size: 10px; font-family: 'Courier New', monospace;">
            <div style="font-size: 10px;">
              <p>
              <div style="color: black;"> Brought to you with ❤️ from the Betterverse team. <br> © 2022 Betterverse Ltd, all rights reserved. </div>
              <br>
              <div>
                <b style="color: black;">
                  <a href="https://www.betteverse.app/team/#contact" target="_blank" style="color: black;">Contact Us</a> 
                  • 
                  <a href="https://www.betterverse.app/legal" target="_blank" style="color: black;">Terms of Use</a>
                  • 
                  <a href="https://www.betterverse.app/legal" target="_blank" style="color: black;">Privacy Policy</a>
                </b>
              </div>
              </p>
            </div>
          </div>
      </tr>
  </table>
</div>








`

var name = user.username
if(user.firstName){
    name = user.firstName
}
else{
    name = user.username
}

if (nftCount == 1){

    //Create donation row
    let newDonationRow = await $addRow('capturedDonationData', {
                                            tokenID: tokenID,
                                            walletAddress: wallet,
                                            user: user.user,
                                            charity: charity, 
                                            charityProject: cause.rowKey,
                                            paymentMethod: paymentMethod,
                                            currency: currency,
                                            donationLocation: location,
                                            donationAmount: donationAmount,
                                            gas: gas,
                                            donationDate: date,
                                            numberOfTreesPlanted: numberOfTrees,
                                            yearlyCarbonSequestration: carbonSequestration,
                                            donationAmountGBP: donationAmountGBP,
                                            donationAmountEUR: donationAmountEUR
    })

    //Create NFT row
    let newNFTRow = await $addRow('nFTs',  {
                                            tokenID: tokenID,
                                            walletAddress: wallet,
                                            owner: user.user,
                                            initialDonationRow: newDonationRow,
                                            json: json,
                                            nftType: nftType
    })



    //Prepare email Confirmation
    var msg = {
        to: email,
        from: 'noreply@betterverse.app',
        subject: 'Donation Confirmation - Betterverse',
        //text: 'Hi!',
        html: emailTemplate          
    }

}

else if(nftCount >= 2 && nftCount <= 10){

    var newDonationRows = []

    for(let i = 0; i < nftCount; i++){
        let newDonationRow = await $addRow('capturedDonationData',  {
                                            tokenID: tokenID,
                                            walletAddress: wallet,
                                            user: user.user,
                                            charity: charity, 
                                            charityProject: cause.rowKey,
                                            paymentMethod: paymentMethod,
                                            currency: currency,
                                            donationLocation: location,
                                            donationAmount: donationAmount,
                                            gas: gas,
                                            donationDate: date,
                                            numberOfTreesPlanted: numberOfTrees,
                                            yearlyCarbonSequestration: carbonSequestration,
                                            donationAmountGBP: donationAmountGBP,
                                            donationAmountEUR: donationAmountEUR
        })
        newDonationRows[i] = newDonationRow
    }

    for(let i = 0; i < nftCount; i++){
        let newNFTRow = await $addRow('nFTs',  {
                                            tokenID: tokenID,
                                            walletAddress: wallet,
                                            owner: user.user,
                                            initialDonationRow: newDonationRows[i],
                                            json: json,
                                            nftType: nftType
        })
    }

    //Prepare email confirmation
    var msg = {
        to: email,
        from: 'noreply@betterverse.app',
        subject: 'Donation Confirmation - Betterverse',
        //text: 'Hi,!',
        html: emailTemplate
        //html: 'Thanks for your donations ' + name + ', <br/>' + nftCount + '<br/> <br/> <br/> <a href="donate.betterverse.app">Login</a>'          
    }

}

//Send email
const result = await new Promise((resolve) => {
  sendEmail(msg).then(() => {
    resolve(true)
  }).catch(err => {
    console.log(err)
    resolve(false)
  })
})

context.data = { result, msg }

