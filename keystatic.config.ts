import { collection, config, fields, singleton } from "@keystatic/core";

// NOTE: this config is imported by a "use client" module (src/app/keystatic/keystatic.ts),
// so it is evaluated in BOTH the server and the browser. Next.js only inlines env vars
// prefixed with NEXT_PUBLIC_ into the client bundle — any other var is `undefined` there.
// Using a server-only var here makes the browser silently fall back to local mode while
// the server runs in github mode, which breaks the login flow entirely.
const repo = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO;

if (!repo && process.env.NODE_ENV === "production") {
  throw new Error(
    "NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO is required in production. " +
      "Keystatic's local-mode fallback exposes an unauthenticated file-write " +
      "endpoint at POST /api/keystatic/update, which is a security hole in " +
      "any deployed environment. See SECURITY.md for setup steps.",
  );
}

const githubStorage = repo
  ? { kind: "github" as const, repo: repo as `${string}/${string}` }
  : { kind: "local" as const };

export default config({
  storage: githubStorage,
  ui: {
    brand: { name: "Oreenza CMS" },
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "src/content/projects/*/",
      schema: {
        title: fields.slug({
          name: { label: "Project name" },
        }),
        index: fields.integer({
          label: "Order",
          description: "Display order on the site (1, 2, 3…)",
        }),
        industry: fields.text({ label: "Industry" }),
        year: fields.text({ label: "Year" }),
        client: fields.text({ label: "Client" }),
        liveUrl: fields.url({
          label: "Live site URL",
          description: "Shown as the Visit live site link",
        }),
        location: fields.text({
          label: "Client location",
          description: "City, Country — used in the case study hero",
        }),
        timeline: fields.text({
          label: "Timeline",
          description: "e.g. '6 weeks' — shown in case study facts",
        }),
        platform: fields.text({
          label: "Platform / stack",
          description: "e.g. 'Next.js + Keystatic', 'Shopify + Liquid'",
        }),
        problem: fields.text({
          label: "The problem",
          multiline: true,
          description: "1-2 sentences on the business pain point the client came with",
        }),
        strategy: fields.text({
          label: "The strategic solution",
          multiline: true,
          description: "1-2 sentences on why we made the design/tech choices we did",
        }),
        outcome: fields.text({
          label: "The outcome",
          multiline: true,
          description: "1-2 sentences on the qualitative result",
        }),
        metrics: fields.array(
          fields.object({
            label: fields.text({ label: "Metric label" }),
            value: fields.text({ label: "Metric value (display)" }),
            context: fields.text({
              label: "Context",
              description: "What it measures, e.g. 'organic search traffic, 90 days post-launch'",
            }),
          }),
          {
            label: "Measurable results",
            description: "Up to 4 metric cards. Estimates are fine — label them as such.",
            itemLabel: (props) => props.fields.label.value,
          },
        ),
        intro: fields.text({
          label: "Intro",
          multiline: true,
          description: "One-liner shown in the sidebar and page meta",
        }),
        description: fields.array(
          fields.text({ label: "Paragraph", multiline: true }),
          {
            label: "Description",
            itemLabel: () => "Paragraph",
          },
        ),
        services: fields.array(fields.text({ label: "Service" }), {
          label: "Services",
          itemLabel: (props) => props.value,
        }),
        cover: fields.image({
          label: "Cover",
          directory: "public/projects",
          publicPath: "/projects/",
        }),
        gallery: fields.array(
          fields.image({
            label: "Mockup",
            directory: "public/projects",
            publicPath: "/projects/",
          }),
          { label: "Mockups", itemLabel: () => "Mockup" },
        ),
      },
    }),
    blogs: collection({
      label: "Blog posts",
      slugField: "title",
      path: "src/content/blogs/*/",
      schema: {
        title: fields.slug({
          name: { label: "Post title" },
        }),
        excerpt: fields.text({
          label: "Excerpt",
          multiline: true,
          description: "Shown on the blog index and in OG meta (1-2 sentences)",
        }),
        date: fields.date({
          label: "Publish date",
          description: "Used to sort posts on the index",
        }),
        author: fields.text({
          label: "Author",
          defaultValue: "OREENZA",
        }),
        category: fields.text({
          label: "Category",
          description: "e.g. 'Design', 'SEO', 'Performance', 'Insights'",
          defaultValue: "Insights",
        }),
        readingTime: fields.text({
          label: "Reading time",
          description: "e.g. '5 min read'",
          defaultValue: "5 min read",
        }),
        cover: fields.image({
          label: "Cover",
          directory: "public/blog",
          publicPath: "/blog/",
        }),
        content: fields.array(
          fields.text({ label: "Paragraph", multiline: true }),
          {
            label: "Content",
            description: "Each entry is a paragraph. Rendered verbatim on the post page.",
            itemLabel: (props) => `${props.value.slice(0, 60)}…`,
          },
        ),
      },
    }),
    team: collection({
      label: "Team",
      slugField: "name",
      path: "src/content/team/*/",
      schema: {
        name: fields.slug({
          name: { label: "Full name" },
        }),
        role: fields.text({
          label: "Role",
          description: "e.g. 'Founder & Creative Director'",
        }),
        bio: fields.text({
          label: "Bio",
          multiline: true,
          description: "One short paragraph (1-2 sentences)",
        }),
        photo: fields.image({
          label: "Photo",
          directory: "public/team",
          publicPath: "/team/",
        }),
        order: fields.integer({
          label: "Display order",
          description: "Lower numbers appear first",
        }),
      },
    }),
    services: collection({
      label: "Services",
      slugField: "title",
      path: "src/content/services/*/",
      schema: {
        title: fields.slug({
          name: { label: "Service name" },
        }),
        order: fields.integer({
          label: "Display order",
          description: "Lower numbers appear first on /services",
        }),
        intro: fields.text({
          label: "Intro",
          multiline: true,
          description: "One paragraph shown at the top of the service detail page",
        }),
        sections: fields.array(
          fields.object({
            heading: fields.text({ label: "Section heading" }),
            body: fields.text({
              label: "Body",
              multiline: true,
              description: "1-2 paragraphs of long-form content",
            }),
          }),
          {
            label: "Long-form sections",
            description: "Each section is a labelled block on the detail page",
            itemLabel: (props) => props.fields.heading.value,
          },
        ),
        faq: fields.array(
          fields.object({
            q: fields.text({ label: "Question" }),
            a: fields.text({
              label: "Answer",
              multiline: true,
            }),
          }),
          {
            label: "FAQ",
            description: "Optional — each Q&A is rendered as a collapsible item and emitted as FAQPage JSON-LD",
            itemLabel: (props) => props.fields.q.value,
          },
        ),
      },
    }),
  },
  singletons: {
    site: singleton({
      label: "Site settings",
      path: "src/content/site/",
      schema: {
        email: fields.text({ label: "Contact email" }),
        phone: fields.text({
          label: "Contact phone",
          description: "E.164 format preferred, e.g. +919457633238",
        }),
        slotsOpen: fields.integer({
          label: "Slots open",
          description: "Number shown in the sidebar 'Slots open' indicator",
        }),
        calLink: fields.url({ label: "Cal.com link" }),
        calEmbedPath: fields.text({
          label: "Cal.com embed path",
          description: "e.g. oreenza/discovery-call",
        }),
        socials: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            href: fields.url({ label: "URL" }),
          }),
          { label: "Socials", itemLabel: (props) => props.fields.label.value },
        ),
        industries: fields.array(
          fields.object({
            name: fields.text({ label: "Industry name" }),
          }),
          {
            label: "Industries served",
            description:
              "Generic verticals shown in the 'Trusted-by' sidebar rail. " +
              "Use real client names only if you have permission to display their brand.",
            itemLabel: (props) => props.fields.name.value,
          },
        ),
        services: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            items: fields.array(fields.text({ label: "Item" }), {
              label: "Items",
              itemLabel: (props) => props.value,
            }),
          }),
          { label: "Services", itemLabel: (props) => props.fields.title.value },
        ),
      },
    }),
  },
});
