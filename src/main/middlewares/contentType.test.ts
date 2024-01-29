import request from "supertest"
import { app } from "../config/app"

describe("Content Type Middleware", () => {
	it("Should return default content type as json", async () => {
		app.get("/test/contentType", (req, res) => {
			res.json()
		})
		await request(app).get("/test/contentType").expect("content-type", /json/)
	})

	it("Should return xml content type when forced", async () => {
		app.get("/test/contentType/xml", (req, res) => {
			res.type("xml")
			res.send("<message>Some XML content</message>")
		})

		await request(app)
			.get("/test/contentType/xml")
			.expect("content-type", /xml/)
	})
})
