// GROQ queries ready to use once a real Sanity project is connected (see .env.example).
// Pages currently read from lib/*-content.ts placeholder data; swap to these once
// NEXT_PUBLIC_SANITY_PROJECT_ID is set and content has been entered in /studio.

export const allPostsQuery = `*[_type == "post"] | order(publishedAt desc){
  title, "slug": slug.current, category, excerpt, publishedAt, tags,
  coverImage, "author": author->name
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  title, "slug": slug.current, category, excerpt, publishedAt, tags, body,
  coverImage, "author": author->name
}`;

export const allProjectsQuery = `*[_type == "project"] | order(_createdAt desc){
  title, "slug": slug.current, status, timeframe, location, summary, coverImage,
  "areaSlug": researchArea->slug.current, "areaName": researchArea->name
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  title, "slug": slug.current, status, timeframe, location, summary, description,
  highlights, partners, coverImage,
  "areaSlug": researchArea->slug.current, "areaName": researchArea->name
}`;

export const allResearchAreasQuery = `*[_type == "researchArea"] | order(order asc){
  name, "slug": slug.current, isCore, tagline, overview, focusAreas, toolsAndMethods
}`;

export const researchAreaBySlugQuery = `*[_type == "researchArea" && slug.current == $slug][0]{
  name, "slug": slug.current, isCore, tagline, overview, focusAreas, toolsAndMethods
}`;

export const allTeamMembersQuery = `*[_type == "teamMember"] | order(order asc){
  name, "slug": slug.current, role, bio, photo
}`;

export const allGisLayersQuery = `*[_type == "gisLayer"]{
  name, geometryType, color, description, popupFields,
  "url": geojsonFile.asset->url,
  "areaSlug": researchArea->slug.current
}`;

export const allPublicationsQuery = `*[_type == "publication"] | order(year desc){
  title, authors, year, venue, url, "fileUrl": file.asset->url,
  "areaSlug": researchArea->slug.current
}`;
