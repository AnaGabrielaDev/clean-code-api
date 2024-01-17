import validator from "validator";
import { EmailValidatorAdapter } from "./EmailValidatorAdapter";

jest.mock('validator', () => ({
    isEmail(): boolean {
        return true;
    }
}))

describe('EmailValidatorAdapter', () => {
    it('Should return false if validator returns false', () => {
        const sut = new EmailValidatorAdapter();
        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
        const isValid = sut.isValid('invalid@mail.com')
        expect(isValid).toBe(false);
    })

    it('Should return true if validator returns true', () => {
        const sut = new EmailValidatorAdapter();
        const isValid = sut.isValid('invalid@mail.com')

        expect(isValid).toBe(true);
    })

    it('Should call validator with correct email', () => {
        const sut = new EmailValidatorAdapter();
        const isEmailSpy = jest.spyOn(validator, 'isEmail')
        sut.isValid('any@mail.com')
        expect(isEmailSpy).toHaveBeenCalledWith('any@mail.com')
    })

});