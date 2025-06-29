"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Load } from "@/components/checkFunc";

export default function Notfound() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 1000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#898AC4]">
      <Load value="Looks like you're lost, redirecting to home..." active={true} />
    </div>
  );
}
