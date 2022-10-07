const { userId } = context.webhookdata
const email = await getUserEmailByUID(userId)
context.data = email

const userRow = await JSON.parse(context.webhookdata.payload.val1)
var name = userRow.username

if(userRow.firstName){
  name = userRow.firstName
}
else{
  name = userRow.username
}

const msg = {

  to: email,

  from: 'noreply@betterverse.app',

  subject: 'Welcome to Betterverse',

  //text: 'Hi,!',

  html: 'Welcome to Betterverse ' + name + ', <br/>' + '<br/> <br/> <br/> <a href="donate.betterverse.app">Login</a>'          

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

