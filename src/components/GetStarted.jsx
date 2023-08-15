import Image from 'next/future/image'

import { Container } from '@/components/Container'

export function GetStarted() {
  return (
    <section
      id="get-started"
      className="relative overflow-hidden bg-blue-600 py-32"
    >
      <Image
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Get involved
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            We are busy working on Stencila v2 using Rust and and built on top
            of CRDTs. We'd love your feedback, ideas, and contributions over on
            Github!
          </p>
          <p className="text-bold mt-4 text-2xl text-white">
            <a
              href="https://github.com/stencila/stencila"
              target="_blank"
              aria-label="Stencila on GitHub"
            >
              <code>stencila/stencila</code>
            </a>
          </p>
        </div>
      </Container>
    </section>
  )
}
