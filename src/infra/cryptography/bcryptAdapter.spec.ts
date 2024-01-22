import bcrypt from "bcrypt"
import { BcryptAdapter } from "./BcryptAdapter"

jest.mock("bcrypt", () => ({
	async hash(): Promise<string> {
		return new Promise((resolve) => resolve("hash"))
	},
}))

describe("bcryptAdapter", () => {
	it("Should call bcrypt with correct values", () => {
		const salt = 12
		const sut = new BcryptAdapter(salt)
		const hashSpy = jest.spyOn(bcrypt, "hash")
		sut.encrypt("any_value")
		expect(hashSpy).toHaveBeenCalledWith("any_value", salt)
	})

	it("Should return a hash on success", async () => {
		const salt = 12
		const sut = new BcryptAdapter(salt)
		const hash = await sut.encrypt("any_value")
		expect(hash).toBe("hash")
	})
})
