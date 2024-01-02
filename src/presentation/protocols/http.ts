export interface HttpResponse {
	statusCode: number
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	body: any
}

export interface HttpRequest {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	body?: any
}
