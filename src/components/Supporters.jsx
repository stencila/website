import Image from 'next/future/image'

import logoCoko from '@/images/logos/coko.png'
import logoCss from '@/images/logos/css.png'
import logoElife from '@/images/logos/elife.svg'
import logoSloan from '@/images/logos/sloan.png'
import { Container } from './Container'

export function Supporters() {
  return (
    <Container className="pt-16 pb-16 text-center">
      <p className="font-display text-base text-slate-900">
        We wouldn’t be doing this without the support of these generous
        organizations
      </p>
      <ul
        role="list"
        className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0"
      >
        {[
          [
            {
              name: 'Coko Foundation',
              url: 'https://coko.foundation/',
              logo: logoCoko,
            },
            {
              name: 'Sloan Foundation',
              url: 'https://sloan.org/',
              logo: logoSloan,
            },
          ],
          [
            {
              name: 'Code for Science and Society',
              url: 'https://codeforscience.org/',
              logo: logoCss,
            },
            {
              name: 'eLife',
              url: 'https://elifesciences.org/',
              logo: logoElife,
            },
          ],
        ].map((group, groupIndex) => (
          <li key={groupIndex}>
            <ul
              role="list"
              className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0"
            >
              {group.map((org) => (
                <li key={org.name} className="flex">
                  <a href={org.url} target="_blank">
                    <Image
                      className="h-12 w-auto md:h-16"
                      src={org.logo}
                      alt={org.name}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Container>
  )
}
