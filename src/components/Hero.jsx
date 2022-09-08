import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

export function Hero() {
  return (
    <Container className="pt-10 pb-20 text-center lg:pt-32">
      <h1 className="mx-auto max-w-4xl font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        Dynamic documents{' '}
        <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
          made easier
        </span>{' '}
        for you and {' '}
        <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
        your clients
        </span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        Stop wasting time on software deployment and maintenance and asking your clients to use new tools.
        Stencila makes it easier for you, your colleagues, and your clients to create
        beautiful, interactive web pages and applications for data.
      </p>
      <div className="mt-10 flex justify-center gap-x-6">
        <Button href="#download" color="blue">
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
      </div>
    </Container>
  )
}
