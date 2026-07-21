import Container from '@/components/container'
import AltLayout from '@/components/alt-layout'
import GameOfLife from '@/components/GameOfLife'
import Link from 'next/link'
import Head from 'next/head'

export default function JuegoDeLaVida() {
  return (
    <AltLayout>
      <Head>
        <title>Juego de la vida — Juampablo Rodríguez Rojas</title>
      </Head>
      <Container>
        <div className="py-10">
          <Link
            href="/"
            className="inline-block mb-8 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            {'< Volver'}
          </Link>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8">
            El juego de la vida
          </h1>

          <GameOfLife />
        </div>
      </Container>
    </AltLayout>
  )
}
