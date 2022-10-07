if (context.payload.email) {
    await sendResetPasswordEmail({
        email: context.payload.email,
        workspaceId: '-N3z8rEgVVtApDNoNjXV',
        link: 'https://give.betterverse.app/dashboard/-N3z8rEgVVtApDNoNjXV?tab=-Mx_5FLL2jlxjXYUMdIL&subtab=-N9f-kGWoRBLWIFiAyAc&token={token}'
    })

    context.data.sent = true
} else if (context.payload.password) {
    await resetPasswordByToken({
        password: context.payload.password,
        resetToken: context.payload.token,
    })

    context.data.reset = true
}