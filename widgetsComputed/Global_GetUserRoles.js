const users = $getGrid('users')
const user = _.find(users, { user: fbUser.uid })
if (!user) return []
if (!user.$role) return []
return Object.values(user.$role).map((item) => {
    return item.name
})