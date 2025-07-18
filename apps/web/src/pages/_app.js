import '../styles/globals.css'
import '../components/Navbar.css'
import '../components/Homepage.css'
import '../components/ProductCard.css'
import '../components/ProductPage.css'
import '../components/SellerProfile.css'
import '../components/AboutPage.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
