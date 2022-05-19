import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Button from "../../src/components/base/Button";
import NavbarLayout from "../../src/components/layouts/NavbarLayout/NavbarLayout";
import { useLocalSpace } from "../../src/helpers/indexeddb/LocalSpace/hooks/useLocalScene";

export default function Id() {
  const router = useRouter();
  const id = router.query.id as string;

  const localSpace = useLocalSpace(id);

  if (!localSpace)
    return (
      <div className="flex justify-center mt-8 text-xl">
        Local space not found.
      </div>
    );

  return (
    <>
      <Head>
        <title>{localSpace.name} · The Wired</title>
      </Head>

      <div className="mx-8 h-full">
        <div className="max-w mx-auto py-8 w-full h-full space-y-8">
          <div className="rounded-3xl h-72 ">
            {localSpace.image && (
              <img
                src={localSpace.image}
                alt={localSpace.name}
                className="object-cover rounded-3xl w-full h-full"
              />
            )}
          </div>

          <div className="w-full min-w-fit flex flex-col space-y-8">
            <div className="font-black text-3xl flex justify-center">
              {localSpace.name}
            </div>
            {localSpace.description.length > 0 && (
              <div>{localSpace.description}</div>
            )}
            <Link href={`/studio/${localSpace.id}`} passHref>
              <div>
                <Button variant="outlined" fullWidth>
                  Open Studio
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

Id.Layout = NavbarLayout;