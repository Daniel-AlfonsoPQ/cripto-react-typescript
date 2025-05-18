import axios from 'axios';
import { CryptoCurrenciesResponseSchema, CryptoDataFetchSchema } from '../schema/crypto-schema';
import type { PairSchema } from '../types';

export async function getCryptos() {
    const url ='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    const {data: {Data}} = await axios.get(url);
    const result = CryptoCurrenciesResponseSchema.safeParse(Data);
    if (result.success) {
        return result.data;
    }
}

export async function fetchCryptoCurrency(Pair: PairSchema) {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${Pair.criptocurrency}&tsyms=${Pair.currency}`;
    const { data: { DISPLAY } } = await axios.get(url);
    const result = CryptoDataFetchSchema.safeParse(DISPLAY[Pair.criptocurrency][Pair.currency]);
    if (result.success) {
        return result.data;
    }
}