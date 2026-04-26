'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { Reveal } from '@/components/ui/reveal';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { cn } from '@/lib/utils';
import {
  Dialog as AppDialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ArrowLeft,
  Briefcase,
  CheckCircle,
  Goal,
  Layers3,
  LogIn,
  Menu,
  Network,
  Radar,
  Rocket,
  SlidersHorizontal,
  Sparkles,
  Target,
  UsersRound,
  ClipboardCheck,
  ArrowRight,
  Handshake,
  Loader2,
  X,
} from 'lucide-react';
import { Dialog as HeadlessDialog, DialogPanel } from '@headlessui/react';

const ABOUT_LINK =
  'https://medium.com/@danydubraybu/personne-ne-r%C3%A9ussit-seul-comment-le-r%C3%A9seau-a-donn%C3%A9-naissance-%C3%A0-jloow-9b14dc104f20?postPublishedType=initial';

const useCases = [
  {
    title: 'Trouver l’opportunité',
    desc: 'Job, mission, client…',
    icon: Briefcase,
  },
  {
    title: 'Atteindre le décideur',
    desc: 'Sponsor, leader d’opinion…',
    icon: Target,
  },
  {
    title: 'Activer la ressource clé',
    desc: 'Expert, mentor, talent…',
    icon: Sparkles,
  },
  {
    title: 'Détecter les signaux faibles',
    desc: 'Pairs, insiders, tendances…',
    icon: Radar,
  },
];

const pillars = [
  {
    key: 'rejoindre',
    title: '1. Rejoindre',
    tagline: 'Complétez le quiz pour finaliser votre inscription',
    icon: LogIn,
    bullets: [
      'Votre profil (besoins, parcours, apports)',
      'Vos communautés (associations d’alumni, clubs d’entrepreneurs...)',
      'Vos événements de networking (conférences, salons, meetups...)',
    ],
  },
  {
    key: 'cibler',
    title: '2. Sélectionner',
    tagline: 'Choisissez votre formule selon vos affinités',
    icon: Goal,
    bullets: [
      'Programmes Grand Challenge thématiques selon une fonction, un métier, un secteur d’activité',
      'Programmes Smart Challenge, autour d’un individu, ou Private Challenge, autour d’une communauté',
      'Événements partenaires dans le cadre des programmes Grand Challenge ou Smart Challenge',
    ],
  },
  {
    key: 'engager',
    title: '3. Engager',
    tagline: 'On vous connecte avec les personnes les plus pertinentes',
    icon: UsersRound,
    bullets: [
      'Mises en relation qualifiées, générées par l’IA à partir de votre profil et des formules sélectionnées',
      'Suivi et engagement de vos contacts depuis votre tableau de bord sur Jloow',
      'Génération d’opportunités professionnelles et business pour accélérer vos objectifs',
    ],
  },
];

const bottomItems = [
  {
    key: 'rejoindre',
    title: 'Besoins personnalisés',
    icon: SlidersHorizontal,
  },
  {
    key: 'cibler',
    title: 'Formules adaptées',
    icon: Layers3,
  },
  {
    key: 'engager',
    title: 'Opportunités pro',
    icon: Handshake,
  },
];

const quizItems = [
  {
    question: 'Votre vision du networking, c’est :',
    options: [
      'Construire un réseau durable et activable',
      'Générer des opportunités régulières',
      'Répondre à un besoin immédiat',
      'Je structure encore ma démarche',
    ],
  },
  {
    question: 'Votre posture dans le réseau, c’est :',
    options: [
      'Donner autant que recevoir',
      'Créer de la valeur pour mon écosystème',
      'Chercher surtout des opportunités ciblées',
      'J’active surtout mon réseau quand j’en ai besoin',
    ],
  },
  {
    question: 'Votre maîtrise actuelle du networking, c’est :',
    options: [
      'Une stratégie claire et une routine efficace',
      'Une bonne base mais encore irrégulière',
      'Des résultats mais sans vraie méthode',
      'Je manque surtout d’accès aux bonnes personnes',
    ],
  },
];

type CurrentProgram = {
  key: string;
  title: string;
  eyebrow: string;
  imageSrc: string;
  imageAlt: string;
  hideImage?: boolean;
  partnerImages?: {
    src: string;
    alt: string;
    label?: string;
    href?: string;
  }[];
  description: string;
  footnote?: string;
  bullets: string[];
  presentationSections?: {
    title: string;
    paragraphs?: string[];
    items: string[];
    image?: {
      src: string;
      alt: string;
      label: string;
      href?: string;
    };
  }[];
};

const currentPrograms: CurrentProgram[] = [
  {
    key: 'grand-match-ia',
    title: "Grand Challenge de l'IA",
    eyebrow: 'Programme en cours',
    imageSrc: '/section-2-networking.png',
    imageAlt: "Professionnels en échange autour d'un programme IA",
    partnerImages: [
      {
        src: '/evenement-villagebyca-paris.png',
        alt: 'Evénement de networking au Village by CA à Paris',
        label: 'JLOOW x Le VillagebyCA',
        href: '/evenement-villagebyca-paris',
      },
      {
        src: '/grand-match-ia-bloc-droite.png',
        alt: 'Ambiance de networking lors d’un événement partenaire',
        label: 'JLOOW x NIDA',
        href: '/evenement-nida',
      },
    ],
    description:
      '🚀 Découvrez le premier programme de smart matching¹ dédié à l’Intelligence Artificielle !',
    footnote:
      '¹ Technologie basée sur l’IA qui analyse les profils, besoins et objectifs pour proposer des mises en relation ultra-ciblées et pertinentes, optimisant ainsi le networking et les opportunités professionnelles.',
    presentationSections: [
      {
        title: 'Pourquoi ce programme ?',
        paragraphs: [
          'L’Intelligence Artificielle révolutionne actuellement le monde du travail. Certains emplois disparaîtront, d’autres se transformeront profondément. Dans ce contexte, networker intelligemment et efficacement devient une nécessité pour :',
        ],
        items: [
          'Développer son employabilité en restant connecté aux opportunités et aux compétences émergentes.',
          'Accélérer son business en créant des partenariats stratégiques et en accédant à des expertises pointues.',
          'Anticiper les changements avec des professionnels qui innovent et transforment leur secteur grâce à l’IA.',
        ],
      },
      {
        title: 'Le principe de ce programme',
        paragraphs: [
          'Ce programme exclusif de smart matching basé sur l’IA, est conçu pour vous mettre en relation avec les personnes les plus pertinentes par rapport à vos besoins spécifiques. En vous inscrivant, vous bénéficiez de :',
        ],
        items: [],
      },
    ],
    bullets: [
      '6 drops (suggestions de mises en relation qualifiées) sur mesure, alignées avec vos besoins et objectifs professionnels.',
      'Un accès illimité à tous les événements organisés par nos partenaires pendant la durée de votre abonnement (1 mois ou 12 mois).',
    ],
  },
  {
    key: 'smart-match-dany-dubray',
    title: 'Smart Challenge de Dany Dubray',
    eyebrow: 'Programme en cours',
    imageSrc: '/evenement-dany-dubray.png',
    imageAlt: 'Evénement de networking JLOOW x Dany Dubray',
    hideImage: true,
    description:
      '🌟 Networker au sein du réseau unique du fondateur de Jloow',
    presentationSections: [
      {
        title: 'Pourquoi rejoindre ce programme ?',
        paragraphs: [
          'Mon réseau professionnel est un écosystème unique, façonné par mes expériences et mes centres d’intérêt (entrepreneuriat, investissement, innovation...).',
          'Pourtant, mes contacts et followers, bien que partageant des affinités communes, ne se connaissent pas nécessairement entre eux. Imaginez les opportunités qu’ils pourraient créer en se connectant pour répondre à leurs besoins spécifiques !',
          '📩 Rejoindre le programme.',
        ],
        items: [],
      },
      {
        title: 'Le principe de ce programme',
        paragraphs: [
          'Ce programme exclusif de smart matching basé sur l’IA, est conçu pour vous mettre en relation avec les personnes les plus pertinentes par rapport à vos besoins spécifiques, au sein du réseau de Dany Dubray. En vous inscrivant, vous bénéficiez de :',
        ],
        items: [],
      },
      {
        title: 'Chaque participant peut devenir Network Partner',
        paragraphs: [
          'Vous aussi, vous pouvez créer votre programme, organiser vos événements, inviter votre réseau et fixer vos propres tarifs.',
          'Transformez votre réseau en un véritable levier de création de valeur et de croissance professionnelle !',
          '🤝 Devenir Network Partner.',
        ],
        items: [],
      },
      {
        title: 'Evénement du Network Partner',
        paragraphs: [],
        items: [],
        image: {
          src: '/evenement-dany-dubray.png',
          alt: 'Smart Challenge de Dany Dubray',
          label: 'JLOOW x Dany Dubray',
          href: '/evenement-dany-dubray',
        },
      },
    ],
    bullets: [
      '3 drops hyperciblés, basés sur vos besoins et objectifs professionnels.',
      'Un accès aux événements de ce Network Partner.',
    ],
  },
];

const formulas = [
  {
    key: 'grand-match',
    label: 'Grand Challenge',
    eyebrow: 'Programme autour d’un thème',
    focusLabel: 'Thème',
    highlights: [
      {
        label: '',
        value: {
          primary: 'Module principal',
          aside: '6 drops1 / mois',
          secondary: ['Asynchrone', 'Visio ou présentiel', 'Flexibilité'],
        },
      },
      {
        label: '',
        value: {
          primary: 'Événements partenaires',
          aside: '+2 drops2 / événement',
          secondary: ['Synchrone', 'Présentiel', 'Richesse du présentiel'],
        },
      },
    ],
    description:
      'Un format hybride conçu pour réunir des profils autour d’une même fonction, d’un même métier ou d’un même secteur d’activité. L’inscription à un Grand Challenge nécessite un Pass Universel, qui donne accès jusqu’à 3 Grand Challenges et 5 Smart Challenges. Vous pouvez également prendre part à un Grand Challenge en tant que partenaire organisateur.',
    partnerCta: {
      icon: '📩',
      label: "Organiser votre événement dans le cadre d'un Grand Challenge.",
      href: "mailto:partenariat@jloow.com?subject=Partenaire%20d'un%20Grand%20Challenge",
    },
    bullets: [
      'Ciblage par thématique ou vertical métier',
      'Rencontres 1:1 à forte pertinence',
      'Idéal pour créer des connexions à grande échelle, avec méthode',
    ],
  },
  {
    key: 'smart-match-perso',
    label: 'Smart Challenge',
    eyebrow: 'Programme autour d’une personne physique',
    focusLabel: 'Personne physique',
    highlights: [
      {
        label: '',
        value: {
          primary: 'Module principal',
          aside: '3 drops1 / programme',
          secondary: ['Asynchrone', 'Visio ou présentiel', 'Flexibilité'],
        },
      },
      {
        label: '',
        value: {
          primary: 'Événements (optionnel)',
          aside: '+2 drops2 / événement',
          secondary: ['Synchrone', 'Présentiel', 'Richesse du présentiel'],
        },
      },
    ],
    description:
      'L’inscription à un Smart Challenge nécessite un Pass Universel, qui donne accès jusqu’à 5 Smart Challenges. Toute personne physique peut aussi devenir Network Partner, créer son propre Smart Challenge et l’ouvrir à son réseau. Chaque participant, Network Partner inclus, complète son profil afin de recevoir des drops alignés sur ses besoins.',
    partnerCta: {
      icon: '📩',
      label: 'Devenir Network Partner pour organiser un Smart Challenge.',
      href: "mailto:partenariat@jloow.com?subject=Partenaire%20d'un%20Smart%20Challenge",
    },
    bullets: [
      'Approche sur-mesure',
      'Adapté pour accélérer vos objectifs professionnels',
      'Facilité de mise en oeuvre',
      'Pensé pour valoriser votre communauté',
    ],
  },
  {
    key: 'smart-match-corpo',
    label: 'Private Challenge',
    eyebrow: 'Programme autour d’une communauté',
    focusLabel: 'Communauté',
    highlights: [
      {
        label: '',
        value: {
          primary: 'Drops1',
          aside: 'Sur mesure',
          secondary: ['Asynchrone', 'Visio ou présentiel', 'Flexibilité'],
        },
      },
      {
        label: '',
        value: {
          primary: 'Événements',
          aside: 'Sur mesure',
          secondary: ['Synchrone', 'Présentiel', 'Richesse du présentiel'],
        },
      },
    ],
    description:
      'Une formule dédiée aux communautés (club d’entrepreneurs, association d’alumni, école supérieure, organisateur d’événements...) qui souhaitent proposer un networking structuré et performant à leurs membres. Vous vous intéressez au concept de Smart Matching et vous avez un projet pour votre communauté ? Contactez-nous.',
    partnerCta: {
      icon: '📩',
      label: 'Organiser votre propre Private Challenge.',
      href: "mailto:partenariat@jloow.com?subject=Partenaire%20d'un%20Private%20Challenge",
    },
    bullets: [
      'Programme sur-mesure, conçu selon les besoins et les objectifs de votre communauté',
      'Renforcement de la valeur intracommunautaire et des synergies entre les membres',
      'Un réseau utile pour le business, l’apprentissage et l’ouverture à de nouvelles opportunités',
    ],
  },
];

function renderDropLabel(text: string) {
  if (
    !text.includes('drops1') &&
    !text.includes('drops2') &&
    !text.includes('Drops1') &&
    !text.includes('Drops2') &&
    !text.includes('drop1') &&
    !text.includes('drop2')
  ) {
    return text;
  }

  const marker = text.includes('Drops2')
    ? 'Drops2'
    : text.includes('Drops1')
      ? 'Drops1'
      : text.includes('drops2')
    ? 'drops2'
    : text.includes('drops1')
      ? 'drops1'
      : text.includes('drop2')
        ? 'drop2'
        : 'drop1';
  const exponent = marker.endsWith('2') ? '2' : '1';
  const baseLabel = marker.startsWith('Drops') ? 'Drops' : marker.startsWith('drops') ? 'drops' : 'drop';
  const [before, ...afterParts] = text.split(marker);
  const after = afterParts.join(marker);

  return (
    <>
      {before}
      {baseLabel}
      <sup className="ml-0.5 text-[0.65em] align-super">{exponent}</sup>
      {after}
    </>
  );
}

function renderFormulaDescription(text: string) {
  const parts = text.split(/(Pass Universel)/g);

  return parts.map((part, index) =>
    part === 'Pass Universel' ? (
      <strong key={`${part}-${index}`} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

function renderCurrentProgramText(text: string) {
  if (text === '📩 Rejoindre le programme.') {
    return (
      <>
        📩{' '}
        <a href="#quiz" className="font-semibold text-primary underline underline-offset-4">
          Rejoindre le programme.
        </a>
      </>
    );
  }

  if (text === '🤝 Devenir Network Partner.') {
    return (
      <>
        🤝{' '}
        <a
          href="mailto:communication@jloow.com?subject=Devenir%20Network%20Partner"
          className="font-semibold text-primary underline underline-offset-4"
        >
          Devenir Network Partner.
        </a>
      </>
    );
  }

  const boldEvents = !text.includes('organiser des événements') && !text.includes('organiser vos événements');
  const boldOpportunities = !text.includes('restant connecté aux opportunités');
  const keywords = [
    'employabilité',
    'business',
    'changements',
    'drops',
    '3',
    '6',
    'écosystème unique',
    'votre programme',
    ...(boldOpportunities ? ['opportunités'] : []),
    ...(boldEvents ? ['événements'] : []),
  ];
  const parts = text.split(
    /(employabilité|business|changements|drops|événements|3|6|écosystème unique|opportunités|votre programme)/gi
  );

  return parts.map((part, index) =>
    keywords.includes(part.toLowerCase()) ? (
      <strong key={`${part}-${index}`} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

function renderPillarBulletText(text: string) {
  const keywords = [
    'profil',
    'communautés',
    'événements',
    'partenaires',
    'Mises en relation qualifiées',
    'Suivi',
    'opportunités',
    ...(text.startsWith('Programmes Grand Challenge') ? ['Grand Challenge'] : []),
    ...(text.startsWith('Programmes Smart Challenge') ? ['Smart Challenge', 'Private Challenge'] : []),
  ];

  const parts = text.split(
    /(Mises en relation qualifiées|Smart Challenge|Private Challenge|Grand Challenge|communautés|événements|partenaires|opportunités|profil|Suivi)/gi
  );

  return parts.map((part, index) =>
    keywords.some((keyword) => keyword.toLowerCase() === part.toLowerCase()) ? (
      <strong key={`${part}-${index}`} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export default function HomePage() {
  const [activeNavSection, setActiveNavSection] = useState<
    'home' | 'actualites' | 'fonctionnement' | 'quiz' | 'formules' | null
  >('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMentionsOpen, setIsMentionsOpen] = useState(false);
  const [isMentionsLoading, setIsMentionsLoading] = useState(false);
  const [mentionsContent, setMentionsContent] = useState('');
  const [mentionsError, setMentionsError] = useState<string | null>(null);
  const [activePillar, setActivePillar] = useState<(typeof pillars)[number]['key']>('rejoindre');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [activeCurrentProgram, setActiveCurrentProgram] = useState(0);
  const [activeFormula, setActiveFormula] = useState(0);

  const activePillarData = useMemo(
    () => pillars.find((pillar) => pillar.key === activePillar) ?? pillars[0],
    [activePillar]
  );
  const activePillarImage = useMemo(
    () => {
      if (activePillar === 'rejoindre') {
        return {
          src: '/section-2-rejoindre.png',
          alt: 'Femme professionnelle dans un espace collaboratif',
          className: 'object-cover object-[78%_center]',
        };
      }

      if (activePillar === 'cibler') {
        return {
          src: '/section-2-formules-adaptees.png',
          alt: 'Formules adaptées pour un programme de networking',
          className: 'object-cover',
        };
      }

      return {
        src: '/section-2-networking.png',
        alt: 'Professionnels en discussion dans un environnement de travail moderne',
        className: 'object-cover',
      };
    },
    [activePillar]
  );
  const answeredQuizCount = Object.keys(quizAnswers).length;
  const isQuizComplete = answeredQuizCount === quizItems.length;
  const activeFormulaData = formulas[activeFormula];
  const activeFormulaPartnerCta = 'partnerCta' in activeFormulaData ? activeFormulaData.partnerCta ?? null : null;
  const activeCurrentProgramData = currentPrograms[activeCurrentProgram];

  const goToPreviousCurrentProgram = () => {
    setActiveCurrentProgram((current) => (current === 0 ? currentPrograms.length - 1 : current - 1));
  };

  const goToNextCurrentProgram = () => {
    setActiveCurrentProgram((current) => (current === currentPrograms.length - 1 ? 0 : current + 1));
  };

  const quizQualification = useMemo(() => {
    if (!isQuizComplete) {
      return {
        tone: 'neutral' as const,
        title: '',
        message: '',
      };
    }

    const reservedAnswersCount = [
      quizAnswers[0] === 'Répondre à un besoin immédiat',
      quizAnswers[1] === 'J’active surtout mon réseau quand j’en ai besoin',
      quizAnswers[2] === 'Une stratégie claire et une routine efficace',
    ].filter(Boolean).length;

    const scoreMap: Record<number, Record<string, number>> = {
      0: {
        'Construire un réseau durable et activable': 2,
        'Générer des opportunités régulières': 2,
        'Répondre à un besoin immédiat': -1,
        'Je structure encore ma démarche': 1,
      },
      1: {
        'Donner autant que recevoir': 2,
        'Créer de la valeur pour mon écosystème': 2,
        'Chercher surtout des opportunités ciblées': 1,
        'J’active surtout mon réseau quand j’en ai besoin': -1,
      },
      2: {
        'Une stratégie claire et une routine efficace': 2,
        'Une bonne base mais encore irrégulière': 1,
        'Des résultats mais sans vraie méthode': 1,
        'Je manque surtout d’accès aux bonnes personnes': 1,
      },
    };

    const totalScore = quizItems.reduce((score, _, index) => {
      const answer = quizAnswers[index];
      return score + (scoreMap[index][answer] ?? 0);
    }, 0);

    if (reservedAnswersCount === 3) {
      return {
        tone: 'warning' as const,
        title: 'Votre profil semble peu aligné avec la plateforme',
        message:
          'Vos réponses montrent un usage plutôt ponctuel du networking. Jloow est conçu pour les personnes qui veulent en faire une routine structurée et performante.',
      };
    }

    if (reservedAnswersCount > 0) {
      return {
        tone: 'reserved' as const,
        title:
          reservedAnswersCount === 2
            ? 'Votre profil semble pertinent, avec des points de vigilance'
            : 'Votre profil semble pertinent, avec un point de vigilance',
        message:
          reservedAnswersCount === 1
            ? 'Une de vos réponses appelle une réserve. Votre profil reste pertinent pour Jloow si vous souhaitez rendre votre networking plus structuré, plus régulier et plus performant.'
            : 'Certaines de vos réponses appellent une réserve. Jloow peut vous convenir si vous voulez passer d’un networking encore partiellement opportuniste à une routine plus structurée et plus performante.',
      };
    }

    if (totalScore <= 1) {
      return {
        tone: 'warning' as const,
        title: 'Votre profil semble peu aligné avec la plateforme',
        message:
          'Vos réponses montrent un usage plutôt ponctuel du networking. Jloow est conçu pour les personnes qui veulent en faire une routine structurée et performante.',
      };
    }

    return {
      tone: 'success' as const,
      title: 'Votre profil correspond bien à l’approche Jloow',
      message:
        'Vous recherchez une démarche de networking plus structurée, plus régulière et plus performante.',
    };
  }, [isQuizComplete, quizAnswers]);

  const loadMentionsLegales = async () => {
    setIsMentionsLoading(true);
    setMentionsError(null);

    try {
      const response = await fetch('/api/legal/mentions-legales', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des mentions légales.');
      }

      const data: { content?: string; error?: string } = await response.json();
      if (typeof data.content !== 'string') {
        throw new Error(data.error || 'Le contenu est indisponible.');
      }

      setMentionsContent(data.content);
    } catch (error) {
      console.error(error);
      setMentionsError('Impossible de charger les mentions légales.');
    } finally {
      setIsMentionsLoading(false);
    }
  };

  const openMentionsLegales = () => {
    setIsMentionsOpen(true);
    if (!isMentionsLoading) {
      void loadMentionsLegales();
    }
  };

  useEffect(() => {
    const programmeKey = new URLSearchParams(window.location.search).get('programme');
    const programmeIndex = currentPrograms.findIndex((program) => program.key === programmeKey);

    if (programmeIndex >= 0) {
      setActiveCurrentProgram(programmeIndex);
    }
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      const homeSection = document.getElementById('home');
      const programmesSection = document.getElementById('programmes-en-cours');
      const commentCaMarcheSection = document.getElementById('comment-ca-marche');
      const quizSection = document.getElementById('quiz');
      const formulesSection = document.getElementById('formules');

      if (!homeSection || !programmesSection || !commentCaMarcheSection || !quizSection || !formulesSection) {
        return;
      }

      const sections = [
        { key: 'home' as const, rect: homeSection.getBoundingClientRect() },
        { key: 'actualites' as const, rect: programmesSection.getBoundingClientRect() },
        { key: 'fonctionnement' as const, rect: commentCaMarcheSection.getBoundingClientRect() },
        { key: 'quiz' as const, rect: quizSection.getBoundingClientRect() },
        { key: 'formules' as const, rect: formulesSection.getBoundingClientRect() },
      ];

      const headerOffset = 56;
      const sectionAtHeader = sections.find(
        (section) => section.rect.top <= headerOffset && section.rect.bottom > headerOffset
      );

      setActiveNavSection(sectionAtHeader?.key ?? null);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const smoothScrollTo = (targetTop: number) => {
    const startTop = window.scrollY;
    const distance = targetTop - startTop;
    const duration = 850;
    let startTime: number | null = null;

    const easeInOutCubic = (progress: number) =>
      progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startTop + distance * easedProgress);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  const scrollToSection = (sectionId: 'home' | 'programmes-en-cours' | 'comment-ca-marche' | 'quiz' | 'formules') => {
    if (sectionId === 'home') {
      smoothScrollTo(0);
      setActiveNavSection('home');
      setMobileMenuOpen(false);
      return;
    }

    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    const title = section.querySelector('h2');
    const HEADER_OFFSET = 72;
    const PROGRAMMES_TOP_PADDING = 0;
    const COMMENT_CA_MARCHE_TOP_PADDING = 70;
    const QUIZ_TOP_PADDING = -52;
    const FORMULES_TOP_PADDING = 0;
    const targetEl = sectionId === 'quiz' ? section : title ?? section;
    const sectionTopPadding =
      sectionId === 'programmes-en-cours'
        ? PROGRAMMES_TOP_PADDING
        : sectionId === 'comment-ca-marche'
          ? COMMENT_CA_MARCHE_TOP_PADDING
          : sectionId === 'quiz'
            ? QUIZ_TOP_PADDING
            : FORMULES_TOP_PADDING;
    const targetOffset = HEADER_OFFSET + sectionTopPadding;
    const top = targetEl.getBoundingClientRect().top + window.scrollY - targetOffset;

    smoothScrollTo(top);
    setActiveNavSection(
      sectionId === 'programmes-en-cours'
        ? 'actualites'
        : sectionId === 'comment-ca-marche'
          ? 'fonctionnement'
          : sectionId
    );
    setMobileMenuOpen(false);
  };

  const goToPreviousFormula = () => {
    setActiveFormula((current) => (current === 0 ? formulas.length - 1 : current - 1));
  };

  const goToNextFormula = () => {
    setActiveFormula((current) => (current === formulas.length - 1 ? 0 : current + 1));
  };

  return (
    <>
      <div className="relative isolate min-h-screen w-full overflow-hidden bg-background flex flex-col">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#8A2BE2] to-[#4169E1] opacity-20 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <header className="fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
          <nav className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <button
                type="button"
                onClick={() => scrollToSection('home')}
                className="-m-1.5 p-1.5 flex items-center gap-2"
              >
                <Image
                  src={activeNavSection === 'home' ? '/Logo_final_png.png?v=3' : '/Logo_final_NB_png.png?v=3'}
                  alt=""
                  width={41}
                  height={32}
                  className="h-8 w-auto"
                  priority
                />
                <span
                  className={[
                    'text-lg sm:text-xl font-bold transition',
                    activeNavSection === 'home' ? 'text-primary' : 'text-foreground',
                  ].join(' ')}
                >
                  JLOOW
                </span>
              </button>
            </div>

            <div className="hidden items-center justify-center gap-x-3 sm:flex md:gap-x-5 xl:gap-x-8">
              {[
                { id: 'programmes-en-cours', nav: 'actualites', label: 'Actualités' },
                { id: 'comment-ca-marche', nav: 'fonctionnement', label: 'Fonctionnement' },
                { id: 'quiz', nav: 'quiz', label: 'Quiz' },
                { id: 'formules', nav: 'formules', label: 'Formules' },
              ].map((item) => {
                const isActive = activeNavSection === item.nav;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(item.id as 'programmes-en-cours' | 'comment-ca-marche' | 'quiz' | 'formules');
                    }}
                    className={cn(
                      'group relative text-xs md:text-sm xl:text-base font-semibold leading-6 transition',
                      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        'pointer-events-none absolute -bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#4169E1] transition-all duration-300',
                        isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-80'
                      )}
                    />
                  </a>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Ouvrir le menu principal</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end gap-x-6">
                <a
                  href={ABOUT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                text-base
                font-semibold
                leading-6
                text-muted-foreground
                hover:text-foreground
              "
                >
                  Qui sommes-nous ?
                </a>

                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  title="Désactivé dans cette version partageable"
                  className="
                text-base
                font-semibold
                leading-6
                text-muted-foreground
                cursor-not-allowed
                opacity-60
              "
                >
                  Se connecter
                </button>

                <Button
                  type="button"
                  disabled
                  title="Désactivé dans cette version partageable"
                  className="
        ml-2
        rounded-full
        bg-primary
        text-primary-foreground
        px-8 py-2.5
        text-base
        font-semibold
        shadow-lg
        hover:bg-primary/90
        transition
      "
                >
                  Inscription
                </Button>
              </div>
            </div>
          </nav>

          <HeadlessDialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm" />

            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border/60">
              <div className="flex items-center justify-between">
                <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                  <Image
                    src="/Logo_final_NB_png.png?v=3"
                    alt=""
                    width={41}
                    height={32}
                    className="h-8 w-auto"
                  />
                  <span className="text-xl sm:text-2xl font-bold tracking-wide text-foreground">
                    JLOOW
                  </span>
                </a>

                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Fermer le menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-border/60">
                  <div className="space-y-2 py-6">
                    <a
                      href="#programmes-en-cours"
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToSection('programmes-en-cours');
                      }}
                      className="-mx-3 block w-full rounded-lg px-3 py-2 text-left text-base font-semibold leading-7 text-foreground hover:bg-muted"
                    >
                      Actualités
                    </a>

                    <a
                      href="#comment-ca-marche"
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToSection('comment-ca-marche');
                      }}
                      className="-mx-3 block w-full rounded-lg px-3 py-2 text-left text-base font-semibold leading-7 text-foreground hover:bg-muted"
                    >
                      Fonctionnement
                    </a>

                    <a
                      href="#quiz"
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToSection('quiz');
                      }}
                      className="-mx-3 block w-full rounded-lg px-3 py-2 text-left text-base font-semibold leading-7 text-foreground hover:bg-muted"
                    >
                      Quiz
                    </a>

                    <a
                      href="#formules"
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToSection('formules');
                      }}
                      className="-mx-3 block w-full rounded-lg px-3 py-2 text-left text-base font-semibold leading-7 text-foreground hover:bg-muted"
                    >
                      Formules
                    </a>

                    <a
                      href={ABOUT_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-muted"
                    >
                      Qui sommes-nous ?
                    </a>

                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      title="Désactivé dans cette version partageable"
                      className="-mx-3 block w-full cursor-not-allowed rounded-lg px-3 py-2 text-left text-base font-semibold leading-7 text-foreground opacity-60"
                    >
                      Se connecter
                    </button>
                  </div>

                  <div className="py-6">
                    <Button
                      type="button"
                      disabled
                      title="Désactivé dans cette version partageable"
                      className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                      style={{ padding: '0.9rem 1.2rem', fontWeight: 800 }}
                    >
                      Inscription
                    </Button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </HeadlessDialog>
        </header>

        <main className="relative flex-grow">
          <section id="home" className="relative min-h-[100svh] scroll-mt-12 flex items-stretch overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/hero-section-1.png"
                alt="Professionnels échangeant dans un lounge élégant"
                fill
                className="object-cover object-[center_top]"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/92 via-background/68 to-background/72" />
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full bg-gradient-to-br from-[#8A2BE2]/20 to-transparent blur-3xl animate-jloow-float"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 top-72 h-80 w-80 rounded-full bg-gradient-to-br from-[#4169E1]/20 to-transparent blur-3xl animate-jloow-float-slow"
            />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full flex flex-col">
              <div className="pt-16 sm:pt-18 lg:pt-20 flex-1 flex flex-col">
                <div className="mx-auto w-full max-w-6xl flex-1 flex flex-col">
                  <div className="flex flex-col items-end text-right">


                    <h1
                      className="mt-4 font-bold tracking-tight text-foreground"
                      style={{
                        fontSize: 'clamp(2.35rem, 5.4vw, 4.2rem)',
                        lineHeight: '1.02',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      <span
                        className="animate-jloow-fade-up block"
                        style={{
                          fontSize: 'clamp(2.75rem, 5.9vw, 4.8rem)',
                          animationDelay: '160ms',
                        }}
                      >
                        Faites du networking{' '}
                        <span className="jloow-gradient-text">une routine performante</span>
                      </span>
                    </h1>

                    <div
                      className="animate-jloow-fade-up mt-8 inline-flex items-center gap-3 rounded-full border border-border/60 bg-white/80 px-5 py-2.5 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.2)] backdrop-blur-md"
                      style={{ animationDelay: '280ms' }}
                    >
                      <span
                        aria-hidden="true"
                        className="inline-block h-1 w-8 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#4169E1]"
                      />
                      <p
                        className="font-semibold uppercase text-foreground"
                        style={{
                          fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)',
                          letterSpacing: '0.18em',
                        }}
                      >
                        Activez votre réseau. Accélérez vos résultats.
                      </p>
                    </div>

                    <div
                      className="animate-jloow-fade-up mt-8 flex items-center gap-4"
                      style={{ animationDelay: '400ms' }}
                    >
                      <Button
                        asChild
                        size="lg"
                        className="jloow-shine rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#4169E1] px-6 py-5 text-sm font-semibold text-white shadow-[0_14px_40px_-14px_rgba(91,33,182,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-14px_rgba(91,33,182,0.65)]"
                      >
                        <a
                          href="#quiz"
                          onClick={(event) => {
                            event.preventDefault();
                            scrollToSection('quiz');
                          }}
                        >
                          Commencer maintenant
                          <ArrowRight className="ml-1.5 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="mt-auto pb-10 sm:pb-12">
                    <div className="mb-6 flex justify-center">
                      <div
                        className="animate-jloow-fade-up relative inline-flex w-full max-w-5xl justify-center overflow-hidden rounded-2xl border border-white/10 px-8 py-3 text-center backdrop-blur-md"
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.55)',
                          animationDelay: '500ms',
                        }}
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                        <p
                          className="text-white whitespace-nowrap"
                          style={{
                            fontSize: 'clamp(1rem, 1.35vw, 1.18rem)',
                            lineHeight: '1.65',
                            fontStyle: 'italic',
                          }}
                        >
                          Des programmes et des rencontres 1:1 ultra-ciblées pour atteindre vos objectifs pro
                        </p>
                      </div>
                    </div>

                    <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {useCases.map((u, index) => {
                        const Icon = u.icon;
                        return (
                          <div
                            key={u.title}
                            className="animate-jloow-fade-up group relative rounded-2xl border border-border/60 bg-card/85 backdrop-blur px-5 py-4 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-card hover:shadow-[0_20px_50px_-25px_rgba(91,33,182,0.35)]"
                            style={{ animationDelay: `${560 + index * 90}ms` }}
                          >
                            <div className="flex h-full items-start gap-3">

                              <div className="min-w-0">
                                <div className="text-sm font-semibold text-foreground leading-tight">
                                  {u.title}
                                </div>
                                <div className="mt-1 text-xs sm:text-sm text-muted-foreground leading-snug">
                                  {u.desc}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="programmes-en-cours" className="relative min-h-[100svh] scroll-mt-12 flex items-stretch overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(250,248,255,0.92)_0%,rgba(255,255,255,0.98)_100%)]" />
            <div className="pointer-events-none absolute left-10 top-16 -z-10 h-56 w-56 rounded-full bg-[#8A2BE2]/10 blur-3xl animate-jloow-float" />
            <div className="pointer-events-none absolute bottom-10 right-10 -z-10 h-64 w-64 rounded-full bg-[#4169E1]/10 blur-3xl animate-jloow-float-slow" />

            <div className="mx-auto flex w-full max-w-7xl flex-col justify-center px-6 pb-14 pt-16 sm:pb-16 sm:pt-20 lg:px-8">
              <Reveal className="mx-auto max-w-3xl text-center">
                <h2
                  className="font-bold text-foreground"
                  style={{
                    fontSize: 'clamp(2.2rem, 3.6vw, 3.15rem)',
                    lineHeight: '1.15',
                  }}
                >
                  Programmes <span className="jloow-gradient-text">en cours</span>
                </h2>
                <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#4169E1]" />

              </Reveal>

              <Reveal className="mx-auto mt-8 flex w-full max-w-7xl items-center gap-3 lg:gap-5" direction="up" delay={80}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPreviousCurrentProgram}
                  aria-label="Programme précédent"
                  className="hidden rounded-full border-border/70 bg-white/80 px-5 shadow-sm backdrop-blur transition hover:border-primary/40 hover:bg-white hover:shadow-md lg:inline-flex"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>

                <div className="relative w-full overflow-hidden rounded-[2rem] border border-border/60 bg-card/85 p-6 shadow-[0_24px_80px_-40px_hsl(var(--foreground)/0.24)] sm:p-8 lg:p-10">
                  <div className="pointer-events-none absolute -top-20 right-0 h-48 w-48 rounded-full bg-gradient-to-tr from-[#8A2BE2]/18 to-[#4169E1]/18 blur-3xl animate-jloow-float" />
                  <div className="pointer-events-none absolute -bottom-24 -left-10 h-52 w-52 rounded-full bg-gradient-to-tr from-[#4169E1]/12 to-[#8A2BE2]/12 blur-3xl animate-jloow-float-slow" />

                  <div
                    key={activeCurrentProgramData.key}
                    className={[
                      'jloow-swap relative grid grid-cols-1 gap-6',
                      activeCurrentProgramData.partnerImages || activeCurrentProgramData.hideImage
                        ? ''
                        : 'lg:grid-cols-[1fr_1fr] lg:items-stretch',
                    ].join(' ')}
                  >
                    {activeCurrentProgramData.partnerImages || activeCurrentProgramData.hideImage ? null : (
                      <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-border/60 bg-card/80 sm:min-h-[360px]">
                        <Image
                          src={activeCurrentProgramData.imageSrc}
                          alt={activeCurrentProgramData.imageAlt}
                          fill
                          className="rounded-[inherit] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                      </div>
                    )}

                    <div
                      className={[
                        'flex flex-col overflow-y-auto rounded-3xl border border-border/60 bg-background/75 p-5 sm:p-6',
                        activeCurrentProgramData.partnerImages || activeCurrentProgramData.hideImage
                          ? 'h-[600px] sm:h-[620px] lg:h-[640px] xl:h-[660px]'
                          : 'min-h-[320px] sm:min-h-[360px]',
                      ].join(' ')}
                    >
                      <div>
                        <h3 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                          {activeCurrentProgramData.title}
                        </h3>
                        <p className="mt-3.5 whitespace-nowrap text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {activeCurrentProgramData.description}
                        </p>
                        {activeCurrentProgramData.footnote ? (
                          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                            {activeCurrentProgramData.footnote}
                          </p>
                        ) : null}
                        {activeCurrentProgramData.presentationSections ? (
                          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                            {activeCurrentProgramData.presentationSections.map((section) => (
                              <div key={section.title}>
                                <p className="text-sm font-semibold text-foreground">{section.title}</p>
                                {section.paragraphs?.map((paragraph) => (
                                  <p
                                    key={paragraph}
                                    className="mt-2.5 text-sm leading-relaxed text-muted-foreground"
                                  >
                                    {renderCurrentProgramText(paragraph)}
                                  </p>
                                ))}
                                {section.items.length > 0 ? (
                                  <ul className="mt-2.5 space-y-2">
                                    {section.items.map((item) => (
                                      <li key={item} className="flex gap-2.5">
                                        <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                                          <CheckCircle className="h-4 w-4 text-primary" />
                                        </span>
                                        <span className="text-sm leading-relaxed text-muted-foreground">
                                          {renderCurrentProgramText(item)}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : null}
                                {section.image ? (
                                  section.image.href ? (
                                    <Link
                                      href={section.image.href}
                                      aria-label={`Ouvrir la présentation : ${section.image.label}`}
                                      className="relative mt-3 block h-24 overflow-hidden rounded-2xl border border-border/60 bg-card/80 transition hover:border-primary/40 sm:h-28 lg:h-32"
                                    >
                                      <Image
                                        src={section.image.src}
                                        alt={section.image.alt}
                                        fill
                                        className={[
                                          'pointer-events-none rounded-[inherit] object-cover',
                                          section.image.src === '/evenement-dany-dubray.png' ? 'object-[center_top]' : '',
                                        ].join(' ')}
                                      />
                                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                                      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-black px-3 py-2 text-center">
                                        <p className="text-xs font-semibold leading-tight text-white sm:text-sm">
                                          {section.image.label}
                                        </p>
                                      </div>
                                    </Link>
                                  ) : (
                                    <div className="relative mt-3 h-24 overflow-hidden rounded-2xl border border-border/60 bg-card/80 sm:h-28 lg:h-32">
                                      <Image
                                        src={section.image.src}
                                        alt={section.image.alt}
                                        fill
                                        className={[
                                          'pointer-events-none rounded-[inherit] object-cover',
                                          section.image.src === '/evenement-dany-dubray.png' ? 'object-[center_top]' : '',
                                        ].join(' ')}
                                      />
                                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                                      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-black px-3 py-2 text-center">
                                        <p className="text-xs font-semibold leading-tight text-white sm:text-sm">
                                          {section.image.label}
                                        </p>
                                      </div>
                                    </div>
                                  )
                                ) : null}
                                {section.title.startsWith('Le principe') ? (
                                  <ul className="mt-2.5 space-y-2">
                                    {activeCurrentProgramData.bullets.map((bullet) => (
                                      <li key={bullet} className="flex gap-2.5">
                                        <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                                          <ArrowRight className="h-4 w-4 text-primary" />
                                        </span>
                                        <span className="text-sm leading-relaxed text-muted-foreground">
                                          {renderCurrentProgramText(bullet)}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      {activeCurrentProgramData.presentationSections ? null : (
                        <ul className="mt-3 space-y-2">
                          {activeCurrentProgramData.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-3">
                              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                                <ArrowRight className="h-4 w-4 text-primary" />
                              </span>
                              <span className="text-sm leading-relaxed text-muted-foreground">
                                {renderCurrentProgramText(bullet)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {activeCurrentProgramData.partnerImages ? (
                        <div className="mt-4">
                          <p className="text-sm font-semibold text-foreground">Evénements partenaires</p>
                          <div className="mt-2.5 grid grid-cols-2 gap-3">
                            {activeCurrentProgramData.partnerImages.map((image) => {
                              const imageContent = (
                                <>
                                  <Image src={image.src} alt={image.alt} fill className="pointer-events-none rounded-[inherit] object-cover" />
                                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                                  {image.label ? (
                                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-black px-3 py-2 text-center">
                                      <p className="text-xs font-semibold leading-tight text-white sm:text-sm">
                                        {image.label}
                                      </p>
                                    </div>
                                  ) : null}
                                </>
                              );

                              return image.href ? (
                                <Link
                                  key={image.src}
                                  href={image.href}
                                  aria-label={`Ouvrir la présentation : ${image.label}`}
                                  className="relative block h-24 overflow-hidden rounded-2xl border border-border/60 bg-card/80 transition hover:border-primary/40 sm:h-28 lg:h-32"
                                >
                                  {imageContent}
                                </Link>
                              ) : (
                                <div
                                key={image.src}
                                className="relative h-24 overflow-hidden rounded-2xl border border-border/60 bg-card/80 sm:h-28 lg:h-32"
                              >
                                  {imageContent}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={goToNextCurrentProgram}
                  aria-label="Programme suivant"
                  className="hidden rounded-full border-border/70 bg-white/80 px-5 shadow-sm backdrop-blur transition hover:border-primary/40 hover:bg-white hover:shadow-md lg:inline-flex"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Reveal>

              <div className="mx-auto mt-6 flex w-full max-w-7xl items-center justify-center gap-2">
                {currentPrograms.map((program, index) => {
                  const isActive = index === activeCurrentProgram;
                  return (
                    <button
                      type="button"
                      key={program.key}
                      aria-label={`Aller au programme ${index + 1}`}
                      onClick={() => setActiveCurrentProgram(index)}
                      className={cn(
                        'h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
                        isActive
                          ? 'w-8 bg-gradient-to-r from-[#8A2BE2] to-[#4169E1] shadow-[0_4px_12px_-4px_rgba(91,33,182,0.5)]'
                          : 'w-2 bg-primary/25 hover:bg-primary/40'
                      )}
                    />
                  );
                })}
              </div>

              <div className="mx-auto mt-4 flex w-full max-w-7xl items-center justify-center gap-3 lg:hidden">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPreviousCurrentProgram}
                  className="rounded-full border-border/70 bg-white/80 px-5 shadow-sm backdrop-blur"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToNextCurrentProgram}
                  className="rounded-full border-border/70 bg-white/80 px-5 shadow-sm backdrop-blur"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>

          <section id="comment-ca-marche" className="relative min-h-[100svh] scroll-mt-12 flex items-stretch overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,246,255,0.94)_100%)]" />
              <div className="absolute -top-20 right-1/4 h-64 w-64 rounded-full bg-[#8A2BE2]/8 blur-3xl animate-jloow-float" />
              <div className="absolute bottom-10 left-1/4 h-72 w-72 rounded-full bg-[#4169E1]/8 blur-3xl animate-jloow-float-slow" />
            </div>

            <div className="mx-auto flex w-full max-w-7xl flex-col justify-center px-6 pb-14 pt-16 sm:pb-16 sm:pt-20 lg:px-8">
              <Reveal className="mx-auto max-w-3xl text-center">
                <h2
                  className="font-bold text-foreground scroll-mt-24"
                  style={{
                    fontSize: 'clamp(2.2rem, 3.6vw, 3.15rem)',
                    lineHeight: '1.15',
                  }}
                >
                  Comment <span className="jloow-gradient-text">ça marche</span>&nbsp;?
                </h2>
                <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#4169E1]" />
                <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                  Trois étapes simples pour transformer votre networking en routine performante.
                </p>
              </Reveal>

              <div className="mt-10 mx-auto w-full max-w-6xl">
                <Reveal className="flex justify-center px-2 sm:px-4" direction="up" delay={80}>
                  <div className="relative z-10 inline-flex items-center gap-1 rounded-2xl border border-border/60 bg-white/80 p-1 shadow-sm backdrop-blur">
                    {pillars.map((p, pIndex) => {
                      const Icon = p.icon;
                      const isActive = p.key === activePillar;

                      return (
                        <button
                          key={p.key}
                          type="button"
                          onClick={() => setActivePillar(p.key)}
                          className={[
                            'relative inline-flex items-center gap-2',
                            'px-4 py-2 text-sm font-semibold',
                            'rounded-xl transition-all duration-300',
                            'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
                            isActive ? 'text-white' : 'text-muted-foreground hover:text-foreground',
                          ].join(' ')}
                        >
                          {isActive && (
                            <>
                              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#8A2BE2] to-[#4169E1] shadow-[0_8px_24px_-10px_rgba(91,33,182,0.6)]" />
                              <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#8A2BE2]/30 to-[#4169E1]/30 blur-md" />
                            </>
                          )}

                          <span className="relative inline-flex items-center gap-2">
                            <span className={cn(
                              'inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold tabular-nums transition',
                              isActive ? 'bg-white/25 text-white' : 'bg-primary/10 text-primary'
                            )}>
                              {pIndex + 1}
                            </span>
                            <Icon className="h-4 w-4" />
                            <span className="hidden sm:inline">{p.title.replace(/^\d+\.\s*/, '')}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </Reveal>

                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                  <div
                    key={`pillar-text-${activePillar}`}
                    className="jloow-swap relative min-h-[320px] sm:min-h-[340px] lg:min-h-[360px] overflow-hidden rounded-3xl bg-white/85 border border-border/60 p-6 sm:p-8 shadow-[0_20px_80px_-40px_hsl(var(--foreground)/0.2)]"
                  >
                    <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-tr from-[#8A2BE2]/25 to-[#4169E1]/25 blur-2xl animate-jloow-float" />
                    <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-gradient-to-tr from-[#4169E1]/18 to-[#8A2BE2]/18 blur-2xl animate-jloow-float-slow" />

                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="inline-flex items-center gap-2">
                            <span className="text-6xl font-bold leading-none jloow-gradient-text">
                              {activePillarData.title.split('.')[0]}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                Étape
                              </span>
                              <span className="text-sm font-semibold text-foreground">
                                {activePillarData.title.replace(/^\d+\.\s*/, '')}
                              </span>
                            </div>
                          </div>
                          <h3 className="mt-4 text-xl sm:text-2xl font-bold text-foreground">
                            {activePillarData.tagline}
                          </h3>
                          <div className="mt-3 h-px w-24 bg-gradient-to-r from-[#8A2BE2]/60 to-[#4169E1]/60" />
                        </div>
                      </div>

                      <ul className="mt-5 space-y-3 text-foreground">
                        {activePillarData.bullets.map((b, bIndex) => (
                          <li
                            key={b}
                            className="animate-jloow-fade-up flex gap-3"
                            style={{ animationDelay: `${120 + bIndex * 100}ms` }}
                          >
                            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8A2BE2] to-[#4169E1] text-white shadow-sm shadow-primary/20">
                              <CheckCircle className="h-3.5 w-3.5" />
                            </span>
                            <span className="text-sm sm:text-base leading-relaxed">
                              {renderPillarBulletText(b)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    key={`pillar-image-${activePillar}`}
                    className="jloow-swap group relative min-h-[320px] overflow-hidden border border-border/60 bg-card/80 shadow-[0_20px_80px_-40px_hsl(var(--foreground)/0.2)]"
                    style={{
                      borderRadius: '1.5rem',
                      clipPath: 'inset(0 round 1.5rem)',
                    }}
                  >
                    <Image
                      src={activePillarImage.src}
                      alt={activePillarImage.alt}
                      fill
                      className={cn(activePillarImage.className, 'transition-transform duration-700 group-hover:scale-105')}
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      priority={false}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent"
                      style={{ borderRadius: 'inherit' }}
                    />
                    <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/75 px-4 py-3 shadow-lg backdrop-blur">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                        {activePillarData.title}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold leading-tight text-foreground">
                        {activePillarData.tagline}
                      </p>
                    </div>
                  </div>

                  {/*
                  <div className="relative overflow-hidden rounded-3xl bg-card/70 ring-1 ring-border/60 p-6 sm:p-8">
                    <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-gradient-to-tr from-[#4169E1]/30 to-[#8A2BE2]/30 blur-2xl" />

                    <div className="relative">
                      <p className="text-sm font-semibold text-muted-foreground">En pratique</p>
                      <h4 className="mt-2 text-lg sm:text-xl font-bold text-foreground">
                        Un networking qui débouche sur du concret
                      </h4>

                      <div className="mt-6 grid grid-cols-1 gap-4">
                        <div className="rounded-2xl bg-muted/60 ring-1 ring-border/60 p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-foreground">
                              <UsersRound className="h-5 w-5 text-muted-foreground" />
                              <span className="font-semibold">Rencontres pertinentes</span>
                            </div>
                            <span className="text-xs text-muted-foreground">avant l’événement</span>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            Jloow prépare les meilleurs échanges à partir de ce que vous cherchez et proposez.
                          </p>
                        </div>

                        <div className="rounded-2xl bg-muted/60 ring-1 ring-border/60 p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-foreground">
                              <CalendarDays className="h-5 w-5 text-muted-foreground" />
                              <span className="font-semibold">Planning simple</span>
                            </div>
                            <span className="text-xs text-muted-foreground">pendant</span>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            Plusieurs tours de rencontres courtes pour maximiser l’impact, sans perdre de temps.
                          </p>
                        </div>

                        <div className="rounded-2xl bg-muted/60 ring-1 ring-border/60 p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-foreground">
                              <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
                              <span className="font-semibold">Plans d’action</span>
                            </div>
                            <span className="text-xs text-muted-foreground">après</span>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            Retrouvez vos décisions, suivez vos actions et restez en contact avec les bonnes personnes.
                          </p>
                        </div>
                      </div>

                      <p className="mt-6 text-xs text-muted-foreground">
                        * Pas besoin de tout faire d’un coup : vous pouvez venir pour affiner votre profil, participer à un événement, ou suivre vos actions.
                      </p>
                    </div>
                  </div>
                  */}
                </div>

                <div className="mx-auto mt-5 w-full max-w-6xl">
                  <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-3">
                    {bottomItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = item.key === activePillar;
                      return (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => setActivePillar(item.key)}
                          className={[
                            'group relative',
                            'h-full min-h-[72px] rounded-2xl border border-border/60 bg-card/60 backdrop-blur',
                            'px-4 py-3',
                            'text-left',
                            'transition',
                            isActive
                              ? 'bg-card border-primary/30 shadow-[0_18px_50px_-28px_rgba(91,33,182,0.5)]'
                              : 'hover:bg-card hover:border-border',
                            'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
                          ].join(' ')}
                        >
                          <span
                            className={[
                              'absolute inset-0 rounded-2xl transition',
                              isActive
                                ? 'bg-gradient-to-r from-[#8A2BE2]/14 to-[#4169E1]/14'
                                : 'bg-gradient-to-r from-[#8A2BE2]/0 to-[#4169E1]/0 group-hover:from-[#8A2BE2]/8 group-hover:to-[#4169E1]/8',
                            ].join(' ')}
                          />
                          <span className="relative flex h-full items-center gap-3">
                            <span
                              className={[
                                'inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 transition',
                                isActive
                                  ? 'bg-primary/10 ring-primary/20'
                                  : 'bg-muted/60 ring-border/60',
                              ].join(' ')}
                            >
                              <Icon
                                className={[
                                  'h-5 w-5 transition',
                                  isActive
                                    ? 'text-primary'
                                    : 'text-muted-foreground group-hover:text-foreground',
                                ].join(' ')}
                              />
                            </span>

                            <span className="text-sm sm:text-base font-semibold text-foreground leading-tight whitespace-nowrap">
                              {item.title}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="quiz" aria-label="Bénéfices" className="relative min-h-[100svh] scroll-mt-24 sm:scroll-mt-28 flex items-stretch overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(138,43,226,0.08),_transparent_42%),linear-gradient(180deg,rgba(248,246,255,0.98)_0%,rgba(242,247,255,0.94)_100%)]" />
              <div className="absolute -top-10 right-10 h-48 w-48 rounded-full bg-[#8A2BE2]/10 blur-3xl animate-jloow-float" />
              <div className="absolute bottom-10 left-10 h-56 w-56 rounded-full bg-[#4169E1]/10 blur-3xl animate-jloow-float-slow" />
            </div>
            <div className="mx-auto flex w-full max-w-7xl flex-col justify-center px-6 pb-12 pt-16 sm:pb-16 sm:pt-20 lg:px-8">
              <div className="pt-8 sm:pt-10">
                <Reveal className="mx-auto max-w-3xl text-center">
                  <h2
                    className="font-bold text-foreground lg:whitespace-nowrap"
                    style={{
                      fontSize: 'clamp(1.95rem, 3vw, 2.7rem)',
                      lineHeight: '1.15',
                    }}
                  >
                    Découvrez si <span className="jloow-gradient-text">JLOOW vous correspond</span>
                  </h2>
                  <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#4169E1]" />
                  <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Répondez au quiz suivant pour vérifier la pertinence de la solution Jloow et vous inscrire
                  </p>
                </Reveal>

                <div className="mx-auto mt-8 grid w-full max-w-6xl grid-cols-1 gap-4 lg:grid-cols-3">
                  {quizItems.map((item, index) => {
                    const selectedAnswer = quizAnswers[index];
                    const isAnswered = Boolean(selectedAnswer);

                    return (
                      <Reveal
                        key={item.question}
                        delay={index * 120}
                        direction="up"
                      >
                        <div
                          className={cn(
                            'jloow-glow-border group relative h-full overflow-hidden rounded-3xl border bg-white/90 p-6 shadow-[0_20px_80px_-40px_hsl(var(--foreground)/0.18)] transition-all duration-300',
                            isAnswered
                              ? 'border-primary/40 shadow-[0_24px_60px_-28px_rgba(91,33,182,0.35)]'
                              : 'border-border/60 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_28px_70px_-28px_rgba(91,33,182,0.3)]'
                          )}
                        >
                          <div className="absolute -top-20 -right-16 h-40 w-40 rounded-full bg-gradient-to-tr from-[#8A2BE2]/15 to-[#4169E1]/15 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />
                          {isAnswered ? (
                            <div className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-gradient-to-tr from-emerald-400/20 to-primary/10 blur-2xl" />
                          ) : null}

                          <div className="relative">
                            <div className="flex items-center justify-between">
                              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#8A2BE2] to-[#4169E1] text-[10px] font-bold text-white">
                                  {index + 1}
                                </span>
                                Question {index + 1}
                              </div>
                              {isAnswered ? (
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                  <CheckCircle className="h-3.5 w-3.5" />
                                </span>
                              ) : null}
                            </div>
                            <h3 className="mt-4 text-xl font-semibold leading-snug text-foreground">
                              {item.question}
                            </h3>

                            <div className="mt-5 space-y-2">
                              {item.options.map((option) => {
                                const isSelected = selectedAnswer === option;

                                return (
                                  <button
                                    key={option}
                                    type="button"
                                    onClick={() =>
                                      setQuizAnswers((current) => ({
                                        ...current,
                                        [index]: option,
                                      }))
                                    }
                                    className={cn(
                                      'relative w-full overflow-hidden rounded-2xl border px-4 py-3 text-left text-sm font-medium leading-relaxed transition-all duration-200',
                                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
                                      isSelected
                                        ? 'border-primary/50 bg-gradient-to-r from-primary/15 to-primary/5 text-foreground shadow-sm'
                                        : 'border-border/60 bg-white/70 text-muted-foreground hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white hover:text-foreground hover:shadow-sm'
                                    )}
                                  >
                                    <span className="relative flex items-center gap-2">
                                      <span
                                        className={cn(
                                          'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition',
                                          isSelected
                                            ? 'border-primary bg-primary text-white'
                                            : 'border-border bg-white'
                                        )}
                                      >
                                        {isSelected ? <CheckCircle className="h-3 w-3" /> : null}
                                      </span>
                                      <span>{option}</span>
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>

                <div className="mx-auto mt-6 w-full max-w-6xl">
                  <Reveal
                    className={cn(
                      'relative overflow-hidden rounded-3xl border px-5 py-4 sm:px-6 sm:py-5 backdrop-blur transition-colors duration-500',
                      quizQualification.tone === 'warning'
                        ? 'border-amber-300/60 bg-amber-50/85'
                        : quizQualification.tone === 'reserved'
                          ? 'border-sky-300/60 bg-sky-50/85'
                          : quizQualification.tone === 'success'
                            ? 'border-emerald-300/60 bg-emerald-50/85'
                            : 'border-border/60 bg-white/85'
                    )}
                    direction="up"
                    delay={140}
                  >
                    {quizQualification.tone === 'success' ? (
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-primary/10 to-sky-400/10" />
                    ) : null}
                    <div className="relative">
                      <div className="mb-3 flex items-center justify-center gap-2">
                        {quizItems.map((_, index) => {
                          const isAnswered = Boolean(quizAnswers[index]);

                          return (
                            <span
                              key={`quiz-progress-${index}`}
                              className={cn(
                                'h-2 rounded-full border transition-all duration-300',
                                isAnswered
                                  ? 'w-8 border-transparent bg-gradient-to-r from-[#8A2BE2] to-[#4169E1] shadow-[0_0_0_4px_rgba(91,33,182,0.12)]'
                                  : 'w-3 border-[#D9CCFF] bg-[#EFE8FF]'
                              )}
                              aria-hidden="true"
                            />
                          );
                        })}
                      </div>

                      {!isQuizComplete && answeredQuizCount === 0 ? (
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground text-center">
                          Commencez par une première question pour voir votre profil se dessiner
                        </p>
                      ) : !isQuizComplete ? (
                        <div className="jloow-swap text-center">
                          <h3 className="text-lg font-semibold text-foreground">
                            {quizQualification.title}
                          </h3>
                          <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                            {quizQualification.message}
                          </p>
                          <p className="mt-2 text-xs sm:text-sm font-medium text-foreground">
                            <AnimatedCounter value={answeredQuizCount} /> réponse{answeredQuizCount > 1 ? 's' : ''} sur {quizItems.length}
                          </p>
                        </div>
                      ) : (
                        <div className="jloow-swap text-center">
                          <div className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                            <Sparkles className="h-3 w-3" />
                            Résultat
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {quizQualification.title}
                          </h3>
                          <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                            {quizQualification.message}
                          </p>
                        </div>
                      )}

                      {!isQuizComplete ? null : quizQualification.tone === 'success' ||
                        quizQualification.tone === 'reserved' ? (
                        <div className="mt-4 flex justify-center">
                          <Button
                            type="button"
                            disabled
                            title="Désactivé dans cette version partageable"
                            className="jloow-shine rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#4169E1] px-6 py-5 text-base font-semibold shadow-[0_18px_50px_-20px_rgba(91,33,182,0.55)] transition hover:-translate-y-0.5"
                          >
                            Poursuivre le quiz
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>

          <section id="formules" className="relative scroll-mt-12 overflow-hidden py-20 sm:py-24">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(246,244,255,0.98)_100%)]" />
            <div className="absolute -top-16 left-16 -z-10 h-56 w-56 rounded-full bg-[#8A2BE2]/8 blur-3xl animate-jloow-float" />
            <div className="absolute bottom-0 right-10 -z-10 h-64 w-64 rounded-full bg-[#4169E1]/8 blur-3xl animate-jloow-float-slow" />

            <div className="mx-auto flex w-full max-w-7xl flex-col justify-center px-6 pb-12 pt-16 sm:pb-16 sm:pt-20 lg:px-8">
              <Reveal className="mx-auto max-w-4xl text-center">
                <h2
                  className="text-center font-bold text-foreground"
                  style={{
                    fontSize: 'clamp(2rem, 3.4vw, 3rem)',
                    lineHeight: '1.12',
                  }}
                >
                  Choisissez la formule <span className="jloow-gradient-text">qui vous convient</span>
                </h2>
                <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#4169E1]" />
              </Reveal>

              <Reveal className="mx-auto mt-8 flex w-full max-w-4xl items-center justify-center gap-2 sm:gap-3" direction="up" delay={80}>
                {formulas.map((formula, index) => {
                  const isActive = index === activeFormula;
                  return (
                    <button
                      key={formula.key}
                      type="button"
                      onClick={() => setActiveFormula(index)}
                      className={cn(
                        'relative overflow-hidden rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
                        isActive
                          ? 'text-primary-foreground shadow-[0_12px_28px_-12px_rgba(91,33,182,0.55)]'
                          : 'bg-white text-muted-foreground ring-1 ring-border/60 hover:-translate-y-0.5 hover:text-foreground hover:shadow-sm'
                      )}
                    >
                      {isActive && (
                        <>
                          <span className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#4169E1]" />
                          <span className="absolute -inset-1 bg-gradient-to-r from-[#8A2BE2]/40 to-[#4169E1]/40 blur-md" />
                        </>
                      )}
                      <span className="relative">{formula.label}</span>
                    </button>
                  );
                })}
              </Reveal>

              <div className="mx-auto mt-6 w-full max-w-5xl min-w-0">
                <div
                  key={activeFormulaData.key}
                  className="jloow-swap relative flex min-h-[760px] w-full min-w-0 flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-card/85 p-5 shadow-[0_24px_80px_-40px_hsl(var(--foreground)/0.24)] sm:min-h-[650px] sm:p-6 lg:min-h-[640px]"
                >
                  <div className="absolute -top-20 right-0 h-48 w-48 rounded-full bg-gradient-to-tr from-[#8A2BE2]/18 to-[#4169E1]/18 blur-3xl animate-jloow-float" />
                  <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-gradient-to-tr from-[#4169E1]/14 to-[#8A2BE2]/14 blur-3xl animate-jloow-float-slow" />

                  <div className="relative flex min-w-0 flex-1 flex-col gap-3">
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">
                        <span>{activeFormulaData.eyebrow.replace(activeFormulaData.focusLabel.toLowerCase(), '').trim()}</span>
                        <span className="rounded-lg border border-primary/25 bg-primary/10 px-2.5 py-1 text-primary">
                          {activeFormulaData.focusLabel}
                        </span>
                      </p>
                      <div className="mt-3 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
                        {activeFormulaData.highlights.map((highlight, highlightIndex) => (
                          <div
                            key={`${activeFormulaData.key}-${highlight.label || 'highlight'}-${highlightIndex}`}
                            className={[
                              'relative overflow-hidden rounded-2xl border px-4 py-3.5 min-h-[148px] sm:min-h-[176px]',
                              typeof highlight.value === 'object' && !Array.isArray(highlight.value)
                                ? 'border-white/20'
                                : 'border-border/60 bg-slate-900',
                            ].join(' ')}
                          >
                            {typeof highlight.value === 'object' && !Array.isArray(highlight.value) ? (
                              <>
                                <Image
                                  src={
                                    highlightIndex === 0
                                      ? activeFormulaData.key === 'smart-match-perso'
                                        ? '/formules-smart-match-perso-module.png'
                                        : activeFormulaData.key === 'smart-match-corpo'
                                          ? '/formules-smart-match-corpo-module.png'
                                          : '/formules-programme-principal.png'
                                      : activeFormulaData.key === 'smart-match-corpo'
                                        ? '/formules-smart-match-corpo-evenements.png'
                                        : '/formules-evenements-partenaires.png'
                                  }
                                  alt={highlightIndex === 0 ? 'Illustration des drops' : 'Illustration des événements'}
                                  fill
                                  className="rounded-[inherit] object-cover"
                                />
                                <div className="absolute inset-0 bg-black/45" />
                              </>
                            ) : null}
                            <div className="relative z-10 flex h-full flex-col">
                            {highlight.label ? (
                              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                                {highlight.label}
                              </p>
                            ) : null}
                            {typeof highlight.value === 'object' && !Array.isArray(highlight.value) ? (
                              <div className={[highlight.label ? 'mt-1' : '', 'flex h-full flex-col justify-between'].join(' ')}>
                                <div className="flex items-center justify-between gap-3">
                                  <p className="text-xs sm:text-sm font-semibold text-white">
                                    {renderDropLabel(highlight.value.primary)}
                                  </p>
                                  {'aside' in highlight.value && typeof highlight.value.aside === 'string' ? (
                                    highlight.value.aside === 'Sur mesure' ? (
                                      <p className="text-xs sm:text-sm italic font-normal text-white">
                                        {highlight.value.aside}
                                      </p>
                                    ) : (
                                      <p className="text-xs sm:text-sm font-semibold text-white">
                                        {renderDropLabel(highlight.value.aside)}
                                      </p>
                                    )
                                  ) : null}
                                </div>
                                <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
                                  {highlight.value.secondary.map((line) => (
                                    <div key={line} className="flex items-center gap-2">
                                      <CheckCircle className="h-4 w-4 text-white" />
                                      <p className="text-sm leading-relaxed text-white/90">{renderDropLabel(line)}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : Array.isArray(highlight.value) ? (
                              <div className="mt-1 space-y-1">
                                {highlight.value.map((line) => (
                                  <p key={line} className="text-sm sm:text-base font-semibold text-white">
                                    {line}
                                  </p>
                                ))}
                              </div>
                            ) : (
                              <p className="mt-1 text-sm sm:text-base font-semibold text-white">
                                {highlight.value}
                              </p>
                            )}
                            </div>
                          </div>
                        ))}
                      </div>
                      {activeFormulaData.key === 'grand-match' ||
                      activeFormulaData.key === 'smart-match-perso' ||
                      activeFormulaData.key === 'smart-match-corpo' ? (
                        <div className="mt-2.5 min-h-[56px] space-y-1 px-1 text-[11px] leading-relaxed text-muted-foreground sm:min-h-[68px] lg:min-h-[56px]">
                          <p>
                            <sup className="mr-1 text-[0.8em] align-super">1</sup>
                            {activeFormulaData.key === 'smart-match-corpo'
                              ? 'Propositions de mise en relation ultra qualifiée, générée par l’IA pour chaque participant, et directement exploitable.'
                              : 'Proposition de mise en relation ultra qualifiée, générée par l’IA pour chaque participant, et directement exploitable.'}
                          </p>
                          {activeFormulaData.key === 'smart-match-corpo' ? null : (
                            <p>
                              <sup className="mr-1 text-[0.8em] align-super">2</sup>
                              Le nombre de drops proposés dépend du nombre de participants inscrits à l&apos;événement :
                              il peut varier de 2 pour 20 participants à 6 pour 60 participants ou plus.
                            </p>
                          )}
                        </div>
                      ) : null}
                      <div className="mt-4 min-h-[220px] sm:min-h-[160px] lg:min-h-[140px]">
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                          {renderFormulaDescription(activeFormulaData.description)}
                        </p>
                        {activeFormulaPartnerCta ? (
                          <p className="mb-3 mt-3 text-sm font-semibold text-primary">
                            <span className="mr-1" aria-hidden="true">
                              {activeFormulaPartnerCta.icon}
                            </span>
                            <a href={activeFormulaPartnerCta.href} className="underline underline-offset-4">
                              {activeFormulaPartnerCta.label}
                            </a>
                          </p>
                        ) : null}
                      </div>

                      {activeFormulaData.key === 'grand-match' ||
                      activeFormulaData.key === 'smart-match-perso' ||
                      activeFormulaData.key === 'smart-match-corpo' ? (
                        <div className="mt-4.5 flex min-h-[38px] items-center overflow-hidden rounded-2xl border border-sky-200/70 bg-sky-50 py-2 sm:min-h-[42px] lg:min-h-[36px]">
                          <div className="grand-match-marquee flex w-max items-center">
                            {[0, 1].map((groupIndex) => (
                              <div key={groupIndex} className="flex shrink-0 items-center">
                                {activeFormulaData.bullets.map((bullet, index) => (
                                  <div key={`${groupIndex}-${bullet}`} className="flex items-center whitespace-nowrap">
                                    <span className="text-xs sm:text-sm leading-relaxed text-foreground">{bullet}</span>
                                    <span className="px-3 text-base font-semibold text-primary">-</span>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <ul className="mt-6 space-y-3">
                          {activeFormulaData.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-3">
                              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                                <CheckCircle className="h-4 w-4 text-primary" />
                              </span>
                              <span className="text-sm sm:text-base leading-relaxed text-foreground">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="flex h-full min-w-0 flex-col justify-end rounded-3xl bg-white/60 p-3 ring-1 ring-border/60 backdrop-blur sm:p-4">
                      <div className="flex min-w-0 items-center justify-between gap-2 sm:gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={goToPreviousFormula}
                          aria-label="Formule précédente"
                          className="shrink-0 rounded-full border-border/70 bg-white px-4 shadow-sm transition hover:border-primary/40 hover:shadow-md sm:px-5"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>

                        <div className="flex min-w-0 flex-wrap items-center justify-center gap-2">
                          {formulas.map((formula, index) => {
                            const isActive = index === activeFormula;
                            return (
                              <button
                                key={formula.key}
                                type="button"
                                aria-label={`Aller à la formule ${formula.label}`}
                                onClick={() => setActiveFormula(index)}
                                className={cn(
                                  'h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
                                  isActive
                                    ? 'w-8 bg-gradient-to-r from-[#8A2BE2] to-[#4169E1] shadow-[0_4px_12px_-4px_rgba(91,33,182,0.5)]'
                                    : 'w-2 bg-primary/25 hover:bg-primary/40'
                                )}
                              />
                            );
                          })}
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={goToNextFormula}
                          aria-label="Formule suivante"
                          className="shrink-0 rounded-full border-border/70 bg-white px-4 shadow-sm transition hover:border-primary/40 hover:shadow-md sm:px-5"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="relative z-10 pb-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mt-8 flex flex-col items-center gap-3 text-center text-xs text-muted-foreground">
              <div className="inline-flex items-center gap-2">
                <Image
                  src="/Logo_final_NB_png.png?v=3"
                  alt=""
                  width={24}
                  height={20}
                  className="h-5 w-auto opacity-80"
                />
                <span className="font-semibold text-foreground">JLOOW</span>
              </div>

              <a
                href={ABOUT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition hover:text-foreground underline underline-offset-4"
              >
                Lire l’histoire de Jloow
              </a>

              <button
                type="button"
                onClick={openMentionsLegales}
                className="text-muted-foreground transition hover:text-foreground underline underline-offset-4"
              >
                Mentions légales
              </button>

              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                <Link href="/cgu" className="text-muted-foreground transition hover:text-foreground underline underline-offset-4">
                  CGU
                </Link>
                <Link href="/cgv" className="text-muted-foreground transition hover:text-foreground underline underline-offset-4">
                  CGV
                </Link>
                <Link href="/politique-de-confidentialite" className="text-muted-foreground transition hover:text-foreground underline underline-offset-4">
                  Politique de Confidentialité
                </Link>
              </div>

              <p className="mt-2 text-[11px] text-muted-foreground/70">
                © {new Date().getFullYear()} JLOOW. Tous droits réservés.
              </p>
            </div>
          </div>
        </footer>

        <AppDialog open={isMentionsOpen} onOpenChange={setIsMentionsOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Mentions légales</DialogTitle>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto rounded-md border border-border/70 bg-muted/20 p-4">
              {isMentionsLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Chargement des mentions légales...
                </div>
              ) : mentionsError ? (
                <div className="space-y-3">
                  <p className="text-sm text-destructive">{mentionsError}</p>
                  <Button type="button" variant="outline" onClick={() => void loadMentionsLegales()}>
                    Réessayer
                  </Button>
                </div>
              ) : mentionsContent.trim().length === 0 ? (
                <p className="text-sm text-muted-foreground">Le document `legal/mentionslegales.md` est vide.</p>
              ) : (
                <MarkdownRenderer markdown={mentionsContent} />
              )}
            </div>
          </DialogContent>
        </AppDialog>

      </div>
    </>
  );
}
