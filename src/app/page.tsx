import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className="container">
      <nav className={styles.nav}>
        <Link href="/" className={styles.navTitle}>
          Handcrafted Haven
        </Link>
        <div className={styles.navLinks}>
          <Link href="/products" className={styles.navLink}>Products</Link>
          <Link href="/sellers" className={styles.navLink}>Sellers</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
        </div>
      </nav>

      <main>
        <section className={styles.heroSection}>
          <h1 className={styles.heroTitle}>
            Welcome to Handcrafted Haven
          </h1>
          <p className={styles.heroSubtitle}>
            Discover unique, handcrafted artisan goods made with love and care
          </p>
          <div className={styles.heroButtons}>
            <Link href="/products" className={`${styles.btn} ${styles.btnPrimary}`}>
              Browse Products
            </Link>
            <Link href="/sellers" className={`${styles.btn} ${styles.btnSecondary}`}>
              Meet Our Sellers
            </Link>
          </div>
        </section>

        <section className={styles.featuresSection}>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>
              Handcrafted Quality
            </h3>
            <p className={styles.featureDescription}>
              Every item is carefully crafted by skilled artisans using traditional techniques
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>
              Unique Designs
            </h3>
            <p className={styles.featureDescription}>
              Find one-of-a-kind pieces that reflect the creativity and passion of our makers
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>
              Support Local
            </h3>
            <p className={styles.featureDescription}>
              Support local artisans and small businesses in your community
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
