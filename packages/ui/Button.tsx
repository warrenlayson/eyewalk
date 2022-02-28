import cls from 'classnames'
import * as React from 'react'
type ButtonProps = React.HtmlHTMLAttributes<HTMLButtonElement> &
  React.PropsWithChildren<{
    color: 'yellow' | 'white'
  }>
export const Button = ({
  children,
  color,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cls([
        'btn',
        color === 'white'
          ? 'btn-white hover:bg-eyewalk-yellow'
          : color === 'yellow'
          ? 'btn-yellow hover:bg-eyewalk-white'
          : '',
        className,
      ])}
      {...props}
    >
      {children}
    </button>
  )
}
