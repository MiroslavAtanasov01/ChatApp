const gerRecipientEmail = (users, userLoggedIn) =>
    users?.filter((userToFIlter) => userToFIlter !== userLoggedIn?.email)[0]

export default gerRecipientEmail