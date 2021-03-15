import React from 'react'

import { scaleTime } from 'd3-scale';
import { utcHour } from 'd3-time';
import { format } from 'd3-format';
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from 'react-stockcharts';
import { CandlestickSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last, timeIntervalBarWidth } from 'react-stockcharts/lib/utils';
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY
} from 'react-stockcharts/lib/coordinates';

export type CandleStick = {
    date: Date
    open: number
    high: number
    low: number
    close: number
}

interface CandleStickChartProps { 
    title: string
    seriesName: string
    series: CandleStick[]
}

// adapted from: https://github.com/rrag/react-stockcharts-examples2/tree/master/examples/CandleStickChart
// hooks/functional components are not supported in this library and there are still old bindings to class component (componentWillMount)
// TODO: add axes
// TODO: ability to toggle between different price intervals (e.g. 1 week, 1 day, 1hr)
// TODO: automatically query for new data as edge of interval is being reached

class CandleStickChart extends React.Component<CandleStickChartProps>  { 
    render() {
        const { width, data, ratio, name } = this.props
        const xAccessor = d => d.date;
        const xExtents = [
            xAccessor(last(data)),
            xAccessor(data[data.length - 100])
        ];

        const height = 400
        const margin = { left: 50, right: 50, top: 30, bottom: 30 }
        // these were set based on trial + error
        const xAxisTicks = process.browser && window && window.innerWidth < 600 ? Math.min(data.length, 5) : Math.min(data.length, 10)
    
        return (
            <ChartCanvas height={height}
                ratio={ratio}
                width={width}
                margin={margin}
                type={'svg'}
                seriesName={name}
                data={data}
                xAccessor={xAccessor}
                xScale={scaleTime()}
                xExtents={xExtents}>
    
                    <Chart id={1} yExtents={d => [d.high, d.low]}>
                        <XAxis axisAt='bottom' orient='bottom' ticks={xAxisTicks}/>
                        <YAxis axisAt='left' orient='left' ticks={5} />
                        <MouseCoordinateY
						at='right'
						orient='right'
						displayFormat={format('.4s')}
					    />
                        <MouseCoordinateX
						at='bottom'
						orient='right'
						displayFormat={timeFormat("%Y-%m-%d")}
					    />
                        <CandlestickSeries width={timeIntervalBarWidth(utcHour)}/>
                        <CrossHairCursor />

                    </Chart>
                </ChartCanvas>
        )
    }
}

const FittedChart = fitWidth(CandleStickChart)

const FittedCandleStickChart: React.FC<CandleStickChartProps> = (props) => {
    const { seriesName, series, title} = props
    return (
        <div className='candle-stick-chart-container'>
            <h2 className={'tac'}>{title}</h2>
            <FittedChart data={series} name={seriesName} />
        </div>
    )
}

export default FittedCandleStickChart