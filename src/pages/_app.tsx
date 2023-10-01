import { globalStyles } from '@/styles/global';
import { Container, Header } from '@/styles/pages/app';
import type { AppProps } from 'next/app'
import Image from 'next/image';
import logoImg from '../assets/logo.svg'

globalStyles();

function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg.src} alt="header logo" width={130} height={52} />
      </Header>

      <Component {...pageProps} />

    </Container>
  )
}

export default App;