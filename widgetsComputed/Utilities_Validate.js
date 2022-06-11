/* Utilities_Validate */

// return async function (subject, validators) {
//   let errors = []

//   await validators.forEach(async validator => {
//     console.log(validator)
//     let [error, test] = Object.entries(validator)[0]
//     let result = await test(subject)

//     if (!result) errors.push(error)
//   })

//   return errors
// }

return function () {
    return 42
}