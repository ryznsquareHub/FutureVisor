import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useContainerWidth } from './useD3'
import type { PageView } from '../types'

type Props = { rows: PageView[] }

const BUCKETS = [
  { label: '0–5초', max: 5 },
  { label: '5–15초', max: 15 },
  { label: '15–30초', max: 30 },
  { label: '30–60초', max: 60 },
  { label: '1–3분', max: 180 },
  { label: '3–10분', max: 600 },
  { label: '10분+', max: Infinity },
]

export function DurationHistogram({ rows }: Props) {
  const [wrapRef, width] = useContainerWidth<HTMLDivElement>(500)
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!svgRef.current) return
    const height = 220
    const margin = { top: 12, right: 12, bottom: 36, left: 36 }

    const data = BUCKETS.map((b) => ({ label: b.label, count: 0 }))
    for (const r of rows) {
      const ms = r.duration_ms
      if (ms == null || ms < 0) continue
      const sec = ms / 1000
      for (let i = 0; i < BUCKETS.length; i++) {
        if (sec < BUCKETS[i].max) {
          data[i].count++
          break
        }
      }
    }

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
    svg.attr('width', width).attr('height', height)

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.25)

    const yMax = d3.max(data, (d) => d.count) || 1
    const y = d3
      .scaleLinear()
      .domain([0, yMax * 1.15])
      .nice()
      .range([height - margin.bottom, margin.top])

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .call((g) => g.select('.domain').attr('stroke', '#cbd5e1'))
      .call((g) =>
        g
          .selectAll('text')
          .attr('fill', '#64748b')
          .attr('font-size', 11)
          .attr('transform', 'translate(0,4)'),
      )

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5))
      .call((g) => g.select('.domain').attr('stroke', '#cbd5e1'))
      .call((g) =>
        g
          .selectAll('.tick line')
          .clone()
          .attr('x2', width - margin.left - margin.right)
          .attr('stroke', '#f1f5f9'),
      )
      .call((g) => g.selectAll('text').attr('fill', '#64748b').attr('font-size', 11))

    svg
      .selectAll('rect.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.label) || 0)
      .attr('y', (d) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d) => y(0) - y(d.count))
      .attr('rx', 3)
      .attr('fill', '#0040ff')
      .attr('fill-opacity', 0.85)

    svg
      .selectAll('text.val')
      .data(data)
      .join('text')
      .attr('class', 'val')
      .attr('x', (d) => (x(d.label) || 0) + x.bandwidth() / 2)
      .attr('y', (d) => y(d.count) - 4)
      .attr('text-anchor', 'middle')
      .attr('font-size', 11)
      .attr('fill', '#0f172a')
      .text((d) => (d.count > 0 ? d.count : ''))
  }, [rows, width])

  return (
    <div ref={wrapRef} className="w-full">
      <svg ref={svgRef} role="img" aria-label="체류시간 분포" />
    </div>
  )
}
