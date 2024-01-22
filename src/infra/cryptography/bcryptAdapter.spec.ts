import bcrypt from "bcrypt"
import { BcryptAdapter } from "./BcryptAdapter"

jest.mock("bcrypt", () => ({
	async hash(): Promise<string> {
		return new Promise((resolve) => resolve("hash"))
	},
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
	return new BcryptAdapter(salt)
}

describe("bcryptAdapter", () => {
	it("Should call bcrypt with correct values", () => {
		const sut = makeSut()
		const hashSpy = jest.spyOn(bcrypt, "hash")
		sut.encrypt("any_value")
		expect(hashSpy).toHaveBeenCalledWith("any_value", salt)
	})

	it("Should return a hash on success", async () => {
		const sut = makeSut()
		const hash = await sut.encrypt("any_value")
		expect(hash).toBe("hash")
	})

	it("Should throw if bcrypter throws", async () => {
		const sut = makeSut()
		jest.spyOn(bcrypt, "hash").mockImplementationOnce(() => {
			throw new Error()
		})
		const promise = sut.encrypt("any_value")
		await expect(promise).rejects.toThrow()
	})
})
