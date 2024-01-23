import { MongoClient } from "mongodb"

export const MongoHelper = {
	connection: null as unknown as MongoClient,

	async connect(uri: string) {
		this.connection = await MongoClient.connect(uri)
	},

	async disconnect() {
		await this.connection.close()
	},
}
