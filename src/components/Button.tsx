import type { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode
}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        'flex justify-between items-center px-3 py-1 bg-blue-500 text-white border border-blue font-semibold rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-700 hover:text-blue-100',
        className
      )}
      {...props}
    />
  )
}
