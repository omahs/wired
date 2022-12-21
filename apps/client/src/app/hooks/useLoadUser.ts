import { useGetPublicationQuery } from "lens";
import { useEffect, useState } from "react";

import { useSession } from "../../client/auth/useSession";
import { parseUri } from "../../utils/parseUri";
import { LocalStorageKey } from "../constants";
import { useAppStore } from "../store";

export function useLoadUser() {
  const [avatarId, setAvatarId] = useState<string | null>(null);
  const [loadedAvatarPublication, setLoadedAvatarPublication] = useState<string | null>(null);

  const engine = useAppStore((state) => state.engine);
  const { data: session } = useSession();

  const [{ data: avatarPublication }] = useGetPublicationQuery({
    variables: { request: { publicationId: avatarId } },
    pause: !avatarId,
  });

  useEffect(() => {
    // Publish address
    engine?.networking.setAddress(session?.address ?? null);
  }, [engine, session]);

  useEffect(() => {
    if (!engine) return;

    const { customAvatar, displayName } = useAppStore.getState();

    // Name
    const localName = localStorage.getItem(LocalStorageKey.Name);
    if (localName !== displayName) {
      useAppStore.setState({ displayName });
      engine.networking.setName(displayName);
    }

    // Avatar
    const localAvatar = localStorage.getItem(LocalStorageKey.Avatar);
    const localAvatarId = localStorage.getItem(LocalStorageKey.AvatarId);

    if (localAvatarId) {
      // Use avatarId if available
      setAvatarId(localAvatarId);
    } else if (localAvatar) {
      // Otherwise use local storage avatar
      if (localAvatar !== customAvatar) {
        useAppStore.setState({ customAvatar: localAvatar });
        engine.networking.setAvatar(localAvatar);
      }
    } else {
      // Otherwise use default avatar
      useAppStore.setState({ customAvatar: null });
      engine.networking.setAvatar(null);
    }
  }, [engine]);

  useEffect(() => {
    async function fetchAvatar() {
      if (!engine || !avatarPublication) return;

      const avatarURI = avatarPublication?.publication?.metadata.media[1]?.original.url;
      if (!avatarURI) return;

      const url = parseUri(avatarURI);

      if (loadedAvatarPublication !== url) {
        const response = await fetch(url);
        const blob = await response.blob();
        const customAvatar = URL.createObjectURL(blob);

        useAppStore.setState({ customAvatar });
        engine.networking.setAvatar(avatarURI);
        setLoadedAvatarPublication(url);
      }
    }

    fetchAvatar();
  }, [engine, avatarPublication, loadedAvatarPublication]);
}
