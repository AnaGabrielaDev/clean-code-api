import { SignUpController } from "./SignUp"

describe("Sign Up Controller", () => {
	test("Should return 400 if no name is provided", () => {
		const sut = new SignUpController()
		const httpRequest = {
			body: {
				name: "anyName",
				email: "any@mail.com",
				password: "@nyPassword",
				confirmationPassword: "@nyPassword",
			},
		}
		const httpResponse = sut.handle(httpRequest)

		expect(httpResponse.statusCode).toBe(400)
	})
})