import { collection, config, fields, singleton } from "@keystatic/core";

const githubStorage =
  process.env.KEYSTATIC_GITHUB_CLIENT_ID && process.env.KEYSTATIC_GITHUB_REPO
    ? {
        kind: "github" as const,
        repo: process.env.KEYSTATIC_GITHUB_REPO as `${string}/${string}`,
      }
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
        intro: fields.text({
          label: "Intro",
          multiline: true,
          description: "One-liner shown in the sidebar and page meta",
        }),
        description: fields.array(fields.text({ label: "Paragraph", multiline: true }), {
          label: "Description",
          itemLabel: () => "Paragraph",
        }),
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
          { label: "Mockups", itemLabel: () => "Mockup" }
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
          { label: "Socials", itemLabel: (props) => props.fields.label.value }
        ),
        clients: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            logo: fields.image({
              label: "Logo",
              directory: "public/logos",
              publicPath: "/logos/",
            }),
          }),
          { label: "Trusted-by clients", itemLabel: (props) => props.fields.name.value }
        ),
        services: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            items: fields.array(fields.text({ label: "Item" }), {
              label: "Items",
              itemLabel: (props) => props.value,
            }),
          }),
          { label: "Services", itemLabel: (props) => props.fields.title.value }
        ),
      },
    }),
  },
});
