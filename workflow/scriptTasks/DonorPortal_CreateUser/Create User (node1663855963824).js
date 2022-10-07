const userRowKey = await context.webhookdata.payload.userRowKey
const username = await context.webhookdata.payload.username
const firstName = await context.webhookdata.payload.firstName
const secondName = await context.webhookdata.payload.secondName
const phoneNumber = await context.webhookdata.payload.phoneNumber
const country = await context.webhookdata.payload.country
const conversionCurrency = await context.webhookdata.payload.conversionCurrency

createLog(callDash, '', username, 'users', userRowKey, 'username')

if(firstName){
    createLog(callDash, '', firstName, 'users', userRowKey, 'firstName')
}

if(secondName){
    createLog(callDash, '', secondName, 'users', userRowKey, 'lastName')
}
