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
            { name: 'Coko Foundation', logo: logoCoko },
            { name: 'Sloan Foundation', logo: logoSloan },
          ],
          [
            { name: 'Code for Science and Society', logo: logoCss },
            { name: 'eLife', logo: logoElife },
          ],
        ].map((group, groupIndex) => (
          <li key={groupIndex}>
            <ul
              role="list"
              className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0"
            >
              {group.map((company) => (
                <li key={company.name} className="flex">
                  <Image
                    className="h-12 w-auto md:h-16"
                    src={company.logo}
                    alt={company.name}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Container>
  )
}
