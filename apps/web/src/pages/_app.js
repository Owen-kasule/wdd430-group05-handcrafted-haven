import '../styles/globals.css';
import '../components/Homepage.css';
import '../components/Navbar.css';
import '../components/ProductCard.css';
import '../components/AboutPage.css';
import '../components/ProductPage.css';
import '../components/SellerProfile.css';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Component {...pageProps} />
      </main>
    </>
  );
}
