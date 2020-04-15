export const transValidation = {
    email_incorrect: "Email must have format example@company.com!",
    gender_incorrect: "Oops, gender field is incorrect !!!",
    password_incorrect: "Password must have 8 characters " +
        "including Capital and normal letter, " +
        "number and some special characters!",
    password_confirmation_incorrect: "Confirmation password does not match" +
        "the above password!"
};

export const transErrors = {
    account_in_use: "This email has been used.",
    account_removed: "This account is removed by system.",
    account_not_active: "This email is registered but not yet activated."
};

export const transSuccess = {
    userCreated: (userEmail) => {
        return `Account <strong>${userEmail} is registered. Please check your email to activate account.</strong>`;
    }
}