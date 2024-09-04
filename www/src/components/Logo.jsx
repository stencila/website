import { twMerge } from 'tailwind-merge'

import { LogoIcon } from './LogoIcon'
import { LogoType } from './LogoType'

/**
 * Stencila Logo
 */
export function Logo(props) {
  return (
    <div
      className={twMerge('flex items-center justify-center', props.className)}
    >
      <span className="sr-only">Stencila</span>
      <LogoIcon className="h-full" />
      <LogoType className="ml-2 h-4/6" />
    </div>
  )
}
