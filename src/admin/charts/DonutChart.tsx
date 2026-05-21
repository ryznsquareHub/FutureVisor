import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useContainerWidth } from './useD3'

type Slice = { key: string; value: number }
type Props = { data: Slice[]; centerLabel?: string }

const PALETTE = [
  '#0040ff',
  '#22c55e',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
  '#ec4899',
  '#64748b',
]

export function DonutChart({ data, centerLabel }: Props) {
  const [wrapRef, width] = useContainerWidth<HTMLDivElement>(320)
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!svgRef.current) return
    const size = Math.min(width, 280)
    const height = size
    const radius = size / 2

    const total = d3.sum(data, (d) => d.value)
    const slices = data.filter((d) => d.value > 0)

    const pie = d3
      .pie<Slice>()
      .value((d) => d.value)
      .sort(null)
    const arc = d3
      .arc<d3.PieArcDatum<Slice>>()
      .innerRadius(radius * 0.62)
      .outerRadius(radius)
      .cornerRadius(3)
      .padAngle(0.015)

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
    svg.attr('width', size).attr('height', height)

    const g = svg.append('g').attr('transform', `translate(${size / 2},${height / 2})`)

    g.selectAll('path')
      .data(pie(slices))
      .join('path')
      .attr('d', arc)
      .attr('fill', (_, i) => PALETTE[i % PALETTE.length])
      .append('title')
      .text(
        (d) =>
          `${d.data.key} — ${d.data.value} (${total ? ((d.data.value / total) * 100).toFixed(1) : 0}%)`,
      )

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', -4)
      .attr('font-size', 11)
      .attr('fill', '#64748b')
      .text(centerLabel || '합계')

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', 16)
      .attr('font-size', 22)
      .attr('font-weight', 700)
      .attr('fill', '#0f172a')
      .text(total.toLocaleString())
  }, [data, width, centerLabel])

  return (
    <div ref={wrapRef} className="flex w-full flex-col items-center">
      <svg ref={svgRef} />
      <ul className="mt-2 grid w-full grid-cols-2 gap-x-3 gap-y-1 text-xs">
        {data
          .filter((d) => d.value > 0)
          .map((d, i) => (
            <li key={d.key} className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 truncate">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: PALETTE[i % PALETTE.length] }}
                />
                <span className="truncate text-slate-700">{d.key || '(없음)'}</span>
              </span>
              <span className="font-medium tabular-nums text-slate-900">{d.value}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}
