import { Encrypter } from "../../data/protocols/encrypter";

export class BcryptAdapter implements Encrypter {
    async encrypt(valud: string): Promise<string> {
        return new Promise(resolve => resolve('hash'))  
    }
}