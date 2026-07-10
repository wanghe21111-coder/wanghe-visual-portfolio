export type MediaType = "image" | "video" | "system";

export type ProjectTone = {
  primary: string;
  soft: string;
  deep: string;
};

export type ProjectSection = {
  eyebrow: string;
  title: string;
  body: string;
  points?: string[];
};

export type ProjectAsset = {
  title: string;
  caption: string;
  mediaType: MediaType;
  ratio: "wide" | "portrait" | "square";
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  type: string;
  role: string;
  keywords: string[];
  summary: string;
  cover: {
    label: string;
    mediaType: MediaType;
    tone: ProjectTone;
  };
  caseStudy: {
    overview: string;
    challenge: string;
    duration: string;
    scope: string[];
    sections: ProjectSection[];
    assets: ProjectAsset[];
  };
};

export const projects: Project[] = [
  {
    slug: "ecommerce-campaign-kv",
    title: "E-commerce Campaign KV",
    subtitle: "High-impact campaign key visual system for seasonal commerce moments.",
    year: "2026",
    type: "Campaign / Key Visual",
    role: "Visual Lead / Art Direction",
    keywords: ["KV", "Campaign", "Tmall", "Motion-ready"],
    summary:
      "A campaign visual framework designed to keep the main offer sharp while allowing category, channel, and motion extensions to scale coherently.",
    cover: {
      label: "KV",
      mediaType: "image",
      tone: {
        primary: "#c8a96a",
        soft: "rgba(200, 169, 106, 0.22)",
        deep: "rgba(200, 169, 106, 0.08)"
      }
    },
    caseStudy: {
      overview:
        "This placeholder case frames a seasonal e-commerce campaign from visual hierarchy to multi-channel deployment. Replace the mock notes with your real campaign background, metrics, and final creative later.",
      challenge:
        "The core challenge is balancing sales pressure, brand tone, product clarity, and platform rules without turning the campaign into visual noise.",
      duration: "4-6 weeks",
      scope: ["Creative direction", "KV system", "Campaign page", "Motion handoff"],
      sections: [
        {
          eyebrow: "01 / Background",
          title: "Campaign context",
          body:
            "The project starts from a compressed commerce window where the visual must communicate price rhythm, product value, and brand confidence in the first screen."
        },
        {
          eyebrow: "02 / Goal",
          title: "Make the offer legible without losing atmosphere",
          body:
            "The design goal is to establish a strong lead image, a clear promotion architecture, and reusable layout modules for product, banner, and social placements.",
          points: ["Clear hierarchy", "Premium tone", "Fast production expansion"]
        },
        {
          eyebrow: "03 / Strategy",
          title: "Build a campaign grammar",
          body:
            "Instead of a single poster, the visual is treated as a grammar: hero composition, product staging, offer scale, typography rules, and motion cues."
        },
        {
          eyebrow: "04 / Reflection",
          title: "A campaign should age into a system",
          body:
            "The most useful outcome is not one polished image, but a flexible structure that makes every downstream asset feel intentional."
        }
      ],
      assets: [
        {
          title: "Hero KV Placeholder",
          caption: "Replace with final key visual or campaign hero render.",
          mediaType: "image",
          ratio: "wide"
        },
        {
          title: "Motion Board Placeholder",
          caption: "Reserved for short motion preview, reveal study, or channel cutdown.",
          mediaType: "video",
          ratio: "wide"
        },
        {
          title: "Channel Extension Placeholder",
          caption: "Reserved for banners, detail-page modules, and social crops.",
          mediaType: "system",
          ratio: "square"
        }
      ]
    }
  },
  {
    slug: "tmall-jd-brand-visual-system",
    title: "Tmall / JD Brand Visual System",
    subtitle: "A platform-ready identity layer for e-commerce brand presence.",
    year: "2025",
    type: "Brand System / E-commerce",
    role: "System Designer / Visual Direction",
    keywords: ["Brand system", "Tmall", "JD", "Guidelines"],
    summary:
      "A modular brand visual system for commerce platforms, built to preserve recognition across stores, campaign pages, product stories, and promotional assets.",
    cover: {
      label: "SYS",
      mediaType: "system",
      tone: {
        primary: "#91a28f",
        soft: "rgba(145, 162, 143, 0.23)",
        deep: "rgba(145, 162, 143, 0.08)"
      }
    },
    caseStudy: {
      overview:
        "This placeholder case focuses on how a brand can look consistent across Tmall, JD, and campaign touchpoints while still adapting to platform constraints.",
      challenge:
        "Platform pages often fragment brand expression. The task is to create enough rules to stay consistent and enough flexibility to keep business teams moving.",
      duration: "8 weeks",
      scope: ["Store identity", "Module system", "Visual rules", "Launch templates"],
      sections: [
        {
          eyebrow: "01 / Background",
          title: "From store decoration to brand experience",
          body:
            "The work treats the commerce store as a living brand interface, not a collection of isolated banners."
        },
        {
          eyebrow: "02 / Goal",
          title: "Create recognizable consistency",
          body:
            "The system clarifies logo placement, typography rhythm, product framing, color use, image density, and component behaviors."
        },
        {
          eyebrow: "03 / Visual System",
          title: "Rules that make production faster",
          body:
            "Reusable modules are designed for hero areas, category entries, story sections, comparison blocks, and promotional mechanics.",
          points: ["Hero templates", "Product grids", "Content modules", "Promotion components"]
        },
        {
          eyebrow: "04 / Reflection",
          title: "Systems reduce aesthetic drift",
          body:
            "The result should help a brand maintain a recognizable voice even when many assets are produced by different teams over time."
        }
      ],
      assets: [
        {
          title: "Storefront System Placeholder",
          caption: "Reserved for store homepage, brand landing page, or system overview.",
          mediaType: "system",
          ratio: "wide"
        },
        {
          title: "Component Set Placeholder",
          caption: "Reserved for module library and production rules.",
          mediaType: "image",
          ratio: "square"
        },
        {
          title: "Launch Sequence Placeholder",
          caption: "Reserved for page scroll or motion handoff preview.",
          mediaType: "video",
          ratio: "wide"
        }
      ]
    }
  },
  {
    slug: "brand-identity-exploration",
    title: "Brand Identity Exploration",
    subtitle: "Identity studies for voice, symbol, material tone, and visual behavior.",
    year: "2024",
    type: "Brand Identity / Exploration",
    role: "Brand Designer / Research",
    keywords: ["Identity", "Research", "Typography", "Tone"],
    summary:
      "A set of identity explorations that translate brand strategy into visual behavior across marks, layouts, material cues, and content systems.",
    cover: {
      label: "ID",
      mediaType: "image",
      tone: {
        primary: "#789aa3",
        soft: "rgba(120, 154, 163, 0.24)",
        deep: "rgba(120, 154, 163, 0.08)"
      }
    },
    caseStudy: {
      overview:
        "This placeholder case is prepared for brand identity studies, from research notes to visual territories and systemized presentation.",
      challenge:
        "The challenge is not to make a stylish logo in isolation, but to define visual behavior that can support product, communication, and cultural meaning.",
      duration: "6 weeks",
      scope: ["Brand audit", "Visual territory", "Identity system", "Presentation design"],
      sections: [
        {
          eyebrow: "01 / Background",
          title: "Identity as behavior",
          body:
            "The identity direction is explored through tone, rhythm, material references, typography, symbol logic, and imagery rules."
        },
        {
          eyebrow: "02 / Goal",
          title: "Connect strategy and visual form",
          body:
            "The visual system should make the brand feel clear at different sizes, across different media, and under different business messages."
        },
        {
          eyebrow: "03 / Strategy",
          title: "Use constraints as creative structure",
          body:
            "The exploration narrows into repeatable rules: contrast level, grid behavior, color temperature, mark usage, and image attitude."
        },
        {
          eyebrow: "04 / Output",
          title: "A presentation-ready identity route",
          body:
            "The final case can include territory boards, lockups, applications, and narrative slides that show why the direction works."
        }
      ],
      assets: [
        {
          title: "Identity Route Placeholder",
          caption: "Reserved for identity boards, marks, and brand applications.",
          mediaType: "image",
          ratio: "wide"
        },
        {
          title: "Typography Study Placeholder",
          caption: "Reserved for type hierarchy and layout rules.",
          mediaType: "system",
          ratio: "square"
        },
        {
          title: "Material Mood Placeholder",
          caption: "Reserved for image, texture, and scene references.",
          mediaType: "image",
          ratio: "portrait"
        }
      ]
    }
  },
  {
    slug: "others",
    title: "AI, Cultural IP & Motion Experiments",
    subtitle: "Ongoing studies across regional culture, IP products, AI visuals, and motion language.",
    year: "2023-2026",
    type: "Research / IP / Motion",
    role: "Designer / Experiment Lead",
    keywords: ["Cultural IP", "AI visuals", "Motion", "Creative research"],
    summary:
      "A flexible archive for cultural IP, regional creative products, AI-assisted image workflows, and motion experiments that do not belong to a single campaign.",
    cover: {
      label: "LAB",
      mediaType: "video",
      tone: {
        primary: "#b36b52",
        soft: "rgba(179, 107, 82, 0.24)",
        deep: "rgba(179, 107, 82, 0.08)"
      }
    },
    caseStudy: {
      overview:
        "This placeholder case acts as a living lab page for works-in-progress, research fragments, IP concepts, cultural objects, and motion trials.",
      challenge:
        "Experimental work needs enough structure to be understandable while preserving the exploratory quality that made it valuable.",
      duration: "Ongoing",
      scope: ["Research", "Concept design", "AI workflow", "Motion experiments"],
      sections: [
        {
          eyebrow: "01 / Background",
          title: "Culture as a design material",
          body:
            "The research translates regional texture, craft memory, daily objects, and contemporary commerce language into new visual possibilities."
        },
        {
          eyebrow: "02 / Goal",
          title: "Turn fragments into a readable archive",
          body:
            "The page is structured so small studies, image prompts, motion loops, and object explorations can sit together without feeling unfinished."
        },
        {
          eyebrow: "03 / Method",
          title: "AI as a collaborator, not a shortcut",
          body:
            "AI-assisted visuals are documented as part of a larger workflow: reference building, prompt iteration, art direction, selection, and production finishing.",
          points: ["Reference research", "Prompt direction", "Visual editing", "Motion tests"]
        },
        {
          eyebrow: "04 / Reflection",
          title: "Experiments sharpen the commercial work",
          body:
            "The lab page shows how research and experiments can feed practical brand, commerce, and cultural IP systems."
        }
      ],
      assets: [
        {
          title: "Cultural IP Placeholder",
          caption: "Reserved for regional cultural product concepts and object studies.",
          mediaType: "image",
          ratio: "wide"
        },
        {
          title: "AI Visual Workflow Placeholder",
          caption: "Reserved for prompt boards, iterations, and selected outputs.",
          mediaType: "system",
          ratio: "square"
        },
        {
          title: "Motion Loop Placeholder",
          caption: "Reserved for motion tests, typographic movement, or campaign loops.",
          mediaType: "video",
          ratio: "wide"
        }
      ]
    }
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
