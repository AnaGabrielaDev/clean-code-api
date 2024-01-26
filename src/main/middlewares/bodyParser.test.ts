import request from "supertest"
import { app } from "../config/app"

describe("Body Parser Middleware", () => {
	it("Should parse body as json", async () => {
		app.post("/test/bodyParser", (req, res) => {
			res.send(req.body)
		})
		await request(app)
			.post("/test/bodyParser")
			.send({ name: "Any" })
			.expect({ name: "Any" })
	})
})
