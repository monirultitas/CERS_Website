import Image from "next/image";
import Container from "@/components/layout/Container";
import { teamMembers as placeholderTeamMembers } from "@/lib/placeholder-data";
import { sanityClient } from "@/lib/sanity/client";
import { allTeamMembersQuery } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { isSanityConfigured } from "@/sanity/env";

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => w.length > 0)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const avatarTones = [
  "bg-brand-700",
  "bg-moss-600",
  "bg-brand-600",
  "bg-moss-700",
  "bg-brand-800",
  "bg-moss-500",
];

type DisplayMember = {
  slug: string;
  name: string;
  role: string;
  bio?: string;
  photo?: string;
};

type SanityTeamMember = {
  name: string;
  slug: string;
  role: string;
  bio?: string;
  photo?: Parameters<typeof urlForImage>[0];
};

async function getTeamMembers(): Promise<DisplayMember[]> {
  if (!isSanityConfigured) return placeholderTeamMembers;

  try {
    const members = await sanityClient.fetch<SanityTeamMember[]>(allTeamMembersQuery);
    if (!members || members.length === 0) return placeholderTeamMembers;

    return members.map((m) => ({
      slug: m.slug,
      name: m.name,
      role: m.role,
      bio: m.bio,
      photo: m.photo ? urlForImage(m.photo).width(128).height(128).url() : undefined,
    }));
  } catch {
    return placeholderTeamMembers;
  }
}

export default async function TeamGrid() {
  const teamMembers = await getTeamMembers();

  return (
    <section className="bg-white py-20">
      <Container>
        <h2 className="font-display text-3xl font-bold text-ink-900">Our team</h2>
        <p className="mt-2 max-w-lg text-ink-500">
          Geospatial specialists first, with research and program staff turning that work into
          policy outcomes.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, i) => (
            <div
              key={member.slug}
              className="flex flex-col items-start rounded-2xl border border-ink-100 p-6"
            >
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full font-display text-lg font-bold text-white ${
                    avatarTones[i % avatarTones.length]
                  }`}
                >
                  {initials(member.name)}
                </div>
              )}
              <h3 className="font-display mt-4 text-base font-semibold text-ink-900">
                {member.name}
              </h3>
              <p className="mt-0.5 text-sm font-medium text-brand-700">{member.role}</p>
              {member.bio && (
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{member.bio}</p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
