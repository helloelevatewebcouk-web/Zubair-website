import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({ to, variant = 'primary', className = '', children, ...rest }) {
  const cls = `${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${className}`

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
