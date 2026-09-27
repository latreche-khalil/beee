import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Star,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { translations, type Lang, type TranslationData, type ServiceItem } from './translations';

const queryClient = new QueryClient();
const bookingUrl = 'https://pro.vello.fi/ben';
const whatsappUrl = 'https://wa.me/358451457445';

// Language Context & State
const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TranslationData;
}>({
  lang: 'fi',
  setLang: () => {},
  t: translations.fi,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('ben_lang');
      if (saved === 'fi' || saved === 'en') return saved;
    } catch {}
    return 'fi';
  });

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem('ben_lang', newLang);
    } catch {}
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Language Switcher Component
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <div
      className={`lang-switcher ${className}`}
      role="group"
      aria-label="Kielivalinta / Language selection"
    >
      <Globe size={13} className="lang-icon" aria-hidden="true" />
      <button
        type="button"
        className={`lang-btn ${lang === 'fi' ? 'is-active' : ''}`}
        onClick={() => setLang('fi')}
        aria-label="Suomeksi"
        aria-pressed={lang === 'fi'}
        data-testid="lang-switch-fi"
      >
        FI
      </button>
      <span className="lang-sep">/</span>
      <button
        type="button"
        className={`lang-btn ${lang === 'en' ? 'is-active' : ''}`}
        onClick={() => setLang('en')}
        aria-label="In English"
        aria-pressed={lang === 'en'}
        data-testid="lang-switch-en"
      >
        EN
      </button>
    </div>
  );
}

// Lightweight scroll animation — no external library
function useScrollAnimation() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-animate], .section-kicker');
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function getStructuredData(t: TranslationData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Ben — Koulutettu Hieroja',
    description: t.hero.lead,
    telephone: '+358451457445',
    email: 'algaymanhandball@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rekikuja 6 AS 3',
      postalCode: '28400',
      addressLocality: 'Ulvila',
      addressCountry: 'FI',
    },
    openingHours: 'Mo-Su 08:00-21:00',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', ratingCount: '3' },
    sameAs: ['https://www.instagram.com/hieroja_ben', whatsappUrl],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t.services.eyebrow,
      itemListElement: t.services.list.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title },
        priceCurrency: 'EUR',
        price: service.prices[0][1].replace(/[^0-9]/g, ''),
      })),
    },
  };
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    [t.nav.about, '#about'],
    [t.nav.services, '#services'],
    [t.nav.pricing, '#services'],
    [t.nav.reviews, '#reviews'],
    [t.nav.faq, '#faq'],
    [t.nav.contact, '#contact'],
  ];

  return (
    <header className="site-header">
      <div className="section-wrap nav-shell">
        <a className="brand" href="#top" data-testid="link-brand">
          <img src="/logo.jpg" alt="Ben Hieronta logo" style={{width:'44px', height:'44px', borderRadius:'50%', objectFit:'cover'}} />
          <span className="brand-copy">
            <span className="brand-name">Ben</span>
            <span className="brand-role">{t.brandRole}</span>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Päänavigaatio">
          {navItems.map(([label, href]) => (
            <a key={`${label}-${href}`} href={href} data-testid={`link-nav-${href.replace('#', '')}`}>
              {label}
            </a>
          ))}
          <LanguageSwitcher />
          <a className="nav-cta" href={bookingUrl} target="_blank" rel="noreferrer" data-testid="link-nav-booking">
            {t.nav.book} <ArrowUpRight size={15} />
          </a>
        </nav>

        <div className="mobile-actions">
          <LanguageSwitcher />
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Sulje valikko' : 'Avaa valikko'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            data-testid="button-menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobiilinavigaatio">
          {navItems.map(([label, href]) => (
            <a
              key={`${label}-${href}`}
              href={href}
              onClick={() => setMenuOpen(false)}
              data-testid={`link-mobile-${href.replace('#', '')}`}
            >
              {label}
            </a>
          ))}
          <a
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
            data-testid="link-mobile-booking"
          >
            {t.nav.book} <ArrowUpRight size={15} />
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero grain" id="top">
      <Header />
      <div className="section-wrap hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p className="hero-lead">{t.hero.lead}</p>
          <div className="hero-actions">
            <a className="button-primary" href={bookingUrl} target="_blank" rel="noreferrer" data-testid="link-hero-booking">
              {t.hero.ctaBook} <ArrowUpRight size={17} />
            </a>
            <a className="button-secondary" href="#services" data-testid="link-hero-services">
              {t.hero.ctaServices} <ArrowDown size={16} />
            </a>
          </div>
          <p className="hero-note">
            <Clock3 size={15} /> {t.hero.note}
          </p>
        </div>
        <div className="hero-visual" aria-label="Benin vastaanotto Ulvilassa">
          <div className="hero-photo">
            <img src="/ben-working.jpg" alt="Ben hieromassa asiakasta Ulvilassa" style={{objectFit:'cover', objectPosition:'center top'}} />
          </div>
          <div className="hero-stamp">
            {t.hero.stampCity}
            <br />
            {t.hero.stampRegion}
          </div>
          <span className="hero-index">{t.hero.index}</span>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const { t } = useLanguage();
  return (
    <section className="trust-strip" aria-label="Benin pätevyydet">
      <div className="section-wrap trust-grid">
        {t.trust.items.map(([title, sub], index) => (
          <div className="trust-item" key={title} data-animate data-delay={String(index + 1)}>
            <span className="trust-icon">
              {index === 3 ? <Star size={18} fill="currentColor" /> : <Check size={18} />}
            </span>
            <div>
              <strong>{title}</strong>
              <span>{sub}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Intro() {
  const { t } = useLanguage();
  const titleLines = t.intro.title.split('\n');

  return (
    <section className="intro-section grain" id="approach">
      <div className="section-wrap intro-grid">
        <div className="section-kicker" style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>
          <div>
            <div className="line" />
            <p>{t.intro.kicker}</p>
          </div>
          <video
            src="/benworking-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%',
              borderRadius: '16px',
              objectFit: 'cover',
              maxHeight: '340px',
              display: 'block',
              boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
            }}
          />
        </div>
        <div className="intro-copy" data-animate data-delay="1">
          <p className="eyebrow">{t.intro.eyebrow}</p>
          <h2>
            {titleLines[0]}
            <br />
            <em>{titleLines[1] || ''}</em>
          </h2>
          <p>{t.intro.p1}</p>
          <div className="intro-detail">
            <span className="detail-rule" /> {t.intro.detail}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { t } = useLanguage();
  const headingLines = t.services.title.split('\n');

  return (
    <section className="services-section grain" id="services">
      <div className="section-wrap">
        <div className="section-heading" data-animate>
          <div>
            <p className="eyebrow">{t.services.eyebrow}</p>
            <h2>
              {headingLines[0]}
              <br />
              {headingLines[1] || ''}
            </h2>
          </div>
          <p>{t.services.subtitle}</p>
        </div>
        <div className="service-card-grid">
          {t.services.list.map((service, i) => (
            <a
              className="service-card"
              href={`/palvelut/${service.slug}`}
              key={service.slug}
              data-testid={`card-service-${service.number}`}
              data-animate
              data-delay={String(i + 1)}
            >
              <article>
                <div className="service-card-image">
                  <img src={service.image} alt="" loading="lazy" />
                  <span className="service-card-number">{service.number}</span>
                </div>
                <div className="service-card-body">
                  <h3>{service.title}</h3>
                  <p className="service-card-summary">{service.summary}</p>
                  <div className="service-card-meta">
                    <div>
                      <strong>
                        {service.prices[0][0]} — {service.prices[0][1]}
                      </strong>
                      <span>{service.priceRange}</span>
                    </div>
                    <span className="service-card-link">
                      {t.services.cardLink} <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceDetail({ service }: { service: ServiceItem }) {
  const { t } = useLanguage();
  const pricingLines = t.serviceDetail.pricingTitle.split('\n');

  return (
    <main className="service-detail-page">
      <div className="section-wrap">
        <a className="service-back" href="/#services">
          <ArrowLeft size={16} /> {t.serviceDetail.back}
        </a>
        <div className="service-detail-grid">
          <div className="service-detail-image">
            <img src={service.image} alt={service.title} />
          </div>
          <div className="service-detail-copy">
            <p className="eyebrow">
              {t.serviceDetail.eyebrow} {service.number}
            </p>
            <h1>{service.title}</h1>
            <p className="service-detail-description">{service.description}</p>
            <div className="service-detail-suitable">
              <span>{t.serviceDetail.suitableTitle}</span>
              <p>{service.suitableFor}</p>
            </div>
            <div className="service-detail-actions">
              <a
                className="button-primary"
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                data-testid={`detail-booking-${service.slug}`}
              >
                {t.serviceDetail.ctaBook} <ArrowUpRight size={17} />
              </a>
              <a
                className="button-secondary"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                data-testid={`detail-whatsapp-${service.slug}`}
              >
                <MessageCircle size={16} /> {t.serviceDetail.ctaWhatsapp}
              </a>
            </div>
          </div>
        </div>
        <div className="service-detail-pricing">
          <div>
            <p className="eyebrow">{t.serviceDetail.pricingEyebrow}</p>
            <h2>
              {pricingLines[0]}
              <br />
              {pricingLines[1] || ''}
            </h2>
          </div>
          <div className="price-table">
            {service.prices.map(([duration, price]) => (
              <div className="price-row" key={duration}>
                <span>{duration}</span>
                <strong>{price}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mobile-booking">
        <span>{t.sticky.ready}</span>
        <a href={bookingUrl} target="_blank" rel="noreferrer" data-testid={`detail-sticky-booking-${service.slug}`}>
          {t.sticky.book} <ArrowUpRight size={14} />
        </a>
      </div>
    </main>
  );
}

function UrheiluhierontaPage() {
  const { t } = useLanguage();
  return <ServiceDetail service={t.services.list[0]} />;
}

function KlassinenHierontaPage() {
  const { t } = useLanguage();
  return <ServiceDetail service={t.services.list[1]} />;
}

function PurentalihashierontaPage() {
  const { t } = useLanguage();
  return <ServiceDetail service={t.services.list[2]} />;
}

function About() {
  const { t, lang } = useLanguage();
  return (
    <section className="about-section" id="about">
      <div className="section-wrap about-grid">
        <div className="about-visual" data-animate="left">
          <div className="about-photo">
            <img
              src="/aymen.pro.jpeg"
              alt="Ben - Koulutettu hieroja"
              loading="lazy"
            />
          </div>
          <div className="about-stamp">
            {lang === 'fi' ? (
              <>
                TYA
                <br />
                Koulutettu
              </>
            ) : (
              <>
                TYA
                <br />
                Certified
              </>
            )}
          </div>
          <span className="about-index">{lang === 'fi' ? '02 / BEN' : '02 / BEN'}</span>
        </div>
        <div className="about-copy" data-animate="right">
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2>{t.about.title}</h2>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
          <div className="credentials">
            {t.about.credentials.map((credential) => (
              <div className="credential" key={credential}>
                <Check size={15} /> <span>{credential}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoShowcase() {
  return (
    <section
      style={{
        padding: '0',
        background: '#0d1a16',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <video
        src="/benworking-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: '100%',
          maxHeight: '520px',
          objectFit: 'cover',
          display: 'block',
          opacity: 0.88,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 55%, rgba(13,26,22,0.85) 100%)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: '2.5rem',
        }}
      >
        <p style={{
          color: '#f5f0e8',
          fontFamily: 'var(--app-font-serif, serif)',
          fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
          letterSpacing: '0.03em',
          textAlign: 'center',
          margin: 0,
          textShadow: '0 2px 12px rgba(0,0,0,0.5)',
        }}>
          Ben Hieronta · Ulvila
        </p>
      </div>
    </section>
  );
}

function Reviews() {
  const { t } = useLanguage();
  const headingLines = t.reviews.title.split('\n');

  return (
    <section className="reviews-section" id="reviews">
      <div className="section-wrap">
        <div className="reviews-top">
          <div data-animate>
            <p className="eyebrow">{t.reviews.eyebrow}</p>
            <h2>
              {headingLines[0]}
              <br />
              {headingLines[1] || ''}
            </h2>
          </div>
          <div className="google-note" data-animate data-delay="2">
            <Star size={16} fill="currentColor" />
            <b>5.0</b>
            <span>{t.reviews.googleRating}</span>
          </div>
        </div>
        <div className="review-grid">
          {t.reviews.list.map(([name, quote], index) => (
            <article
              className="review-card"
              key={name}
              data-testid={`card-review-${index}`}
              data-animate
              data-delay={String(index + 1)}
            >
              <div className="review-stars">★★★★★</div>
              <blockquote>„{quote}"</blockquote>
              <cite>{name} — Google</cite>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const { t } = useLanguage();
  const headingLines = t.faq.title.split('\n');

  return (
    <section className="faq-section grain" id="faq">
      <div className="section-wrap faq-grid">
        <div className="faq-intro" data-animate="left">
          <p className="eyebrow">{t.faq.eyebrow}</p>
          <h2>
            {headingLines[0]}
            <br />
            {headingLines[1] || ''}
          </h2>
          <p>{t.faq.lead}</p>
          <a
            className="button-secondary"
            href="mailto:algaymanhandball@gmail.com"
            data-testid="link-faq-email"
          >
            {t.faq.askBtn} <Mail size={15} />
          </a>
        </div>
        <div className="faq-list" data-animate data-delay="1">
          {t.faq.list.map(([question, answer], index) => (
            <details className="faq-item" key={question} data-testid={`faq-item-${index}`}>
              <summary>{question}</summary>
              <div className="faq-answer">{answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useLanguage();
  return (
    <section className="contact-section" id="contact">
      <div className="section-wrap contact-grid">
        <div data-animate="left">
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2>{t.contact.title}</h2>
          <p className="lead">{t.contact.lead}</p>
          <div className="contact-actions">
            <a
              className="button-primary"
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              data-testid="link-contact-booking"
            >
              {t.contact.ctaBook} <ArrowUpRight size={17} />
            </a>
            <a
              className="button-secondary"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              data-testid="link-contact-whatsapp"
              style={{backgroundColor:'#25D366', borderColor:'#25D366', color:'#fff'}}
            >
              <MessageCircle size={16} /> {t.contact.ctaWhatsapp}
            </a>
          </div>
        </div>
        <div className="contact-details" data-animate="right">
          <div className="contact-row">
            <span className="contact-label">{t.contact.addressLabel}</span>
            <a
              href="https://maps.app.goo.gl/JBHGve4Y3fCqbpeC9?g_st=ifm"
              target="_blank"
              rel="noreferrer"
              data-testid="link-address"
            >
              Rekikuja 6 AS 3<br />
              28400 Ulvila, Finland
            </a>
          </div>
          <div className="contact-row">
            <span className="contact-label">{t.contact.phoneLabel}</span>
            <a href="tel:+358451457445" data-testid="link-phone" style={{display:'inline-flex', alignItems:'center', gap:'6px'}}>
              <Phone size={14} /> 045 1457445
            </a>
          </div>
          <div className="contact-row">
            <span className="contact-label">{t.contact.emailLabel}</span>
            <a href="mailto:algaymanhandball@gmail.com" data-testid="link-email" style={{display:'inline-flex', alignItems:'center', gap:'6px'}}>
              <Mail size={14} /> algaymanhandball@gmail.com
            </a>
          </div>
          <div className="contact-row">
            <span className="contact-label">{t.contact.instagramLabel}</span>
            <a
              href="https://www.instagram.com/hieroja_ben"
              target="_blank"
              rel="noreferrer"
              data-testid="link-instagram"
              style={{display:'inline-flex', alignItems:'center', gap:'6px'}}
            >
              <Instagram size={14} /> @hieroja_ben
            </a>
          </div>
          <div className="contact-hours">
            <strong>{t.contact.hours}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="section-wrap footer-grid">
        <div>
          <a className="brand" href="#top" data-testid="link-footer-brand">
            <span className="brand-mark">B</span>
            <span className="brand-copy">
              <span className="brand-name">Ben</span>
              <span className="brand-role">{t.brandRole}</span>
            </span>
          </a>
          <p className="footer-location">{t.footer.location}</p>
          <a className="footer-contact" href="tel:+358451457445">
            045 1457445
          </a>
          <a className="footer-contact" href="mailto:algaymanhandball@gmail.com">
            algaymanhandball@gmail.com
          </a>
        </div>
        <div className="footer-links">
          <a href="#about" data-testid="link-footer-about">
            {t.footer.about}
          </a>
          <a href="#services" data-testid="link-footer-services">
            {t.footer.services}
          </a>
          <a href="#contact" data-testid="link-footer-contact">
            {t.footer.contact}
          </a>
          <a href="mailto:algaymanhandball@gmail.com?subject=Tietosuoja" data-testid="link-footer-privacy">
            {t.footer.privacy}
          </a>
          <a href={bookingUrl} target="_blank" rel="noreferrer" data-testid="link-footer-booking">
            {t.footer.book}
          </a>
        </div>
        <div className="footer-socials">
          <a href="https://www.instagram.com/hieroja_ben" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
        <span className="footer-meta">© {new Date().getFullYear()} Ben · Ulvila</span>
      </div>
    </footer>
  );
}

function Home() {
  const { t } = useLanguage();
  useScrollAnimation();

  return (
    <div id="main">
      <script type="application/ld+json">{JSON.stringify(getStructuredData(t))}</script>
      <Hero />
      <TrustStrip />
      <Intro />
      <Services />
      <About />
      <Reviews />
      <FAQ />
      <Contact />
      <Footer />
      <div className="mobile-booking">
        <span>{t.sticky.ready}</span>
        <a href={bookingUrl} target="_blank" rel="noreferrer" data-testid="link-sticky-booking">
          {t.sticky.book} <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/palvelut/urheiluhieronta" component={UrheiluhierontaPage} />
        <Route path="/palvelut/klassinen-hieronta" component={KlassinenHierontaPage} />
        <Route path="/palvelut/purentalihashieronta" component={PurentalihashierontaPage} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
        </LanguageProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;