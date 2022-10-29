import bcrypt from 'bcrypt'


export async function generateHash(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        return hashedPassword
    } catch (err) {
        return undefined
    }
}

export async function checkPassword(password: string, dbPass: string): Promise<boolean> {
    try {
        const result = await bcrypt.compare(password, dbPass)

        return result
    } catch (error) {
        return undefined
    }
}
