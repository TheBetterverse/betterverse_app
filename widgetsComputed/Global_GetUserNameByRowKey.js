//Global_GetUserNameByRowKey.js

return (rowKey) => {

    //Get user's name by email
    var userRow = $dataGrid('users')[rowKey]
    var name = ''

    if(userRow.firstName){
        name = userRow.firstName
    }
    else{
        name = userRow.username
    }

    return name

}