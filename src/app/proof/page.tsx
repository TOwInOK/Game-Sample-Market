"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      try {
        const response = await fetch("/api/proof");
        const data = await response.json();
        if (data.redirect) {
          router.push(data.redirect);
        } else if (data.error) {
          setMessage(data.error);
        } else {
          router.push("/");
          setMessage(data.message);
        }
      } catch (error) {
        console.error("Failed to check user:", error);
        setMessage("An error occurred");
      }
    }

    checkUser();
  }, [router]);

  return (
    <div>
      <h1>{message || "Making relations to your account"}</h1>
    </div>
  );
}
