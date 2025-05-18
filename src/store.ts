import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { CryptoCurrency, PairSchema, CryptoDataFetch } from './types';
import { getCryptos, fetchCryptoCurrency } from './services/CryptoServices';

type CryptoStore = {
    cryptoCurrencies: CryptoCurrency[];
    result: CryptoDataFetch;
    loading: boolean;
    fetchCrypto: () => Promise<void>;
    fetchData: (pair: PairSchema) => Promise<void>;
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptoCurrencies: [],
    result: {
        IMAGEURL : '',
        PRICE: '',
        HIGHDAY: '',
        LOWDAY: '',
        CHANGEPCT24HOUR:'',
        LASTUPDATE: ''
    },
    loading: false,
    fetchCrypto: async () => {
       const cryptoCurrencies = await getCryptos()
        set(() => ({
            cryptoCurrencies,
        }))
    },
    fetchData: async (pair) => {
        set(() => ({
            loading: true,
        }))
        const cryptoResponse = await fetchCryptoCurrency(pair)
        set(() => ({
            result: cryptoResponse,
            loading: false
        }))
    }
})))