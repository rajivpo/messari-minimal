import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'


import CandleStickChart from '../../components/CandleStickChart'
import Metrics, { MetricsProps } from '../../components/Metrics/Metrics'

// TODO: marking this as a spot to use getServerSideProps as needed
const AssetPage: React.FC = () => {
    const router = useRouter()
    const { asset } = router.query
    const [seriesData, setSeriesData] = useState(null)
    const [metricsData, setMetricsData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect( () =>  {
        async function getSeriesData() {
            let response = await fetch(`/api/series?asset=${asset}`)
            if (!response.ok) return
            const { data } = await response.json()
            setSeriesData(data)
        }
        async function getMetricsData() {
            const response = await fetch(`/api/metrics?asset=${asset}`)
            if (!response.ok) return
            const { data } = await response.json();
            // process data to just get relevant bits
            const assetMetrics: MetricsProps = {
                name: data.name,
                marketCapUSD: data.marketcap?.current_marketcap_usd,
                allTimeHighPrice: data.all_time_high?.price,
                roi1WeekUSDPercent: data.roi_data?.percent_change_last_1_week
            }
            setMetricsData(assetMetrics)
        }
        async function getAssetData() {
            setLoading(true)
            await getSeriesData()
            await getMetricsData()
            setLoading(false)
        }
        getAssetData()
    }, [asset])

    const assetSymbol = asset && !Array.isArray(asset) ? asset.toUpperCase() : null

    return (
        <div>
            <Head>
                <title>{assetSymbol}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div>
                    <h1 className='tac'>{assetSymbol}</h1>
                    { !loading && <div className='asset-info'>
                        {seriesData && <CandleStickChart title={`${assetSymbol} Price ($USD)`} seriesName={assetSymbol} series={seriesData}/> }
                        {metricsData && <Metrics {...metricsData}/> } 
                    </div>
                    }
                </div>
            </main>
            <footer>
                <Link href='/'>
                    <a>Return to Top 100 List</a>
                </Link>
            </footer>
        </div>
    )
}

export default AssetPage