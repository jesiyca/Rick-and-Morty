"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Character } from "@/types/character";
import { fetchCharacter } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CharacterPage() {
  const { slug } = useParams();
  const router = useRouter();
  const characterId = typeof slug === "string" ? parseInt(slug) : NaN;
  const [data, setData] = useState<Character>();

  useEffect(() => {
    if (isNaN(characterId)) return;

    fetchCharacter(characterId)
    .then((data) => {
      setData(data);
    })
  }, []);

  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start font-normal">
      <Button onClick={() => router.back()} variant="outline">
          Back
      </Button>
      {data ? (
        <Card>
          <CardHeader> 
            <CardTitle>
              {data.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <img src={data.image} alt={data.name} />
            <p>Status: {data.status}</p>
            <p>Origin: {data.origin.name}</p>
            <p>Location: {data.location.name}</p>
            <p>Created: {formatDate(data.created)}</p>
          </CardContent>
        </Card>
      ) : (
        <p>Loading character data...</p>
      )}
      </main>
    </div>
  );
}
