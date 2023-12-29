import { InvalidParamError } from "../errors/InvalidParamError"
import { MissingParamError } from "../errors/MissingParamError"
import { ServerError } from "../errors/ServerError"
import { badRequest, serverError } from "../helper/httpHelper"
import { Controller } from "../protocols/controller"
import { EmailValidator } from "../protocols/emailValidator"
import { HttpRequest, HttpResponse } from "../protocols/http"

export class SignUpController implements Controller {
	private readonly emailValidator: EmailValidator

	constructor(emailValidator: EmailValidator) {
		this.emailValidator = emailValidator
	}

	handle(httpRequest: HttpRequest): HttpResponse {
		try {
			const requiredFields = [
				"name",
				"email",
				"password",
				"passwordConfirmation",
			]

			for (const field of requiredFields) {
				if (!httpRequest.body[field]) {
					return badRequest(new MissingParamError(field))
				}
			}

			if (!this.emailValidator.isValid(httpRequest.body.email)) {
				return badRequest(new InvalidParamError("email"))
			}

			return {
				statusCode: 200,
				body: "ok",
			}
		} catch (error) {
			return serverError()
		}
	}
}
