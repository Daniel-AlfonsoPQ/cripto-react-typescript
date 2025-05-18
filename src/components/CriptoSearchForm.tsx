import { useState } from "react";
import { currencies } from "../data";
import { useCryptoStore } from "../store";
import type { PairSchema } from "../types";
import ErrorMessage from "./ErrorMessage";

export default function CriptoSearchForm() {

    const {cryptoCurrencies, fetchData} = useCryptoStore()

    const [pair, setPair] = useState<PairSchema>({
        currency: '',
        criptocurrency: ''
    })

    const [error, setError] = useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(pair).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }
        setError('')
        fetchData(pair)
    }
  return (
    <form className="form" onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="field">
            <label htmlFor="currency">Moneda:</label>
            <select 
                name="currency" 
                id="currency" 
                onChange={handleChange} 
                value={pair.currency}
            >
                <option value="">-- Selecciona tu moneda --</option>
                {currencies.map(currencie => (
                    <option key={currencie.code} value={currencie.code}>{currencie.name}</option>
                ))}
            </select>
        </div>

        <div className="field">
            <label htmlFor="criptocurrency">Criptomoneda:</label>
            <select 
                name="criptocurrency" 
                id="criptocurrency" 
                onChange={handleChange}
                value={pair.criptocurrency}
            >
                <option value="">-- Selecciona --</option>
                {cryptoCurrencies.map(crypto => (
                    <option key={crypto.CoinInfo.FullName} value={crypto.CoinInfo.Name}>{crypto.CoinInfo.FullName}</option>
                ))}
            </select>
        </div>

        <input type="submit" value='Cotizar'/>
    </form>
  )
}
