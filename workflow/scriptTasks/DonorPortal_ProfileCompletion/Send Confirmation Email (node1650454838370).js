const { userId } = context.webhookdata
const email = await getUserEmailByUID(userId)

const msg = {

  to: email,

  from: 'noreply@betterverse.app',

  subject: 'Welcome to Betterverse!',

  text: 'welcome to betterverse text.....',

}

sgMail.send(msg).catch(err => {

  console.log(err)

})

