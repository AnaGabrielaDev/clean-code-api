import { MongoClient } from "mongodb"

export const MongoHelper = {
	connection: null as unknown as MongoClient,

	async connect(uri: string) {
		this.connection = await MongoClient.connect(uri)
	},

	async disconnect() {
		await this.connection.close()
	},

	getCollection(name: string) {
		return this.connection.db().collection(name)
	},

	map(collection: any): any {
		const { _id, ...collectionWithoutId } = collection
		return { ...collectionWithoutId, id: _id }
	},
}
