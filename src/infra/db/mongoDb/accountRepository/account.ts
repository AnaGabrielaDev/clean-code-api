import { addAccountRepository } from "../../../../data/protocols/addAccountRepository"
import { AccountModel } from "../../../../domain/models"
import { AddAccountModel } from "../../../../domain/useCases"
import { MongoHelper } from "../helpers/mongoHelper"

export class AccountMongoRepository implements addAccountRepository {
	async add(accountData: AddAccountModel): Promise<AccountModel> {
		const accountCollection = MongoHelper.getCollection("accounts")
		const response = await accountCollection.insertOne(accountData)

		const createdAccount = await accountCollection.findOne({
			_id: response.insertedId,
		})

		if (!createdAccount) {
			throw new Error("Account not created")
		}

		return MongoHelper.map(createdAccount)
	}
}
