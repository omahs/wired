import { useEffect, useState } from "react";
import { MdClose, MdLogout } from "react-icons/md";

import { useLogout } from "../../client/auth/useLogout";
import { useSession } from "../../client/auth/useSession";
import Avatar from "../../home/Avatar";
import SignInButton from "../../home/SignInButton";
import FileInput from "../../ui/FileInput";
import TextField from "../../ui/TextField";
import { bytesToDisplay } from "../../utils/bytesToDisplay";
import { ModelStats } from "../../utils/getModelStats";
import { useProfileByAddress } from "../hooks/useProfileByAddress";
import { usePlayStore } from "../store";
import { avatarPerformanceRank } from "../utils/avatarPerformanceRank";
import { clientGetModelStats } from "../utils/clientGetModelStats";

interface Props {
  onClose: () => void;
}

export default function Settings({ onClose }: Props) {
  const nickname = usePlayStore((state) => state.nickname);
  const avatar = usePlayStore((state) => state.avatar);
  const playerId = usePlayStore((state) => state.playerId);
  const [avatarName, setAvatarName] = useState<string>();
  const [stats, setStats] = useState<ModelStats | null>(null);

  const { data: session } = useSession();
  const { logout } = useLogout();

  const { profile, isLoading: isLoadingProfile } = useProfileByAddress(session?.address);

  useEffect(() => {
    if (!avatar) {
      setStats(null);
      return;
    }

    async function getStats() {
      if (!avatar) return;
      const stats = await clientGetModelStats(avatar);
      setStats(stats);
    }

    getStats();
  }, [avatar]);

  const rank = stats ? avatarPerformanceRank(stats) : null;

  const guestName =
    playerId == null || playerId === undefined
      ? "Guest"
      : `Guest 0x${playerId.toString(16).padStart(2, "0")}`;

  return (
    <div className="space-y-4">
      {!session?.address && (
        <TextField
          name="Name"
          placeholder={guestName}
          value={nickname ?? ""}
          onChange={(e) => {
            usePlayStore.setState({ didChangeName: true, nickname: e.target.value });
          }}
          className="h-full w-full rounded-lg bg-neutral-200/50 px-4 py-2 text-center text-neutral-900 placeholder:text-neutral-400"
        />
      )}

      <section className="space-y-1">
        <div className="text-lg font-bold">Avatar</div>

        {avatar && (
          <div className="flex items-center rounded-lg px-4 py-3 ring-1 ring-inset ring-neutral-300">
            <div className="flex h-full items-stretch space-x-4">
              <div className="flex w-1/3 min-w-fit flex-col justify-between">
                <div className="text-neutral-700">Performance:</div>
                <div className="text-neutral-700">Size:</div>
              </div>

              <div className="flex w-full flex-col justify-between">
                {rank ? (
                  <div
                    className={`font-medium ${
                      rank === "Very Poor"
                        ? "text-red-500"
                        : rank === "Poor"
                        ? "text-orange-500"
                        : rank === "Medium"
                        ? "text-yellow-500"
                        : rank === "Good"
                        ? "text-green-500"
                        : "animate-textScroll bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
                    }`}
                  >
                    {rank}
                  </div>
                ) : (
                  <div className="h-5 w-24 animate-pulse rounded-md bg-neutral-200" />
                )}

                {stats ? (
                  <div className="font-medium">{bytesToDisplay(stats.fileSize)}</div>
                ) : (
                  <div className="h-5 w-24 animate-pulse rounded-md bg-neutral-200" />
                )}
              </div>
            </div>

            <div className="grow" />

            <button
              onClick={() => {
                setAvatarName(undefined);
                usePlayStore.setState({ didChangeAvatar: true, avatar: null });
              }}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-xl transition hover:bg-red-100 active:opacity-90"
            >
              <MdClose />
            </button>
          </div>
        )}

        <div className="flex space-x-1">
          <div className="grow">
            <FileInput
              displayName={avatarName ?? null}
              placeholder="Upload VRM File"
              accept=".vrm"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const url = URL.createObjectURL(file);
                usePlayStore.setState({ didChangeAvatar: true, avatar: url });
                setAvatarName(file.name);
              }}
            />
          </div>
        </div>
      </section>

      <section className="space-y-1">
        <div className="text-lg font-bold">Account</div>

        {session?.address ? (
          <div className="flex items-center space-x-4 pt-2">
            <div className="overflow-hidden">
              <Avatar
                src={profile?.metadata?.image}
                uniqueKey={profile?.handle?.full ?? session.address}
                loading={isLoadingProfile}
                size={48}
              />
            </div>

            {isLoadingProfile ? (
              <div className="h-5 w-40 animate-pulse rounded-md bg-neutral-300" />
            ) : (
              <div>
                <span className="text-xl font-bold">{profile?.handle?.string}</span>
                <span className="text-lg text-neutral-400">
                  #{profile?.handle?.id.toString().padStart(4, "0")}
                </span>
              </div>
            )}

            <div className="grow" />

            {!isLoadingProfile && (
              <button
                onClick={logout}
                className="flex h-12 w-12 items-center justify-center rounded-lg text-xl transition hover:bg-red-100 active:opacity-90"
              >
                <MdLogout />
              </button>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <div onClick={onClose}>
              <SignInButton />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
