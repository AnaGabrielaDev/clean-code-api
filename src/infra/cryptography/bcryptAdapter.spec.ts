import bcrypt from "bcrypt"
import { BcryptAdapter } from "./BcrypAdapter"

describe("bcryptAdapter", () => {
	it("Should call bcrypt with correct values", () => {
		const salt = 12
		const sut = new BcryptAdapter(salt)
		const hashSpy = jest.spyOn(bcrypt, "hash")
		sut.encrypt("any_value")
		expect(hashSpy).toHaveBeenCalledWith("any_value", salt)
	})
})
