import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Site Description", type: "text", rows: 3 }),
    defineField({ name: "email", title: "Contact Email", type: "string" }),
    defineField({ name: "phones", title: "Phone Numbers", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "address", title: "Address", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "tagline" } },
});
