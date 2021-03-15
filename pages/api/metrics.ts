import fetch from 'node-fetch'

// TODO: extend to handle specified dates
const getMessariMetricsEndPoint = (asset: string): string => {
    return `https://data.messari.io/api/v1/assets/${asset.toLowerCase()}/metrics`
}

export default async function(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: `Method ${req.method} Not Allowed; Only GET Allowed`})
  } else {
    const asset = req.query?.asset
    const assetMetricsEndpoint = getMessariMetricsEndPoint(asset)
    const [success, data] = await fetch(assetMetricsEndpoint, {
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
      if (responseJson && responseJson.data && responseJson.data) {
        return [true, responseJson.data]
      } else {
        throw new Error('Could not parse response or data not included in response')
      }
    })
    .catch((error) => {
      console.error('Error: ', error)
      return [false, error]
    })
    success ? res.status(200).json({ data }) : res.status(400).json({ message: data})
  }
}