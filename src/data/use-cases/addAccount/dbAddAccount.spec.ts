import { resolve } from "path"
import { Encrypter } from "../../protocols/encrypter"
import { DbAddAccount } from "./DbAddAccount"
import { AccountModel, AddAccountModel, addAccountRepository } from "./dbAddAccountProtocols"

interface SutTypes {
    sut: DbAddAccount,
    encrypterStub: Encrypter,
    addAccountRepositoryStub: addAccountRepository
}

const makeEncrypterStub = (): Encrypter => {
    class EncrypterStub implements Encrypter{
        async encrypt(value: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'))
        }
    }

    return new EncrypterStub()
}

const makeAddAccountRepositoryStub = (): addAccountRepository => {
    class AddAccountRepositoryStub implements addAccountRepository{
        async add(accountData: AddAccountModel): Promise<AccountModel> {
            const fakeAccount = {
                id: 'valid_id',
                name: 'valid_name',
                email: 'valid_name',
                password: 'hashed_password'
            }
            return new Promise(resolve => resolve(fakeAccount))
        }
    }

    return new AddAccountRepositoryStub()
}

const makeSut = (): SutTypes => {
    const addAccountRepositoryStub = makeAddAccountRepositoryStub()
    const encrypterStub = makeEncrypterStub()
    const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
    
    return {
        sut, 
        encrypterStub,
        addAccountRepositoryStub
    }
}

describe('DbAddAccountUseCase', () => {
    it("Should call AddAccountRepository with correct values", async () => {
        const {sut, addAccountRepositoryStub} = makeSut()
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
        const accountData = {
            name: 'valid_name',
            email: 'valid_name',
            password: 'valid_password'
        }

        await sut.add(accountData)

        expect(addSpy).toHaveBeenCalledWith({
            name: 'valid_name',
            email: 'valid_name',
            password: 'hashed_password'
        })
    })
    it('Should call Encrypter with correct password', async () => {
        const {sut, encrypterStub} = makeSut()
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
        const accountData = {
            name: 'valid_name',
            email: 'valid_name',
            password: 'valid_password'
        }

        await sut.add(accountData)

        expect(encryptSpy).toHaveBeenCalledWith('valid_password')
    })

    it('Should trhow if Encrypter throws', () => {
        const {sut, encrypterStub} = makeSut()
        jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const accountData = {
            name: 'valid_name',
            email: 'valid_name',
            password: 'valid_password'
        }

        const promise = sut.add(accountData)

        expect(promise).rejects.toThrow()
    })

    it('Should call if AddAccountRepository with correct values', async () => {
        const {sut, addAccountRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
        const accountData = {
            name: 'valid_name',
            email: 'valid_name',
            password: 'valid_password'
        }

        await sut.add(accountData)

        expect(addSpy).toHaveBeenCalledWith({
            name: 'valid_name',
            email: 'valid_name',
            password: 'hashed_password'
        })
    })
})