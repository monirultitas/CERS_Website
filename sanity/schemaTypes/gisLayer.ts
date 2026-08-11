import { defineField, defineType } from "sanity";

export default defineType({
  name: "gisLayer",
  title: "GIS Layer",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Layer Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "researchArea",
      title: "Research Area",
      type: "reference",
      to: [{ type: "researchArea" }],
    }),
    defineField({
      name: "geometryType",
      title: "Geometry Type",
      type: "string",
      options: { list: ["point", "polygon", "line"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "color",
      title: "Layer Color (hex)",
      type: "string",
      description: "e.g. #185c76",
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({
      name: "geojsonFile",
      title: "GeoJSON File",
      type: "file",
      description: "Upload a .geojson / .json file containing this layer's features.",
      options: { accept: ".geojson,.json" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "popupFields",
      title: "Popup Fields",
      description: "Which GeoJSON feature properties to show in the map popup, and their labels.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "key", title: "Property key", type: "string" },
            { name: "label", title: "Display label", type: "string" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "geometryType" },
  },
});
