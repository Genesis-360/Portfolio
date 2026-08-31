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
