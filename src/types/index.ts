import {z} from 'zod'
import { CurrencySchema, CryptoCurrencyResponseSchema, PairSchema, CryptoDataFetchSchema} from '../schema/crypto-schema'

export type Currency = z.infer<typeof CurrencySchema>
export type CryptoCurrency = z.infer<typeof CryptoCurrencyResponseSchema>
export type PairSchema = z.infer<typeof PairSchema>
export type CryptoDataFetch = z.infer<typeof CryptoDataFetchSchema>