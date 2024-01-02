import { ServerError, InvalidParamError, MissingParamError } from "../../errors"
import { SignUpController } from "./SignUp"
import {
	EmailValidator,
	AccountModel,
	AddAccount,
	AddAccountModel,
} from "./signUpProtocols"

interface SutTypes {
	sut: SignUpController
	emailValidatorStub: EmailValidator
	addAccountStub: AddAccount
}

const makeEmailValidator = (): EmailValidator => {
	class EmailValidatorStub implements EmailValidator {
		isValid(email: string): boolean {
			return true
		}
	}
	return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
	class AddAccountStub implements AddAccount {
		async add(account: AddAccountModel): Promise<AccountModel> {
			const fakeAccount = {
				id: "validId",
				name: "validName",
				email: "valid@mail.com",
				password: "v@lidPassword",
			}

			return new Promise((resolve) => resolve(fakeAccount))
		}
	}
	return new AddAccountStub()
}

const makeSut = (): SutTypes => {
	const emailValidatorStub = makeEmailValidator()
	const addAccountStub = makeAddAccount()
	const sut = new SignUpController(emailValidatorStub, addAccountStub)
	return {
		emailValidatorStub,
		sut,
		addAccountStub,
	}
}

describe("Sign Up Controller", () => {
	test("Should return 400 if no name is provided", async () => {
		const { sut } = makeSut()
		const httpRequest = {
			body: {
				email: "any@mail.com",
				password: "@nyPassword",
				passwordConfirmation: "@nyPassword",
			},
		}
		const httpResponse = await sut.handle(httpRequest)

		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toEqual(new MissingParamError("name"))
	})

	test("Should return 400 if no email is provided", async () => {
		const { sut } = makeSut()
		const httpRequest = {
			body: {
				name: "anyName",
				password: "@nyPassword",
				passwordConfirmation: "@nyPassword",
			},
		}
		const httpResponse = await sut.handle(httpRequest)

		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toEqual(new MissingParamError("email"))
	})

	test("Should return 400 if no password is provided", async () => {
		const { sut } = makeSut()
		const httpRequest = {
			body: {
				name: "anyName",
				email: "any@mail.com",
				passwordConfirmation: "@nyPassword",
			},
		}
		const httpResponse = await sut.handle(httpRequest)

		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toEqual(new MissingParamError("password"))
	})

	test("Should return 400 if no password confirmation is provided", async () => {
		const { sut } = makeSut()
		const httpRequest = {
			body: {
				name: "anyName",
				email: "any@mail.com",
				password: "@nyPassword",
			},
		}
		const httpResponse = await sut.handle(httpRequest)

		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toEqual(
			new MissingParamError("passwordConfirmation"),
		)
	})

	test("Should return 400 if password confirmation fails", async () => {
		const { sut } = makeSut()
		const httpRequest = {
			body: {
				name: "anyName",
				email: "any@mail.com",
				password: "@nyPassword",
				passwordConfirmation: "invalidPassword",
			},
		}
		const httpResponse = await sut.handle(httpRequest)

		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toEqual(
			new InvalidParamError("passwordConfirmation"),
		)
	})

	test("Should return 400 if an invalid email is provided", async () => {
		const { sut, emailValidatorStub } = makeSut()
		jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false)
		const httpRequest = {
			body: {
				name: "anyName",
				email: "invalid@mail.com",
				password: "@nyPassword",
				passwordConfirmation: "@nyPassword",
			},
		}

		const httpResponse = await sut.handle(httpRequest)

		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toEqual(new InvalidParamError("email"))
	})

	test("Should call EmailValidator with correct email", async () => {
		const { sut, emailValidatorStub } = makeSut()
		const isValidSpy = jest.spyOn(emailValidatorStub, "isValid")
		const httpRequest = {
			body: {
				name: "anyName",
				email: "any@mail.com",
				password: "@nyPassword",
				passwordConfirmation: "@nyPassword",
			},
		}

		sut.handle(httpRequest)

		expect(isValidSpy).toHaveBeenCalledWith("any@mail.com")
	})

	test("Should return 500 if EmailValidator throws", async () => {
		const { sut, emailValidatorStub } = makeSut()
		jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
			throw new Error()
		})

		const httpRequest = {
			body: {
				name: "anyName",
				email: "invalid@mail.com",
				password: "@nyPassword",
				passwordConfirmation: "@nyPassword",
			},
		}

		const httpResponse = await sut.handle(httpRequest)

		expect(httpResponse.statusCode).toBe(500)
		expect(httpResponse.body).toEqual(new ServerError())
	})

	test("Should return 500 if AddAccount throws", async () => {
		const { sut, addAccountStub } = makeSut()
		jest.spyOn(addAccountStub, "add").mockImplementationOnce(async () => {
			return new Promise((resolve, reject) => reject(new Error()))
		})

		const httpRequest = {
			body: {
				name: "anyName",
				email: "invalid@mail.com",
				password: "@nyPassword",
				passwordConfirmation: "@nyPassword",
			},
		}

		const httpResponse = await sut.handle(httpRequest)

		expect(httpResponse.statusCode).toBe(500)
		expect(httpResponse.body).toEqual(new ServerError())
	})

	test("Should call addAccount with corrects values", async () => {
		const { sut, addAccountStub } = makeSut()
		const addSpy = jest.spyOn(addAccountStub, "add")
		const httpRequest = {
			body: {
				name: "anyName",
				email: "any@mail.com",
				password: "@nyPassword",
				passwordConfirmation: "@nyPassword",
			},
		}

		sut.handle(httpRequest)

		expect(addSpy).toHaveBeenCalledWith({
			name: "anyName",
			email: "any@mail.com",
			password: "@nyPassword",
		})
	})

	test("Should return 200 if valid data is provided", async () => {
		const { sut } = makeSut()
		const httpRequest = {
			body: {
				name: "valaaaidName",
				email: "valid@mail.com",
				password: "v@lidPassword",
				passwordConfirmation: "v@lidPassword",
			},
		}

		const httpResponse = await sut.handle(httpRequest)

		expect(httpResponse.statusCode).toBe(200)
		expect(httpResponse.body).toEqual({
			id: "validId",
			name: "validName",
			email: "valid@mail.com",
			password: "v@lidPassword",
		})
	})
})
