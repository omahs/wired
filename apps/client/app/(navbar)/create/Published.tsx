import Link from "next/link";

import { env } from "../../../src/env/server.mjs";
import { fetchProjects } from "../../../src/server/helpers/fetchProjects";
import { getServerSession } from "../../../src/server/helpers/getServerSession";
import Card from "../../../src/ui/Card";
import CardGrid from "../../../src/ui/CardGrid";

function cdnImageURL(id: string) {
  return `https://${env.NEXT_PUBLIC_CDN_ENDPOINT}/publications/${id}/image.jpg`;
}

export default async function Published() {
  const session = await getServerSession();

  if (!session) return null;

  const projects = await fetchProjects();
  const publishedProjects = projects.filter((p) => p.Publication?.spaceId);

  if (publishedProjects.length === 0) return null;

  const publishedImages = publishedProjects.map((p) =>
    p.publicationId ? cdnImageURL(p.publicationId) : p.image
  );

  return (
    <>
      <div className="pt-4 text-2xl font-bold">🌍 Published</div>

      <CardGrid>
        {publishedProjects.map(({ id, name }, i) => (
          <Link key={id} href={`/project/${id}`} className="rounded-xl">
            <Card text={name} image={publishedImages[i]} sizes="333px" animateEnter />
          </Link>
        ))}
      </CardGrid>
    </>
  );
}
