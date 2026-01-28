import { clsx } from 'clsx'
import React from 'react'

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={clsx('te-panel', className)} {...props}>
    {children}
  </div>
))

Panel.displayName = 'Panel'
export default Panel
