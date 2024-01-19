import { AccountModel, AddAccount, AddAccountModel, Encrypter, addAccountRepository } from "./dbAddAccountProtocols";

export class DbAddAccount implements AddAccount{
    private readonly encrypter: Encrypter;
    private readonly addAccountRepository: addAccountRepository;

    constructor(encrypter: Encrypter, addAccountRepository: addAccountRepository) {
        this.encrypter = encrypter;
        this.addAccountRepository = addAccountRepository;
    }

    async add(account: AddAccountModel): Promise<AccountModel> {
        const hashedPassword = await this.encrypter.encrypt(account.password)
        await this.addAccountRepository.add(Object.assign({}, account, {password: hashedPassword}))
        return new Promise(resolve => resolve({} as AccountModel));
    }
}