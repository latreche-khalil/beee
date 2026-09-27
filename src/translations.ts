export type Lang = 'fi' | 'en';

export interface ServiceItem {
  number: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  prices: [string, string][];
  priceRange: string;
  suitableFor: string;
}

export interface TranslationData {
  langCode: Lang;
  brandRole: string;
  nav: {
    about: string;
    services: string;
    pricing: string;
    reviews: string;
    faq: string;
    contact: string;
    book: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    ctaBook: string;
    ctaServices: string;
    note: string;
    index: string;
    stampCity: string;
    stampRegion: string;
  };
  trust: {
    items: [string, string][];
  };
  intro: {
    kicker: string;
    eyebrow: string;
    title: string;
    p1: string;
    detail: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cardLink: string;
    list: ServiceItem[];
  };
  serviceDetail: {
    back: string;
    eyebrow: string;
    suitableTitle: string;
    pricingEyebrow: string;
    pricingTitle: string;
    ctaBook: string;
    ctaWhatsapp: string;
  };
  about: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    credentials: string[];
  };
  reviews: {
    eyebrow: string;
    title: string;
    googleRating: string;
    list: [string, string][];
  };
  faq: {
    eyebrow: string;
    title: string;
    lead: string;
    askBtn: string;
    list: [string, string][];
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    ctaBook: string;
    ctaWhatsapp: string;
    addressLabel: string;
    phoneLabel: string;
    emailLabel: string;
    instagramLabel: string;
    hours: string;
  };
  footer: {
    location: string;
    about: string;
    services: string;
    contact: string;
    privacy: string;
    book: string;
  };
  sticky: {
    ready: string;
    book: string;
  };
}

export const translations: Record<Lang, TranslationData> = {
  fi: {
    langCode: 'fi',
    brandRole: 'Koulutettu hieroja',
    nav: {
      about: 'Tietoa',
      services: 'Palvelut',
      pricing: 'Hinnasto',
      reviews: 'Arvostelut',
      faq: 'UKK',
      contact: 'Yhteystiedot',
      book: 'Varaa aika',
    },
    hero: {
      eyebrow: 'Hieronta · Ulvila',
      title: 'Hierontaa, joka tukee kehosi hyvinvointia',
      lead: 'Olen Ben, koulutettu hieroja. Suunnittelen jokaisen hoidon yksilöllisesti tavoitteidesi ja tarpeidesi mukaan.',
      ctaBook: 'Varaa aika',
      ctaServices: 'Tutustu palveluihin',
      note: 'Aikoja saatavilla Ma – Su 08:00 – 21:00',
      index: '01 / HOITO JOKA TUNTUU',
      stampCity: 'Ulvila',
      stampRegion: 'Satakunta',
    },
    trust: {
      items: [
        ['Koulutettu hieroja', 'Turun Hierojakoulu'],
        ['Liikunta-alan maisteri', 'Asiantuntemus'],
        ['Entinen ammattilaiskäsipalloilija', 'Urheilutausta'],
        ['5.0 Google rating', 'Asiakkaiden luottamus'],
        ['Vastausaika < 24h', 'Yhteydenottoihin'],
      ],
    },
    intro: {
      kicker: 'Ei yhtä hierontaa kaikille. On vain sinun tämänhetkinen tilanteesi.',
      eyebrow: 'Tietoa minusta',
      title: 'Kuuntelen kehoa,\nen suorita kaavaa.',
      p1: 'Vastaanotolle voi tulla, kun kehossa on kipua tai jännitystä, urheilusta palautuminen kaipaa tukea tai haluat yksinkertaisesti hetken rauhoittua. Aloitamme aina keskustelulla ja rakennamme hoidon sen pohjalta.',
      detail: 'Yksilöllinen hoito, Ulvila',
    },
    services: {
      eyebrow: 'Palvelut & hinnasto',
      title: 'Hoitoa jokaiseen\ntarpeeseen.',
      subtitle: 'Jokainen hoitokerta on yksilöllinen — kiputilat, palautuminen tai rentoutuminen.',
      cardLink: 'Katso palvelu',
      list: [
        {
          number: '01',
          slug: 'urheiluhieronta',
          title: 'Urheiluhieronta',
          summary: 'Tukea lihasten hyvinvointiin, suorituskykyyn ja palautumiseen.',
          description:
            'Urheiluhieronta on tehokas hoitomuoto lihasten hyvinvoinnin ja suorituskyvyn tukemiseen. Se auttaa ehkäisemään vammoja, nopeuttaa palautumista sekä lievittää lihasjännitystä ja -kipua.',
          image: 'https://benhieronta.vercel.app/images/sport-massage-new.webp',
          prices: [
            ['30 min', '30 €'],
            ['45 min', '40 €'],
            ['60 min', '50 €'],
            ['75 min', '60 €'],
            ['90 min', '70 €'],
          ],
          priceRange: '30–90 min · alk. 30 €',
          suitableFor: 'Kun haluat tukea lihasten hyvinvointia, suorituskykyä tai urheilusta palautumista.',
        },
        {
          number: '02',
          slug: 'klassinen-hieronta',
          title: 'Klassinen hieronta',
          summary: 'Rentoutusta, liikkuvuutta ja hyvää oloa keholle.',
          description:
            'Klassinen hieronta rentouttaa lihaksia, lievittää kipua ja vilkastuttaa verenkiertoa. Se auttaa vähentämään stressiä, parantaa liikkuvuutta ja tukee kehon kokonaisvaltaista hyvinvointia.',
          image: 'https://benhieronta.vercel.app/images/classic-massage-new.webp',
          prices: [
            ['30 min', '30 €'],
            ['45 min', '40 €'],
            ['60 min', '50 €'],
            ['75 min', '60 €'],
            ['90 min', '70 €'],
          ],
          priceRange: '30–90 min · alk. 30 €',
          suitableFor: 'Kun kaipaat rentoutusta, helpotusta lihasjännityksiin tai hetken omaa aikaa.',
        },
        {
          number: '03',
          slug: 'purentalihashieronta',
          title: 'Purentalihashieronta',
          summary: 'Helpotusta leuan, kasvojen ja kaulan alueen jännityksiin.',
          description:
            'Purentalihashieronta lievittää leuan, kasvojen ja kaulan alueen lihasjännitystä. Se auttaa vähentämään päänsärkyä, leukakipuja ja stressistä johtuvaa hampaiden narskuttelua sekä parantaa alueen liikkuvuutta.',
          image: 'https://benhieronta.vercel.app/images/master-massage.webp',
          prices: [
            ['45 min', '40 €'],
            ['60 min', '50 €'],
          ],
          priceRange: '45–60 min · alk. 40 €',
          suitableFor: 'Kun leuan, kasvojen tai kaulan alue tuntuu jännittyneeltä ja haluat kysyä tilanteeseesi sopivasta hoidosta.',
        },
      ],
    },
    serviceDetail: {
      back: 'Takaisin palveluihin',
      eyebrow: 'Palvelu',
      suitableTitle: 'Sopii sinulle, jos',
      pricingEyebrow: 'Hinnasto',
      pricingTitle: 'Valitse sinulle\nsopiva kesto.',
      ctaBook: 'Varaa aika',
      ctaWhatsapp: 'WhatsApp',
    },
    about: {
      eyebrow: 'Kuka on Ben?',
      title: 'Ammattitaito, joka syntyy myös liikkeestä.',
      p1: 'Olen Ben, koulutettu hieroja. Valmistuin Turun Hierojakoulusta (TYA), ja lisäksi minulla on liikunta-alan maisterin tutkinto. Taustani valmennuksessa, opetuksessa ja urheiluravitsemuksessa tukee kokonaisvaltaista lähestymistapaani asiakkaiden hyvinvointiin.',
      p2: 'Työssäni kohtaan jokaisen asiakkaan yksilöllisesti ja suunnittelen hoidon aina asiakkaan tarpeiden mukaan. Vastaanotolleni voit tulla hakemaan apua kiputiloihin, lihasjännityksiin, urheilusta palautumiseen tai rentoutumaan.',
      p3: 'Liikunta on ollut tärkeä osa elämääni jo pitkään. Pelasin käsipalloa ammattilaistasolla useiden vuosien ajan, ja vapaa-ajallani harrastan myös monipuolisesti muita liikuntalajeja.',
      credentials: ['Turun Hierojakoulu (TYA)', 'Liikunta-alan maisteri', 'Entinen ammattilaiskäsipalloilija'],
    },
    reviews: {
      eyebrow: 'Mitä asiakkaat sanovat',
      title: 'Hyvä hoito tuntuu\nvielä kotiovella.',
      googleRating: 'Google rating',
      list: [
        ['Minna Salonen', 'Erittäin huomaavainen, ammattimainen ja lämmin hieroja. Asiantuntemus näkyy sekä hoidon laadussa että erinomaisissa neuvoissa. Lähdin rentoutuneena ja luottavaisena!'],
        ['Thanh Nguyen', 'Ammattimainen ja osaava hieroja — kuunteleva ja erittäin miellyttävä. Olen käynyt useita kertoja ja laatu on todella erinomainen. Hän antoi myös neuvoja venyttelyyn ja liikkeisiin.'],
        ['Tomi Heikkilä', 'Erittäin asiakaskeskeinen, osaava ja avulias. Kaiken kaikkiaan hyvin miellyttävä ihminen.'],
      ],
    },
    faq: {
      eyebrow: 'Usein kysyttyä',
      title: 'Ennen kuin\ntulet.',
      lead: 'Etkö löytänyt vastausta? Laita viestiä — vastaan yleensä alle 24 tunnissa.',
      askBtn: 'Kysy Beniltä',
      list: [
        ['Mitä eroa on urheiluhieronnalla ja klassisella hieronnalla?', 'Urheiluhieronta keskittyy lihasten suorituskykyyn, palautumiseen ja syvempiin kudoksiin, kun taas klassinen hieronta rentouttaa kokonaisvaltaisesti ja lievittää arkisia lihasjännityksiä.'],
        ['Miten purentalihashieronta voi auttaa minua?', 'Purentalihashieronta lievittää leuan, poskien ja kaulan alueen lihasjännitystä, helpottaa purentavaivoja (bruksismi) ja vähentää jännityspäänsärkyä.'],
        ['Miten peruutan tai siirrän varatun aikani?', 'Voit siirtää tai peruuttaa varatun ajan veloituksetta vähintään 24 tuntia ennen hoidon alkua varausvahvistuksen linkin kautta tai ilmoittamalla suoraan Benille.'],
        ['Miten valmistaudun hierontakäynnille?', 'Pukeudu mukaviin vaatteisiin ja vältä raskasta ateriaa juuri ennen hierontaa. Käymme alussa aina läpi toiveesi ja mahdolliset kipualueet.'],
        ['Myyttekö lahjakortteja hierontaan?', 'Kyllä, voit ostaa lahjakortin hierontaan ottamalla yhteyttä suoraan puhelimitse tai WhatsAppilla.'],
        ['Sopiiko hieronta raskaana oleville tai jos minulla on jokin perussairaus?', 'Hieronta voidaan usein räätälöidä turvalliseksi. Jos olet raskaana tai sinulla on akuutti perussairaus, ilmoitathan siitä etukäteen tai hoidon alussa.'],
      ],
    },
    contact: {
      eyebrow: 'Yhteys & vastaanotto',
      title: 'Vieraile vastaanotolla Ulvilassa.',
      lead: 'Vastaanottoni sijaitsee Ulvilassa, helposti saavutettavissa Turusta ja lähiseudulta.',
      ctaBook: 'Varaa aika',
      ctaWhatsapp: 'WhatsApp',
      addressLabel: 'Osoite',
      phoneLabel: 'Puhelin',
      emailLabel: 'Sähköposti',
      instagramLabel: 'Instagram',
      hours: 'Ma – Su 08:00 – 21:00',
    },
    footer: {
      location: 'Ulvila, Finland',
      about: 'Tietoa',
      services: 'Palvelut',
      contact: 'Yhteystiedot',
      privacy: 'Tietosuoja',
      book: 'Varaa aika',
    },
    sticky: {
      ready: 'Valmis varaamaan?',
      book: 'Varaa aika',
    },
  },
  en: {
    langCode: 'en',
    brandRole: 'Certified Massage Therapist',
    nav: {
      about: 'About',
      services: 'Services',
      pricing: 'Pricing',
      reviews: 'Reviews',
      faq: 'FAQ',
      contact: 'Contact',
      book: 'Book Now',
    },
    hero: {
      eyebrow: 'Massage Therapy · Ulvila',
      title: 'Massage therapy tailored to your body’s well-being',
      lead: 'I am Ben, a certified massage therapist. Every session is personalized to your goals, muscle tension, and recovery needs.',
      ctaBook: 'Book Appointment',
      ctaServices: 'Explore Services',
      note: 'Appointments available Mon – Sun 08:00 – 21:00',
      index: '01 / CARE YOU CAN FEEL',
      stampCity: 'Ulvila',
      stampRegion: 'Satakunta',
    },
    trust: {
      items: [
        ['Certified Therapist', 'Turku Massage School (TYA)'],
        ['M.Sc. Sport Sciences', 'Expertise & Anatomy'],
        ['Former Pro Athlete', 'Handball Background'],
        ['5.0 Google Rating', 'Client Trust & Satisfaction'],
        ['Reply < 24h', 'Fast Inquiries & Support'],
      ],
    },
    intro: {
      kicker: 'No one-size-fits-all massage. Only what your body needs right now.',
      eyebrow: 'About My Approach',
      title: 'Listening to the body,\nnever following a rigid formula.',
      p1: 'You are welcome whether you experience acute tension or pain, need support recovering from sports, or simply want a quiet moment to unwind. We always begin with a consultation and adapt every technique to your situation.',
      detail: 'Tailored treatment, Ulvila',
    },
    services: {
      eyebrow: 'Services & Pricing',
      title: 'Care for every\nindividual need.',
      subtitle: 'Every session is uniquely personalized — pain relief, athletic recovery, or deep relaxation.',
      cardLink: 'View service',
      list: [
        {
          number: '01',
          slug: 'urheiluhieronta',
          title: 'Sports Massage',
          summary: 'Sports massage is an effective muscle stretching and shaping treatment that promotes recovery, prevents injuries, and improves performance.',
          description:
            'Sports massage is an effective muscle stretching and shaping treatment that promotes recovery, prevents injuries, and improves performance.',
          image: 'https://benhieronta.vercel.app/images/sport-massage-new.webp',
          prices: [
            ['30 min', '30 €'],
            ['45 min', '40 €'],
            ['60 min', '50 €'],
            ['75 min', '60 €'],
            ['90 min', '70 €'],
          ],
          priceRange: '30–90 min · from 30 €',
          suitableFor: 'When you want to support athletic performance, speed recovery, or alleviate intense physical tension.',
        },
        {
          number: '02',
          slug: 'klassinen-hieronta',
          title: 'Classic Massage',
          summary: 'Classic massage is a relaxing and muscle-conditioning treatment that improves blood circulation, relieves tension, and promotes body recovery.',
          description:
            'Classic massage is a relaxing and muscle-conditioning treatment that improves blood circulation, relieves tension, and promotes body recovery.',
          image: 'https://benhieronta.vercel.app/images/classic-massage-new.webp',
          prices: [
            ['30 min', '30 €'],
            ['45 min', '40 €'],
            ['60 min', '50 €'],
            ['75 min', '60 €'],
            ['90 min', '70 €'],
          ],
          priceRange: '30–90 min · from 30 €',
          suitableFor: 'When you seek relaxation, relief from neck & shoulder tension, or a moment of calm.',
        },
        {
          number: '03',
          slug: 'purentalihashieronta',
          title: 'Masseter Massage',
          summary: 'Masseter massage is a treatment that releases muscle tension in the face and head area, relieves pain and improves jaw mobility.',
          description:
            'Masseter massage is a treatment that releases muscle tension in the face and head area, relieves pain and improves jaw mobility.',
          image: 'https://benhieronta.vercel.app/images/master-massage.webp',
          prices: [
            ['45 min', '40 €'],
            ['60 min', '50 €'],
          ],
          priceRange: '45–60 min · from 40 €',
          suitableFor: 'When you experience jaw tension, clench or grind teeth, or suffer from tension headaches.',
        },
      ],
    },
    serviceDetail: {
      back: 'Back to services',
      eyebrow: 'Service',
      suitableTitle: 'Ideal for you if',
      pricingEyebrow: 'Pricing',
      pricingTitle: 'Choose your\npreferred duration.',
      ctaBook: 'Book Appointment',
      ctaWhatsapp: 'WhatsApp',
    },
    about: {
      eyebrow: 'Who is Ben?',
      title: 'Expertise shaped by science and movement.',
      p1: 'I am Ben, a certified massage therapist graduated from Turku Massage School (TYA), and I also hold a Master’s degree in Sport Sciences. My background in coaching, education, and sports nutrition enriches my comprehensive approach to client health.',
      p2: 'I treat every client individually, tailoring treatments to specific needs. You can visit for muscular pain relief, mobility enhancement, athletic recovery, or pure relaxation.',
      p3: 'Physical activity has been at the core of my life for years. I played handball at a professional level for multiple seasons and remain passionate about fitness and healthy living.',
      credentials: ['Turku Massage School (TYA)', 'Master of Sport Sciences', 'Former Pro Handball Player'],
    },
    reviews: {
      eyebrow: 'What Clients Say',
      title: 'Care that feels good\nlong after you leave.',
      googleRating: 'Google rating',
      list: [
        ['Minna Salonen', 'Extremely considerate, professional, and warm massage therapist. His expertise shines in both treatment quality and practical advice. I left feeling relaxed and reassured!'],
        ['Thanh Nguyen', 'Professional and highly skilled — attentive and very pleasant. I have visited several times and the quality is consistently exceptional. He also shared valuable stretching exercises.'],
        ['Tomi Heikkilä', 'Very client-centered, knowledgeable, and helpful. Overall a truly wonderful professional.'],
      ],
    },
    faq: {
      eyebrow: 'Frequently Asked Questions',
      title: 'Before your\nvisit.',
      lead: 'Have another question? Send a message — I typically reply within 24 hours.',
      askBtn: 'Ask Ben',
      list: [
        ['What is the difference between sports and classic massage?', 'Sports massage focuses on deep tissue work, athletic performance, and recovery, while classic massage emphasizes general tension relief, relaxation, and soothing circulation.'],
        ['How can jaw muscle massage help me?', 'It targets the masticatory and neck muscles, relieving jaw clenching, teeth grinding (bruxism), and related tension headaches or neck pain.'],
        ['How can I cancel or reschedule my booking?', 'You can cancel or reschedule free of charge up to 24 hours before your appointment using the link in your booking confirmation or by messaging Ben directly.'],
        ['How should I prepare for my massage?', 'Wear comfortable clothes and avoid heavy meals right before your session. We begin each appointment with a brief chat about your goals and focus areas.'],
        ['Do you offer massage gift cards?', 'Yes, massage gift certificates are available. Contact Ben directly via phone or WhatsApp to arrange one.'],
        ['Is massage safe during pregnancy or with underlying health conditions?', 'Treatments can almost always be adapted safely. If you are pregnant or have acute medical conditions, please mention it beforehand or at the start of your visit.'],
      ],
    },
    contact: {
      eyebrow: 'Contact & Clinic',
      title: 'Visit the clinic in Ulvila.',
      lead: 'The clinic is situated in Ulvila, with easy access from Pori, Turku, and across Satakunta.',
      ctaBook: 'Book Appointment',
      ctaWhatsapp: 'WhatsApp',
      addressLabel: 'Address',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      instagramLabel: 'Instagram',
      hours: 'Mon – Sun 08:00 – 21:00',
    },
    footer: {
      location: 'Ulvila, Finland',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      book: 'Book Appointment',
    },
    sticky: {
      ready: 'Ready to book?',
      book: 'Book Appointment',
    },
  },
};
