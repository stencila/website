import Image from 'next/future/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import googleDocsAddOnScreenshot from '@/images/screenshots/google-docs-addon.png'

export function Hero() {
  return (
    <Container className="pt-10 pb-20 text-center lg:pt-32">
      <h1 className="mx-auto max-w-4xl font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        Data-driven, interactive documents{' '}
        <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
          made easier
        </span>{' '}
        for you and your{' '}
        <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
          collaborators
        </span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        We make it easier to collaborate on data-driven, programmable documents and to publish beautiful, interactive articles, web pages
        and applications from them.
      </p>
      <div className="mt-10 flex justify-center gap-x-6">
        
        {/*
        <Button href="#get-started" color="blue">
          Download Stencila
        </Button>
        <Button
          href="https://www.youtube.com/channel/UCIpc9W6FFBjb4XB1KXevqvA"
          variant="outline"
        >
          <svg
            aria-hidden="true"
            className="h-3 w-3 flex-none fill-blue-600 group-active:fill-current"
          >
            <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
          </svg>
          <span className="ml-3">Watch demo</span>
        </Button>
        */}
      </div>
      <div className="pt-10">
        <Image
          className="mt-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
          src={googleDocsAddOnScreenshot}
          alt="Stencila Google Docs addon"
        />
        <div className="mt-5 text-center">
          <span className="ml-2 text-xs font-light">
            Stencila addon for Google Docs
          </span>
        </div>
      </div>
    </Container>
  )
}
