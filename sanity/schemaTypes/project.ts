import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "researchArea", title: "Research Area", type: "reference", to: [{ type: "researchArea" }] }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["Ongoing", "Completed"] },
      initialValue: "Ongoing",
    }),
    defineField({ name: "timeframe", title: "Timeframe", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3, validation: (r) => r.required().max(220) }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "highlights", title: "Highlights", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "partners", title: "Partners", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "gisLayers",
      title: "Related GIS Layers",
      type: "array",
      of: [{ type: "reference", to: [{ type: "gisLayer" }] }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "status", media: "coverImage" },
  },
});
