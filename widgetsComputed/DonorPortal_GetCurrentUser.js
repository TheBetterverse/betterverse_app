return function(){

    //Get users table
    const users = $getGrid('users')

    //Get current user details
    let currentUserUID = fbUser.uid
    
    //Get current user row
    let currentUser = _.find(users, { user: fbUser.uid })

    return currentUser
}