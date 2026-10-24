export interface CraftStep {
  step: number;
  title: string;
  description: string;
  detail: string;
  iconName: string;
}

export const CHILAKALAPUDI_STORY = {
  heritageYear: 1988,
  town: 'Chilakalapudi, Machilipatnam',
  district: 'Krishna District, Andhra Pradesh, India',
  summary: 'Chilakalapudi is globally revered as the birthplace and capital of authentic 1-Gram Gold Covering Jewellery. For over a century, master metallurgists and goldsmiths here perfected an electro-chemical gold coating technique that binds pure 24kt gold to a dense copper-brass alloy at a molecular level.',
  steps: [
    {
      step: 1,
      title: 'Precision Alloy Formulation',
      description: 'Foundry casting of high-density 90:10 Copper & Brass base matrix that mimics real gold weight and tensile resilience.',
      detail: 'Unlike cheap zinc or lead imitations that snap easily, our Chilakalapudi base metal is non-porous, hypoallergenic, and gives the hefty feel of heirloom gold in your hand.',
      iconName: 'ShieldCheck',
    },
    {
      step: 2,
      title: 'Heritage Nakshi & Stone Setting',
      description: 'Skilled artisans hand-carve deity motifs (Lakshmi, peacock, floral nakshi) and handset kemp rubies and emerald cabochons.',
      detail: 'Each stone is seated in prong and collet settings using traditional repoussé techniques passed down through 3 generations.',
      iconName: 'Sparkles',
    },
    {
      step: 3,
      title: 'Multi-Stage Copper Mirror Buffing',
      description: 'Diamond rouge hand-polishing and ultrasonic cleaning to achieve a mirror finish prior to electro-deposition.',
      detail: 'Ensures no microscopically rough edges exist, allowing the gold layer to coat uniformly without pinholes or future peeling.',
      iconName: 'Gem',
    },
    {
      step: 4,
      title: '24Kt Micro Gold Electro-Deposition',
      description: 'Pure 24kt gold immersion bath creating a 1-gram equivalent (0.8 to 1.2 micron) micro-coating.',
      detail: 'Uses advanced pulse-current electroplating technology so the gold atoms fuse deeply into the alloy substrate, imparting that authentic warm 22kt bridal radiance.',
      iconName: 'Award',
    },
    {
      step: 5,
      title: 'Nano-Ceramic Anti-Tarnish Sealing',
      description: 'Clear electro-phoretic protective lacquer baked at 180°C to lock in the gold shine against sweat and humidity.',
      detail: 'This vital barrier protects the gold layer from environmental moisture, coastal humidity, and atmospheric oxidation for years.',
      iconName: 'Flame',
    },
  ] as CraftStep[],
  guaranteeDetails: {
    duration: '1-Year Full Plating Guarantee',
    coverage: 'Guarantees against blackening, peeling, and natural discoloration when used according to our care instructions.',
    rePlatingService: 'Lifetime re-plating service at our Chilakalapudi workshop for a nominal maintenance fee of ₹200.',
    returns: '7-Day hassle-free return or replacement if damaged in transit.',
  },
};
