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
});