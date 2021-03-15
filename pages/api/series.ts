import fetch from 'node-fetch'
import { CandleStick } from '../../components/CandleStickChart/CandleStickChart'

// TODO: extend to handle specified dates
const getMessariSeriesEndPoint = (asset: string, metric: string): string => {
    return `https://data.messari.io/api/v1/assets/${asset}/metrics/${metric}/time-series`
}

const OHLCToCandlesticks = (OHLC: any[]): CandleStick[] => {
  const candleSticks: CandleStick[] = OHLC.map((ohlc, i) => {
    const [date, open, high, low, close, ...volume] = ohlc
    return {
      date,
      open,
      high,
      low,
      close
    }
  })
  return candleSticks
}

export default async function(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: `Method ${req.method} Not Allowed; Only GET Allowed`})
  } else {
    const asset = req.query?.asset
    const metric = req.query?.price ?? 'price'
    const assetTimeSeriesEndPoint = getMessariSeriesEndPoint(asset, metric)
    const [success, data] = await fetch(assetTimeSeriesEndPoint, {
      method: 'GET',
      headers: {
        'x-messari-api-key': process.env.MESSARI_API_KEY
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.error_code}: ${response.error_message}`)
      }
      return response
    })
    .then(response => response.json())
    .then((responseJson) => {
      if (responseJson && responseJson.data && responseJson.data.values) {
        const formattedOHLCValues = OHLCToCandlesticks(responseJson.data.values)
        return [true, formattedOHLCValues]
      }
      throw new Error('Could not parse response or data not included in response')
    })
    .catch((error) => {
      console.error('Error: ', error)
      return [false, error]
    })
    success ? res.status(200).json({ data }) : res.status(400).json({ message: data})
  }
}