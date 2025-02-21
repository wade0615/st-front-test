import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import ExceptionHandleService from 'utils/ExceptionHandler';
import './Chart.scss';

const _EHS = new ExceptionHandleService({
  _NAME: 'utils/Chart.tsx',
  _NOTICE: ''
});

// const labelClassName = 'label';
const axisXClassName = 'axisX';
const tickClassName = 'ticksClassName';
const lineClassName = 'lineClassName';
// const toolTipClassName = 'toolTipClassName';

interface ChartData {
  xAxis: string;
  yAxis_1: number;
  yAxis_2: number;
}

interface ChartProps {
  chartData: ChartData[];
}

const Chart: React.FC<ChartProps> = ({ chartData }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const d3Ref = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    value: string;
  } | null>(null);

  // 偵測父層寬度，依比例設置圖片 height
  useEffect(() => {
    const parentWidth = wrapperRef.current?.offsetWidth;
    const windowHeight = window.innerHeight ?? 0;
    const maxHeight = windowHeight * 0.8;
    if (parentWidth) {
      const svgHeight = (3 / 5) * parentWidth;
      if (svgHeight > maxHeight) {
        setSvgHeight(maxHeight);
        return;
      }
      setSvgHeight(svgHeight);
    }
    const handleSetHeight = () => {
      const parentWidth = wrapperRef.current?.offsetWidth;
      const windowHeight = window.innerHeight ?? 0;
      const maxHeight = windowHeight * 0.8;
      if (parentWidth) {
        const svgHeight = (3 / 5) * parentWidth;
        if (svgHeight > maxHeight) {
          setSvgHeight(maxHeight);
          return;
        }
        setSvgHeight(svgHeight);
      }
    };
    window.addEventListener('resize', handleSetHeight);
    return () => {
      window.removeEventListener('resize', handleSetHeight);
    };
  }, []);

  useEffect(() => {
    const targetDom = d3Ref.current;
    if (!targetDom) return;

    drawChart();

    function drawChart() {
      try {
        const svgSize = {
          width: 500,
          height: 300
        };

        const margin = { top: 10, bottom: 60, right: 60, left: 100 };

        const chartSize = {
          width: svgSize.width - margin.left - margin.right,
          height: svgSize.height - margin.top - margin.bottom
        };

        const x = d3
          .scaleBand()
          .rangeRound([0, chartSize.width])
          .padding(
            chartData.length < 7 ? (10 - chartData.length) / 10 - 0.1 : 0.2
          )
          .domain(chartData.map((item) => item.xAxis))
          .align(0.4);

        // 定義的 yAxis_1 的 Y 軸
        const yAxis_1Max =
          ((d3.max(chartData, (item) => item.yAxis_1) ?? 0) * 8) / 7;
        const yAxis_1Rate = d3
          .scaleLinear()
          .range([chartSize.height, 0])
          .domain([0, yAxis_1Max ? yAxis_1Max : 1]);
        // 定義的 yAxis_2 的 Y 軸
        const yAxis_2Max =
          ((d3.max(chartData, (item) => item.yAxis_2) ?? 0) * 8) / 7;
        const yAxis_2Min =
          ((d3.min(chartData, (item) => item.yAxis_2) ?? 0) * 8) / 7;
        const yAxis_2Rate = d3
          .scaleLinear()
          .range([chartSize.height, 0])
          .domain([yAxis_2Min, yAxis_2Max ? yAxis_2Max : 1]);

        const svg = d3
          .select(targetDom)
          .append('svg')
          .attr('viewBox', `0 0 ${svgSize.width} ${svgSize.height}`);

        const chart = svg
          .append('g')
          .attr('transform', `translate(${margin.left}, ${margin.top})`);

        chart
          .append('g')
          .call(
            d3
              .axisBottom(x)
              .tickSizeOuter(0)
              .tickSizeInner(0)
              .tickPadding(10)
              .tickValues(x.domain().filter((d, i) => i % 12 === 0)) // 每 ? 個顯示一次標籤
          )
          .attr('transform', `translate(0, ${chartSize.height})`)
          .classed(axisXClassName, true)
          .selectAll('text')
          .attr('transform', 'rotate(45)')
          .style('text-anchor', 'start');

        const yForLine = d3
          .scaleLinear()
          .range([chartSize.height, 0])
          .domain([0, 4]);
        chart
          .append('g')
          .call(
            d3
              .axisRight(yForLine)
              .tickSize(chartSize.width)
              .tickValues([1, 2, 3, 4])
              .tickFormat(() => '')
          )
          .call((g) => g.select('.domain').remove())
          .classed(tickClassName, true);

        const yAxis_1 = d3.axisLeft(yAxis_1Rate).ticks(10);
        const yAxis_2 = d3.axisRight(yAxis_2Rate).ticks(8);

        chart.append('g').call(yAxis_1);
        chart
          .append('g')
          .attr('transform', `translate(${chartSize.width}, 0)`)
          .call(yAxis_2);

        chart
          .selectAll('.bar')
          .data(chartData)
          .enter()
          .append('rect')
          .attr('x', (d) => x(d.xAxis) ?? 0)
          .attr('y', (d) => yAxis_1Rate(d.yAxis_1))
          .attr('width', x.bandwidth())
          .attr('height', (d) => chartSize.height - yAxis_1Rate(d.yAxis_1))
          .attr('fill', '#5a6acf')
          .attr('rx', 2)
          .on('mouseover', function (event, d) {
            const wrapperRect = wrapperRef.current?.getBoundingClientRect();
            if (wrapperRect) {
              const x = event.clientX - wrapperRect.left;
              const y = event.clientY - wrapperRect.top - 50;
              setTooltip({
                x,
                y,
                value: `${d.xAxis} 的月營收： ${d.yAxis_1.toLocaleString()}`
              });
            }
          })
          .on('mouseout', function () {
            setTooltip(null);
          });

        chart
          .append('path')
          .datum(chartData)
          .attr(
            'd',
            d3
              .line<ChartData>()
              .x(function (d) {
                return (x(d.xAxis) ?? 0) + x.bandwidth() / 2;
              })
              .y(function (d) {
                return yAxis_2Rate(d.yAxis_2);
              })
              .curve(d3.curveMonotoneX)
          )
          .classed(lineClassName, true);

        // function handleDateBarClick(event: any, d: PerformanceData) {
        //   try {
        //     event.stopPropagation();
        //     setSelectDateData(d);
        //   } catch (error) {}
        // }
      } catch (error) {
        _EHS.errorReport(error, 'drawChart', _EHS._LEVEL.ERROR);
      }
    }
    return () => {
      if (targetDom) {
        targetDom.innerHTML = '';
      }
    };
  }, [chartData]);

  return (
    <div className='wrapper'>
      <div className='chart-wrapper' ref={wrapperRef}>
        <div className='chart' ref={d3Ref} style={{ height: svgHeight }} />
        {tooltip && (
          <div
            className='tooltip'
            style={{
              position: 'absolute',
              left: tooltip.x,
              top: tooltip.y,
              backgroundColor: 'white',
              border: '1px solid black',
              padding: '5px'
            }}
          >
            {tooltip.value}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chart;
