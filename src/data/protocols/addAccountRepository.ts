import { AccountModel } from "../../domain/models";
import { AddAccountModel } from "../../domain/useCases";

export interface addAccountRepository {
    add (accountData: AddAccountModel): Promise<AccountModel>
}