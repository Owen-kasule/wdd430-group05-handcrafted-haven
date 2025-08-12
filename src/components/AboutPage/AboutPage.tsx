import React from 'react';
import './AboutPage.css';

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-content">
          <h1>About Handcrafted Haven</h1>
          <p className="about-subtitle">
            Connecting artisans with conscious consumers who value authentic
            craftsmanship
          </p>
        </div>
      </div>

      <section className="about-mission">
        <div className="container">
          <h2>Our Mission</h2>
          <p>
            Handcrafted Haven exists to celebrate and support the art of
            handmade craftsmanship. We believe that every handcrafted item tells
            a story—of tradition, skill, passion, and the human touch that makes
            each piece unique. Our platform connects talented artisans with
            customers who appreciate the beauty, quality, and authenticity of
            handmade products.
          </p>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎨</div>
              <h3>Authentic Craftsmanship</h3>
              <p>
                We celebrate genuine handcrafted items made with traditional
                techniques and modern innovation.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>
                Supporting handmade goods promotes sustainable consumption and
                reduces environmental impact.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>
                Building connections between artisans and customers creates a
                thriving creative community.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">💎</div>
              <h3>Quality</h3>
              <p>
                Every item on our platform meets high standards of craftsmanship
                and attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Handcrafted Haven was born from a simple observation: in our
                increasingly digital world, people crave authentic, tangible
                connections to creativity and craftsmanship. We noticed that
                talented artisans often struggled to reach customers who would
                truly appreciate their work.
              </p>
              <p>
                Founded by a team of passionate developers and craft
                enthusiasts, we set out to create more than just another
                marketplace. We wanted to build a community where stories are
                shared, techniques are celebrated, and every purchase supports
                the continuation of traditional and contemporary craft
                traditions.
              </p>
              <p>
                Today, Handcrafted Haven serves as a bridge between the ancient
                art of making by hand and the modern convenience of online
                shopping, ensuring that handcrafted goods continue to have a
                place in our homes and hearts.
              </p>
            </div>
            <div className="story-image">
              <img
                src="https://res.cloudinary.com/dhcfxb9dn/image/upload/v1755003336/sandor-szabo-vGg-oZfdXcc-unsplash_i5e1ns.jpg"
                alt="Artisan at work"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="about-team">
        <div className="container">
          <h2>Development Team</h2>
          <p className="team-intro">
            This project is being developed as part of WDD 430: Web Full-Stack
            Development at BYU-Idaho.
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💻</div>
              <h3>Frontend Development</h3>
              <p>React.js, UI/UX Design, Responsive Implementation</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">⚙️</div>
              <h3>Backend Development</h3>
              <p>Node.js, Database Design, API Development</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">🎨</div>
              <h3>Design & Testing</h3>
              <p>User Experience, Quality Assurance, Performance</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Community</h2>
            <p>
              Whether you&apos;re an artisan looking to share your craft or a
              customer seeking unique pieces, we&apos;d love to have you join
              the Handcrafted Haven community.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Become a Seller</button>
              <button className="btn btn-secondary">Start Shopping</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
