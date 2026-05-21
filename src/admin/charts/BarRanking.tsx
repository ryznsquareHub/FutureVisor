import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useContainerWidth } from './useD3'

type Props = {
  data: { key: string; value: number; sub?: string }[]
  maxRows?: number
  color?: string
  valueFmt?: (n: number) => string
}

export function BarRanking({
  data,
  maxRows = 10,
  color = '#0040ff',
  valueFmt = (n) => n.toLocaleString(),
}: Props) {
  const [wrapRef, width] = useContainerWidth<HTMLDivElement>(420)
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!svgRef.current) return
    const rows = data.slice(0, maxRows)
    const rowH = 26
    const height = Math.max(60, rows.length * rowH + 12)
    const margin = { top: 4, right: 60, bottom: 4, left: 12 }

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(rows, (d) => d.value) || 1])
      .range([0, Math.max(40, width - margin.left - margin.right)])

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
    svg.attr('width', width).attr('height', height)

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    const rowG = g
      .selectAll('g.row')
      .data(rows)
      .join('g')
      .attr('class', 'row')
      .attr('transform', (_, i) => `translate(0,${i * rowH})`)

    rowG
      .append('rect')
      .attr('y', 4)
      .attr('width', (d) => x(d.value))
      .attr('height', rowH - 8)
      .attr('rx', 4)
      .attr('fill', color)
      .attr('fill-opacity', 0.18)

    rowG
      .append('rect')
      .attr('y', 4)
      .attr('width', (d) => Math.min(4, x(d.value)))
      .attr('height', rowH - 8)
      .attr('rx', 4)
      .attr('fill', color)

    rowG
      .append('text')
      .attr('x', 10)
      .attr('y', rowH / 2 + 4)
      .attr('font-size', 12)
      .attr('fill', '#0f172a')
      .text((d) => (d.key.length > 56 ? d.key.slice(0, 54) + '…' : d.key))
      .append('title')
      .text((d) => d.key + (d.sub ? '  ' + d.sub : ''))

    rowG
      .append('text')
      .attr('x', width - margin.right + 6)
      .attr('y', rowH / 2 + 4)
      .attr('font-size', 12)
      .attr('font-weight', 600)
      .attr('fill', '#0f172a')
      .text((d) => valueFmt(d.value))
  }, [data, width, color, maxRows, valueFmt])

  if (data.length === 0) {
    return (
      <div ref={wrapRef} className="flex h-24 items-center justify-center text-xs text-slate-400">
        데이터가 아직 없습니다
      </div>
    )
  }
  return (
    <div ref={wrapRef} className="w-full">
      <svg ref={svgRef} />
    </div>
  )
}
