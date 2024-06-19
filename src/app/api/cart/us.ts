import { useSession } from "next-auth/react";

export default function useSessionLocal() {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return session;
  } else {
    return null;
  }
}
