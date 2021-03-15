import React from 'react'
import Link from 'next/link'

export interface Asset {
    symbol: string
    name: string
}

interface AssetListsProps {
    assets: Asset[]
}

const AssetsList: React.FC<AssetListsProps> = (props) => {
    const { assets } = props
    return (
        <div className='tac'>
            <ol>
                { assets && assets.map((asset, i) => {
                    return (
                        <li key={asset.symbol + i}>
                            <Link href={`/asset/${asset.symbol}`}>
                                <a>{asset.name}</a>
                            </Link>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}

export default AssetsList