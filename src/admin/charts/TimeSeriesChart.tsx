import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useContainerWidth } from './useD3'
import type { PageView } from '../types'

type Props = {
  rows: PageView[]
  rangeDays: number
}

export function TimeSeriesChart({ rows, rangeDays }: Props) {
  const [wrapRef, width] = useContainerWidth<HTMLDivElement>(700)
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!svgRef.current) return
    const height = 220
    const margin = { top: 20, right: 16, bottom: 28, left: 40 }

    const end = d3.timeDay.ceil(new Date())
    const start = d3.timeDay.offset(end, -rangeDays)
    const days = d3.timeDay.range(start, end)

    const byDay = d3.rollup(
      rows.filter((r) => new Date(r.entered_at) >= start),
      (v) => ({
        views: v.length,
        visitors: new Set(v.map((r) => r.visitor_id)).size,
      }),
      (r) => d3.timeDay.floor(new Date(r.entered_at)).toISOString(),
    )

    const data = days.map((d) => {
      const k = d.toISOString()
      const v = byDay.get(k) || { views: 0, visitors: 0 }
      return { date: d, views: v.views, visitors: v.visitors }
    })

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
    svg.attr('width', width).attr('height', height)

    const x = d3
      .scaleTime()
      .domain([start, end])
      .range([margin.left, width - margin.right])

    const yMax = d3.max(data, (d) => d.views) || 4
    const y = d3
      .scaleLinear()
      .domain([0, yMax * 1.15])
      .nice()
      .range([height - margin.bottom, margin.top])

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(Math.min(rangeDays, 8))
          .tickFormat((d) => d3.timeFormat('%m/%d')(d as Date)),
      )
      .call((g) => g.select('.domain').attr('stroke', '#cbd5e1'))
      .call((g) => g.selectAll('text').attr('fill', '#64748b').attr('font-size', 11))

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

    const area = d3
      .area<{ date: Date; views: number }>()
      .x((d) => x(d.date))
      .y0(y(0))
      .y1((d) => y(d.views))
      .curve(d3.curveMonotoneX)

    const line = d3
      .line<{ date: Date; views: number }>()
      .x((d) => x(d.date))
      .y((d) => y(d.views))
      .curve(d3.curveMonotoneX)

    svg
      .append('path')
      .datum(data)
      .attr('fill', '#0040ff')
      .attr('fill-opacity', 0.08)
      .attr('d', area)

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#0040ff')
      .attr('stroke-width', 2)
      .attr('d', line)

    const visitorsLine = d3
      .line<{ date: Date; visitors: number }>()
      .x((d) => x(d.date))
      .y((d) => y(d.visitors))
      .curve(d3.curveMonotoneX)

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#22c55e')
      .attr('stroke-width', 1.6)
      .attr('stroke-dasharray', '4 3')
      .attr('d', visitorsLine)

    const dotG = svg.append('g')
    dotG
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => x(d.date))
      .attr('cy', (d) => y(d.views))
      .attr('r', 2.5)
      .attr('fill', '#0040ff')

    const tooltip = svg.append('g').style('display', 'none')
    const tipBg = tooltip
      .append('rect')
      .attr('rx', 4)
      .attr('fill', '#0f172a')
      .attr('opacity', 0.95)
    const tipText = tooltip
      .append('text')
      .attr('fill', '#fff')
      .attr('font-size', 11)
      .attr('x', 8)
      .attr('y', 14)

    svg
      .append('rect')
      .attr('x', margin.left)
      .attr('y', margin.top)
      .attr('width', Math.max(0, width - margin.left - margin.right))
      .attr('height', Math.max(0, height - margin.top - margin.bottom))
      .attr('fill', 'transparent')
      .on('mousemove', (event) => {
        const [mx] = d3.pointer(event)
        const date = x.invert(mx)
        const bisect = d3.bisector<{ date: Date }, Date>((d) => d.date).left
        const i = Math.max(0, Math.min(data.length - 1, bisect(data, date)))
        const d = data[i]
        if (!d) return
        tooltip.style('display', null)
        tipText
          .text(`${d3.timeFormat('%m/%d')(d.date)}  뷰 ${d.views}  방문자 ${d.visitors}`)
        const bb = (tipText.node() as SVGTextElement).getBBox()
        tipBg
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', bb.width + 16)
          .attr('height', bb.height + 8)
        const tx = Math.min(width - bb.width - 18, x(d.date) + 8)
        const ty = Math.max(0, y(d.views) - bb.height - 14)
        tooltip.attr('transform', `translate(${tx},${ty})`)
      })
      .on('mouseleave', () => tooltip.style('display', 'none'))
  }, [rows, rangeDays, width])

  return (
    <div ref={wrapRef} className="w-full">
      <svg ref={svgRef} role="img" aria-label="일별 방문 추세" />
      <div className="mt-1 flex gap-4 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-1.5 w-3 rounded-full bg-[#0040ff]" /> 페이지뷰
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-1.5 w-3 rounded-full bg-[#22c55e]" /> 순방문자
        </span>
      </div>
    </div>
  )
}
