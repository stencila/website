import Image from 'next/future/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-call-to-action.jpg'

export function GetStarted() {
  return (
    <section
      id="get-started"
      className="relative overflow-hidden bg-blue-600 py-32"
    >
      <Image
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Get started
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            We are busy finishing version 2 of Stencila! It's not quite ready (or fully documented) but if you
            are an early adopter and want to give it a try, we'd love to get your feedback 💖.
          </p>
          <Button href="https://github.com/stencila/stencila/releases/latest" color="white" className="mt-10">
            Download latest release
          </Button>
        </div>
      </Container>
    </section>
  )
}
