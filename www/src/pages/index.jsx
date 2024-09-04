import Head from 'next/head'

import { GetStarted } from '@/components/GetStarted'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'
import { Supporters } from '@/components/Supporters'

export default function Home() {
  return (
    <>
      <Head>
        <title>Stencila : Dynamic documents made simple</title>
        <meta
          name="description"
          content="Creating, collaborating on, and publishing dynamic documents can be difficult. Stencila makes it easier for you, your colleagues, and your clients!"
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <GetStarted />
        {/* 
        <PrimaryFeatures />
        <SecondaryFeatures />
        <Testimonials />
        <Pricing />
        */}
        <Supporters />
        {/*
        <Faqs />
        */}
      </main>
      <Footer />
    </>
  )
}
