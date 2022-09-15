import Image from "next/future/image";
import Link from "next/link";
import { FaBook, FaDiscord } from "react-icons/fa";
import { MdArrowDownward } from "react-icons/md";
import { VscGithubInverted, VscTwitter } from "react-icons/vsc";

import {
  DISCORD_URL,
  DOCS_URL,
  GITHUB_URL,
  TWITTER_URL,
} from "../src/constants";
import { getNavbarLayout } from "../src/home/layouts/NavbarLayout/NavbarLayout";
import Button from "../src/ui/base/Button";
import LandingInfoBlock from "../src/ui/LandingInfoBlock";
import MetaTags from "../src/ui/MetaTags";

export default function Index() {
  return (
    <>
      <MetaTags />

      <div className="flex justify-center">
        <div className="max-w-content mx-4 snap-y snap-mandatory">
          <div className="-mt-12 flex h-screen snap-center flex-col items-center md:flex-row">
            <div className="flex h-full w-full flex-col justify-center">
              <div className="text-8xl font-black">The Wired</div>

              <div className="pt-2 text-3xl">
                An <strong>open and decentralized</strong> web-based metaverse
                platform.
              </div>

              <div className="flex justify-between space-x-4 pt-8 text-xl md:justify-start">
                <div className="w-full md:w-fit">
                  <Link href="/explore" passHref>
                    <div>
                      <Button variant="filled" rounded="large" fullWidth>
                        <div className="px-1.5 py-0.5">Play Now</div>
                      </Button>
                    </div>
                  </Link>
                </div>

                <div className="w-full md:w-fit">
                  <Button variant="text" rounded="large" fullWidth>
                    <a href={DOCS_URL} target="_blank" rel="noreferrer">
                      <div className="px-1.5 py-0.5">Learn More</div>
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative md:h-full md:w-1/2">
              <Image
                src="/images/jump.png"
                priority
                fill
                sizes="341px"
                alt="Wired-chan"
                className="select-none object-contain"
              />
            </div>
          </div>

          <div className="-mt-14 flex justify-center">
            <MdArrowDownward className="bg-surfaceDark text-onSurfaceDark animate-bounce rounded-full p-1 text-5xl" />
          </div>

          <LandingInfoBlock
            title="Create"
            subtitle="Leave your mark on cyberspace"
            body="Whether you're looking to build a digital home, start a clothing brand, or just scratch that creative itch - the Wired has you covered."
            image="/images/Create.png"
            imageSide="left"
            buttonText="Start Creating"
            buttonLink="/create"
          />

          <LandingInfoBlock
            title="Explore"
            subtitle="Discover new experiences"
            body="Go rock climbing on Ganymede, hit an underground music festival, watch the sunset on Tatooine with a group of friends - who knows what you'll find."
            image="/images/Explore.png"
            imageSide="right"
            buttonText="Start Exploring"
            buttonLink="/explore"
          />

          <LandingInfoBlock
            title="Open"
            subtitle="Take control of your digital life"
            body="Above all, the Wired is an open platform. Anyone can run their own game servers, modify their client, or build something new on top of it."
            image="/images/Open.png"
            imageSide="left"
            buttonText="Learn More"
            buttonLink={DOCS_URL}
          />

          <div className="flex h-screen snap-center items-center">
            <div className="md:mt-8 md:h-1/2 md:w-1/2 md:p-8">
              <div className="relative h-full w-full">
                <Image
                  src="/images/sitting.png"
                  fill
                  sizes="293px"
                  alt="Wired-chan"
                  className="select-none object-contain"
                />
              </div>
            </div>

            <div className="w-full space-y-2">
              <div
                className="text-onPrimaryContainer bg-primaryContainer w-fit rounded-xl px-5 py-2
                           text-6xl font-black"
              >
                Links
              </div>

              <div className="flex flex-col space-y-2 pt-4 text-2xl">
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:bg-primaryContainer hover:text-onPrimaryContainer rounded-lg px-6 py-1 transition"
                >
                  <div className="flex items-center space-x-2">
                    <FaDiscord />
                    <div>Discord</div>
                  </div>
                </a>

                <a
                  href={TWITTER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:bg-primaryContainer hover:text-onPrimaryContainer rounded-lg px-6 py-1 transition"
                >
                  <div className="flex items-center space-x-2">
                    <VscTwitter />
                    <div>Twitter</div>
                  </div>
                </a>

                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:bg-primaryContainer hover:text-onPrimaryContainer rounded-lg px-6 py-1 transition"
                >
                  <div className="flex items-center space-x-2">
                    <VscGithubInverted />
                    <div>GitHub</div>
                  </div>
                </a>

                <a
                  href={DOCS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:bg-primaryContainer hover:text-onPrimaryContainer rounded-lg px-6 py-1 transition"
                >
                  <div className="flex items-center space-x-2">
                    <FaBook />
                    <div>Docs</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Index.getLayout = getNavbarLayout;
