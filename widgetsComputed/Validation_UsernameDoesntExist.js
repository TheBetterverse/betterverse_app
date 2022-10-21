/* Validation_UsernameDoesntExist.js */

return subject => {
    // Get current user row key
    const userRowKey = this.DonorPortal_GetCurrentUserRowKey()

    // Get all users and filter current user from it
    const users = $getGrid('users').filter(row => row.rowKey != userRowKey)

    //Check if username param exists in users already
    for (i = 0; i < users.length; i++) {
        if (users[i].username == subject) {
            return false
        }
    }

    return true
}
