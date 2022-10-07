const user = await context.webhookdata.payload.userRowKey

$deleteRow({ gridId: 'users', rowKey: user })

return null