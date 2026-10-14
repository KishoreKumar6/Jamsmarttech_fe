import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SITE_URL = "https://www.jamsmarttech.com";

const pageSeo = {
  "/": {
    en: {
      title: "JAM Smart Tech | Phone, Laptop & Device Repair",
      description: "Expert phone, laptop, tablet and gaming device repairs, plus trusted electronics and device solutions from JAM Smart Tech.",
    },
    fr: {
      title: "JAM Smart Tech | Réparation de téléphones et ordinateurs",
      description: "Réparation experte de téléphones, ordinateurs, tablettes et consoles, avec des solutions fiables pour vos appareils.",
    },
  },
  "/repair": {
    en: {
      title: "Phone, Laptop & Device Repair Services | JAM Smart Tech",
      description: "Choose your device and book a professional phone, laptop, tablet or gaming device repair with JAM Smart Tech.",
    },
    fr: {
      title: "Services de réparation de téléphones et ordinateurs | JAM Smart Tech",
      description: "Choisissez votre appareil et réservez une réparation professionnelle de téléphone, ordinateur, tablette ou console.",
    },
  },
  "/shop": {
    en: {
      title: "Phones, Laptops & Electronics Shop | JAM Smart Tech",
      description: "Explore phones, laptops and reliable technology products from JAM Smart Tech.",
    },
    fr: {
      title: "Boutique de smartphones, ordinateurs et électronique | JAM Smart Tech",
      description: "Découvrez des smartphones, ordinateurs et produits technologiques fiables chez JAM Smart Tech.",
    },
  },
  "/about": {
    en: {
      title: "About JAM Smart Tech | Smart Repair, Smart Solutions",
      description: "Learn about JAM Smart Tech, our repair expertise, service promise and technology solutions.",
    },
    fr: {
      title: "À propos de JAM Smart Tech | Réparation et solutions intelligentes",
      description: "Découvrez JAM Smart Tech, notre expertise en réparation et nos solutions technologiques.",
    },
  },
  "/contact": {
    en: {
      title: "Contact JAM Smart Tech | Repair & Product Support",
      description: "Contact JAM Smart Tech for device repairs, product support, appointments and service questions.",
    },
    fr: {
      title: "Contacter JAM Smart Tech | Assistance réparation et produits",
      description: "Contactez JAM Smart Tech pour vos réparations, rendez-vous, produits et questions d'assistance.",
    },
  },
  "/faq": {
    en: {
      title: "Frequently Asked Questions | JAM Smart Tech",
      description: "Find answers about JAM Smart Tech repairs, appointments, warranties, service times and products.",
    },
    fr: {
      title: "Questions fréquentes | JAM Smart Tech",
      description: "Trouvez les réponses sur les réparations, rendez-vous, garanties, délais et produits JAM Smart Tech.",
    },
  },
};

const noIndexPrefixes = [
  "/admin",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/profile",
  "/cart",
  "/checkout",
  "/payment-success",
  "/payment-failed",
  "/track-order",
  "/track-repair",
  "/repair/booking",
  "/repair/manual-quote",
  "/repair/booking-success",
];

const getMeta = (name, attribute = "name") =>
  document.head.querySelector(`meta[${attribute}="${name}"]`);

const setMeta = (name, content, attribute = "name") => {
  let tag = getMeta(name, attribute);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, name);
    tag.dataset.jamSeo = "true";
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const setLink = (rel, href) => {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    tag.dataset.jamSeo = "true";
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
};

const Seo = ({ title: titleOverride, description: descriptionOverride, type = "website", image, structuredData }) => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const language = String(i18n.resolvedLanguage || i18n.language || "en").startsWith("fr") ? "fr" : "en";

  useEffect(() => {
    const normalizedPath = pathname !== "/" ? pathname.replace(/\/$/, "") : "/";
    const isNoIndex = noIndexPrefixes.some((prefix) => normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`));
    const seo = pageSeo[normalizedPath]?.[language] || pageSeo["/repair"][language];
    const title = titleOverride || seo.title;
    const description = descriptionOverride || seo.description;
    const canonical = `${SITE_URL}${normalizedPath === "/" ? "/" : normalizedPath}`;

    document.title = isNoIndex ? "JAM Smart Tech" : title;
    document.documentElement.lang = language;
    setMeta("description", description);
    setMeta("robots", isNoIndex ? "noindex, nofollow" : "index, follow");
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", type, "property");
    setMeta("og:url", canonical, "property");
    if (image) setMeta("og:image", image, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    if (image) setMeta("twitter:image", image);
    setLink("canonical", canonical);

    let schema = document.head.querySelector('script[data-jam-seo="organization"]');
    if (!schema) {
      schema = document.createElement("script");
      schema.type = "application/ld+json";
      schema.dataset.jamSeo = "organization";
      document.head.appendChild(schema);
    }
    const breadcrumbNames = normalizedPath.split("/").filter(Boolean).map((segment) =>
      segment.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
    );
    const breadcrumbs = [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      ...breadcrumbNames.map((name, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name,
        item: `${SITE_URL}/${normalizedPath.split("/").filter(Boolean).slice(0, index + 1).join("/")}`,
      })),
    ];

    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "JAM Smart Tech",
          url: SITE_URL,
          logo: `${SITE_URL}/icon-192.png`,
          email: "jamsmarttech@gmail.com",
          telephone: "+33768635053",
        },
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "JAM Smart Tech",
          url: SITE_URL,
          publisher: { "@id": `${SITE_URL}/#organization` },
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/shop?search={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        },
        {
          "@type": "WebPage",
          "@id": `${canonical}#webpage`,
          url: canonical,
          name: title,
          description,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          inLanguage: language,
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs,
        },
        ...(structuredData ? [{ ...structuredData, "@id": `${canonical}#${structuredData["@type"] || "entity"}` }] : []),
      ],
    });
  }, [descriptionOverride, image, language, pathname, structuredData, titleOverride, type]);

  return null;
};

export default Seo;
