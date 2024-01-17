import { AccountModel } from "../../../domain/models";
import { AddAccount, AddAccountModel } from "../../../domain/useCases";
import { Encrypter } from "../../protocols/encrypter";

export class DbAddAccount implements AddAccount{
    private readonly encrypter: Encrypter;

    constructor(encrypter: Encrypter) {
        this.encrypter = encrypter;
    }

    async add(account: AddAccountModel): Promise<AccountModel> {
        await this.encrypter.encrypt(account.password)
        return new Promise(resolve => resolve({} as AccountModel));
    }
}