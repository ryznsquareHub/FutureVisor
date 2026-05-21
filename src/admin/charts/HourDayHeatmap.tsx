import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useContainerWidth } from './useD3'
import type { PageView } from '../types'

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

type Props = { rows: PageView[] }

export function HourDayHeatmap({ rows }: Props) {
  const [wrapRef, width] = useContainerWidth<HTMLDivElement>(700)
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!svgRef.current) return
    const margin = { top: 16, right: 12, bottom: 22, left: 28 }
    const cellW = Math.max(14, (width - margin.left - margin.right) / 24)
    const cellH = 22
    const height = margin.top + margin.bottom + cellH * 7

    type Cell = { day: number; hour: number; count: number }
    const buckets = new Map<string, number>()
    for (const r of rows) {
      const d = new Date(r.entered_at)
      const k = `${d.getDay()}_${d.getHours()}`
      buckets.set(k, (buckets.get(k) || 0) + 1)
    }
    const data: Cell[] = []
    for (let day = 0; day < 7; day++) {
      for (let hour = 0; hour < 24; hour++) {
        data.push({ day, hour, count: buckets.get(`${day}_${hour}`) || 0 })
      }
    }
    const maxV = d3.max(data, (d) => d.count) || 1
    const color = d3
      .scaleLinear<string>()
      .domain([0, maxV])
      .range(['#f1f5f9', '#0040ff'])

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
    svg.attr('width', width).attr('height', height)

    svg
      .selectAll('rect.cell')
      .data(data)
      .join('rect')
      .attr('class', 'cell')
      .attr('x', (d) => margin.left + d.hour * cellW)
      .attr('y', (d) => margin.top + d.day * cellH)
      .attr('width', cellW - 1)
      .attr('height', cellH - 1)
      .attr('rx', 2)
      .attr('fill', (d) => color(d.count))
      .append('title')
      .text((d) => `${DAY_LABELS[d.day]} ${d.hour}시 — ${d.count}회`)

    svg
      .append('g')
      .attr('transform', `translate(0,${margin.top + 14})`)
      .selectAll('text')
      .data(DAY_LABELS)
      .join('text')
      .attr('x', margin.left - 6)
      .attr('y', (_, i) => i * cellH)
      .attr('text-anchor', 'end')
      .attr('font-size', 11)
      .attr('fill', '#64748b')
      .text((d) => d)

    svg
      .append('g')
      .attr('transform', `translate(0,${height - 8})`)
      .selectAll('text')
      .data(d3.range(0, 24, 3))
      .join('text')
      .attr('x', (h) => margin.left + h * cellW + cellW / 2)
      .attr('text-anchor', 'middle')
      .attr('font-size', 10)
      .attr('fill', '#64748b')
      .text((h) => `${h}시`)
  }, [rows, width])

  return (
    <div ref={wrapRef} className="w-full">
      <svg ref={svgRef} role="img" aria-label="요일×시간대 방문 히트맵" />
    </div>
  )
}
