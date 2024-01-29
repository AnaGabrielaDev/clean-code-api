import { Middleware } from "./Middleware"

export class contentType extends Middleware {
	constructor(private readonly contentType: string) {
		super()
	}

	cors = (req: any, res: any, next: any) => {
		res.set("access-control-allow-origin", "*")
		res.set("access-control-allow-headers", "*")
		res.set("access-control-allow-methods", "*")
		next()
	}
}
