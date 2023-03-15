"use client";

import { ERC721Metadata } from "contracts";
import Link from "next/link";

import Card from "../../../src/ui/Card";
import { toHex } from "../../../src/utils/toHex";
import PlayerCount from "./PlayerCount";
import { useExploreStore } from "./store";

interface Props {
  id: number;
  metadata: ERC721Metadata;
  sizes?: string;
}

export default function SpaceCard({ id, metadata, sizes }: Props) {
  const filter = useExploreStore((state) => state.filter);

  return filter === "" || metadata.name.toLowerCase().includes(filter.toLowerCase()) ? (
    <Link href={`/space/${toHex(id)}`} className="rounded-xl">
      <Card text={metadata?.name} image={metadata?.image} sizes={sizes} animateEnter>
        <PlayerCount id={id} />
      </Card>
    </Link>
  ) : null;
}
