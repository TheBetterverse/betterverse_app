const { userId } = context.webhookdata
const email = await getUserEmailByUID(userId)

const msg = {

  to: email,

  from: 'noreply@betterverse.app',

  subject: 'Betterverse | Donation Confirmation',

  text: 'Thanks for donating through Betterverse...',

}

sgMail.send(msg).catch(err => {

  console.log(err)

})

