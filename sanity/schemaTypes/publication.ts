import { defineField, defineType } from "sanity";

export default defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "authors", title: "Authors", type: "string", validation: (r) => r.required() }),
    defineField({ name: "year", title: "Year", type: "number", validation: (r) => r.required() }),
    defineField({ name: "venue", title: "Journal / Venue", type: "string" }),
    defineField({ name: "url", title: "Link (DOI or PDF)", type: "url" }),
    defineField({
      name: "researchArea",
      title: "Research Area",
      type: "reference",
      to: [{ type: "researchArea" }],
    }),
    defineField({
      name: "file",
      title: "PDF Upload",
      type: "file",
      options: { accept: ".pdf" },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "year" },
  },
});
