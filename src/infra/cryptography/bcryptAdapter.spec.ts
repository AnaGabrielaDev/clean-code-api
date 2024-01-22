import bcrypt from 'bcrypt'

describe('bcryptAdapter', () => { 
    it('Should call bcrypt with correct values', () => {
        const sut = new BcryptAdapter()
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        sut.encrypt('any_value')
        expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
    })
})
