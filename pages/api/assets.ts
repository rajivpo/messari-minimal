import fetch from 'node-fetch'

//TODO: extend functionality to interact with entirety of assets v2 api
const getMessariAssetsEndpoint = (page: number): string => {
    return `https://data.messari.io/api/v2/assets?page=${page}&fields=symbol,name&limit=100`
}

export default async function(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: `Method ${req.method} Not Allowed; Only GET Allowed`})
  } else {
    const page = req.query?.page || 1
    const assetsEndpoint = getMessariAssetsEndpoint(page)
    const [success, data] = await fetch(assetsEndpoint, {
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