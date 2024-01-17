export interface Encrypter {
    encrypt (valud: string): Promise<string>
}