import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import AssetsList from '../components/AssetsList'
import styles from '../styles/Home.module.css'

// TODO: add sorting, pagination, and probably a global store to minimize unnecessary requests
// TODO: depending on whether server-side rendering is preferred (will definitely minimize latency for meaningful paints),
// it is worthwhile to move initial fetch into `getServerSideProps`
export default function Home() {

  const [top100Assets, setTop100Assets] = useState(null)
  useEffect(() => {
    async function getTop100Assets() {
      const response = await fetch('/api/assets')
      if (!response.ok) return
      const { data } = await response.json()
      setTop100Assets(data)
    }
    getTop100Assets()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>"Technical Analysis"</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className='tac'>
          <h1>"Techncial Analysis"</h1>
          <p>Barebone token metrics for those who do not know about Messari</p>
        </div>

        <div className={styles.token_list}>
          <h2>Top 100 Assets by Marketcap</h2>
          <AssetsList assets={top100Assets}/>
        </div>

      </main>
    </div>
  )
}
