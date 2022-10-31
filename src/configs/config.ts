import path from 'path'
import dotenv from 'dotenv'
import * as fs from 'fs';

// Parsing the env file
let envFilePath
envFilePath = fs.existsSync(path.resolve(__dirname, '../../.env')) ? path.resolve(__dirname, '../../.env') : path.resolve('/etc/secrets/.env')
dotenv.config({ path: envFilePath })

// interface for env file
interface ENV {
    PORT: number | undefined;
    DATABASE_URL: string | undefined
    JWT_SECRET_KEY: string | undefined
}

// interface for config object generation
interface Config {
    PORT: number
    DATABASE_URL: string
    JWT_SECRET_KEY: string
}

// Loading process.env as ENV interface
const getConfig = (): ENV => ({
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
})

// checking if all the nev are defined if not throw ann error
const getVerifiedConfig = (config: ENV): Config => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`)
        }
    }

    return config as Config
}

const config = getConfig()

const verifiedConfig = getVerifiedConfig(config)

export default verifiedConfig

