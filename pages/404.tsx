import Link from 'next/link'
import Layout from '@/components/layout'
import Container from '@/components/container'

const Custom404 = () => {
  return (
    <Layout>
      <Container>
        <div className="flex flex-col items-center justify-center text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Parece que no hay nada aquí</h1>
          <p className="text-gray-600 mb-6">La página que buscas no existe o ha sido movida.</p>
          <Link href="/" className="inline-block bg-gray-900 text-white px-5 py-2 rounded hover:opacity-90">
            Volver al inicio
          </Link>
        </div>
      </Container>
    </Layout>
  )
}

export default Custom404
