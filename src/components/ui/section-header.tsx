import { clsx } from 'clsx'
import React from 'react'

interface SectionHeaderProps {
  number: string
  title: string
  className?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ number, title, className }) => (
  <h2 className={clsx('text-base font-mono text-foreground flex items-center gap-2', className)}>
    <span className="text-xs opacity-60">[{number}]</span>
    <span className="opacity-40">—</span>
    <span>{title}</span>
  </h2>
)

export default SectionHeader
