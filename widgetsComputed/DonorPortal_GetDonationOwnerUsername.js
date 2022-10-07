return function(owner){

const users = $getGrid('users')
let donationOwner = _.find(users, {user: owner})

return donationOwner.username

}