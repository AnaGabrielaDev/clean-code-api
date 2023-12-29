import { MissingParamError } from "../errors/MissingParamError"
import { SignUpController } from "./SignUp"

describe("Sign Up Controller", () => {
	test("Should return 400 if no name is provided", () => {
		const sut = new SignUpController()
		const httpRequest = {
			body: {
				email: "any@mail.com",
				password: "@nyPassword",
				confirmationPassword: "@nyPassword",
			},
		}
		const httpResponse = sut.handle(httpRequest)

		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toEqual(new MissingParamError("name"))
	})

	test("Should return 400 if no email is provided", () => {
		const sut = new SignUpController()
		const httpRequest = {
			body: {
				name: "anyName",
				password: "@nyPassword",
				confirmationPassword: "@nyPassword",
			},
		}
		const httpResponse = sut.handle(httpRequest)

		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toEqual(new MissingParamError("email"))
	})

	test("Should return 400 if no password is provided", () => {
		const sut = new SignUpController()
		const httpRequest = {
			body: {
				name: "anyName",
				email: "any@mail.com",
				confirmationPassword: "@nyPassword",
			},
		}
		const httpResponse = sut.handle(httpRequest)

		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toEqual(new MissingParamError("password"))
	})

	test("Should return 400 if no password confirmation is provided", () => {
		const sut = new SignUpController()
		const httpRequest = {
			body: {
				name: "anyName",
				email: "any@mail.com",
				password: "@nyPassword",
			},
		}
		const httpResponse = sut.handle(httpRequest)

		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toEqual(
			new MissingParamError("passwordConfirmation"),
		)
	})
})
