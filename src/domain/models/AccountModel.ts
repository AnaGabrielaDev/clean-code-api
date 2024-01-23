import { randomUUID } from "node:crypto"
interface AccountModelRequest {
	id?: string
	name: string
	email: string
	password: string
}
export class AccountModel {
	id: string
	name: string
	email: string
	password: string

	constructor(props: AccountModelRequest) {
		this.id = props.id ?? randomUUID().toString()
		this.name = props.name
		this.email = props.email
		this.password = props.password
	}
}
