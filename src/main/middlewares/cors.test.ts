import request from "supertest"
import { app } from "../config/app"

describe("Cors Middleware", () => {
	it("Should enable cors", async () => {
		app.post("/test/cors", (req, res) => {
			res.send()
		})
		await request(app)
			.post("/test/cors")
			.expect("access-control-allow-origin", "*")
			.expect("access-control-allow-headers", "*")
			.expect("access-control-allow-methods", "*")
	})
})
