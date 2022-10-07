return function(username, userRowKey){

    //Get all users
    const users = $getGrid('users').filter(row => row.rowKey != userRowKey)

    //Check if username param exists in users already
    for(i = 0; i < users.length; i++){
        if (users[i].username == username){
            return true
        }
    }

    return false
}