
// NODE MODULES
const emailValidator = require('email-validator');
const PasswordValidator = require('password-validator');
const chalk = require('chalk');

function validateEmail(email) {
    try {
        if (!emailValidator.validate(email)) {
            console.log(chalk.red(` ! Email is invalid`));
            return false;
        }

        return true;
    } catch (error) {
        console.log(`Error in validator.js`, `${error.message}`);
    }
}

function validatePassword(password) {

    try {

        const passwordSchema = new PasswordValidator();

        passwordSchema
        .is().min(8)                                                // Minimum length 8
        .is().max(100)                                              // Maximum length 100
        .has().uppercase()                                          // Must have uppercase letters
        .has().lowercase()                                          // Must have lowercase letters
        .has().digits(2)                                            // Must have at least 2 digits
        .has().not().spaces()                                       // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123', '12345678']); // Blacklist these values
    
        if (!passwordSchema.validate(password)) {
            console.log(chalk.red(` ! Password is invalid`));
            return false;
        }
    
        return true;
    } catch (error) {
        console.log(`Error in validator.js`, `${error.message}`);
    }

}

const authValidators = {
    validatePassword, 
    validateEmail
}

export default authValidators;

