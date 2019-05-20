import cn from 'classnames'
import React from 'react'
import CSS from './H3Section.module.css'

const H3Body = ({ children, className, ...props }) => {
  return (
    <div {...props} className={cn(CSS.body, className)}>
      {children}
    </div>
  )
}

export default H3Body
