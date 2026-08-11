import { defineField, defineType } from "sanity";

export default defineType({
  name: "researchArea",
  title: "Research Area",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "isCore",
      title: "Core Focus",
      description: "Flags this as CERS's primary discipline (GIS & Remote Sensing).",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "tagline", title: "Tagline", type: "string", validation: (r) => r.required().max(140) }),
    defineField({ name: "overview", title: "Overview", type: "text", rows: 4 }),
    defineField({ name: "focusAreas", title: "Focus Areas", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "toolsAndMethods", title: "Tools & Methods", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "tagline" } },
});
