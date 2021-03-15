import React from 'react'

import { formatNumberHumanReadable } from '../../utils/formatters'

export interface MetricsProps {
    name: string
    marketCapUSD: number
    allTimeHighPrice: number
    roi1WeekUSDPercent: number
}

const Metrics: React.FC<MetricsProps> = (props) => {
    const { name, marketCapUSD, allTimeHighPrice, roi1WeekUSDPercent } = props
    return (
        <div className='metrics-container tac'>
            <h2>{`Key Metrics for ${name}`}</h2>
            { marketCapUSD && <p>{`Current Market Cap (USD): $${formatNumberHumanReadable(marketCapUSD)}`}</p> }
            { allTimeHighPrice && <p>{`All-time High (USD): $${formatNumberHumanReadable(allTimeHighPrice)}`}</p> }
            { roi1WeekUSDPercent && <p>{`1-week ROI (USD): ${formatNumberHumanReadable(roi1WeekUSDPercent)}%`}</p> }
        </div>
    )
}

export default Metrics