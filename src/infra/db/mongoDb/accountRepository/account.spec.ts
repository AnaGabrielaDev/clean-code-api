import { MongoHelper } from "../helpers/mongoHelper"
import { AccountMongoRepository } from "./account"

describe("Account Mongo Repository", () => {
	beforeAll(async () => {
		await MongoHelper.connect(process.env.MONGO_URL as string)
	})

	afterAll(async () => {
		await MongoHelper.disconnect()
	})

	it("Should return an account on success", async () => {
		const sut = new AccountMongoRepository()
		const account = await sut.add({
			name: "any_name",
			email: "any@mail.com",
			password: "any_password",
		})
		console.log(account)
		expect(account).toBeTruthy()
		expect(account.id).toBeTruthy()
		expect(account.name).toBe("any_name")
		expect(account.email).toBe("any@mail.com")
		expect(account.password).toBe("any_password")
	})
})
