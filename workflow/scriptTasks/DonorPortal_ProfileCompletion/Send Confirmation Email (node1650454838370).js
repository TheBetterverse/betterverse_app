const { userId } = context.webhookdata
const email = await getUserEmailByUID(userId)
context.data = email

const userRow = await JSON.parse(context.webhookdata.payload.val1)
var name = userRow.username

const emailTemplate =
`<div>
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #EFEDE7; height: 500px;">
    <tr height="100px;">
      <td align="center">
        <img src="https://uploads-ssl.webflow.com/62554ccc10f0e2be91a8c9fc/633c46678133f7deb08265bc_betterverse-logo.png" style="height: 50px;" />
    </tr>
    <tr height="300px;">
      <td align="center">
        <div style="font-family: 'Courier New', monospace; height: 100%; font-size: 14px; position: relative; background-color: #ECEAE3; line-height: 21px; border-bottom: 1px solid #E3E1DB; border-top: 1px solid #E3E1DB; vertical-align:middle; ">
          <div style="margin: auto; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 50%;">
            <h3 style="color: black;">Account set-up complete!</h3>
                <p>
                <div style="color: black;"> Thanks for creating an account with us. </div>
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
              <a href="https://www.betteverse.app/team/#contact" target="_blank" style="color: black;">Contact Us</a> • <a href="https://www.betterverse.app/legal" target="_blank" style="color: black;">Terms of Use</a> • <a href="https://www.betterverse.app/legal" target="_blank" style="color: black;">Privacy Policy</a>
            </b>
          </div>
          </p>
        </div>
      </div>
    </tr>
  </table>
</div>
`
if(userRow.firstName){
  name = userRow.firstName
}
else{
  name = userRow.username
}

const msg = {

  to: email,

  from: 'noreply@betterverse.app',

  subject: 'Betterverse | Welcome',

  //text: 'Hi,!',

  html: emailTemplate         

}

/*sgMail.send(msg).catch(err => {

  console.log(err)

})*/

const result = await new Promise((resolve) => {
  sendEmail(msg).then(() => {
    resolve(true)
  }).catch(err => {
    console.log(err)
    resolve(false)
  })
})

context.data = { result, msg }

