"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchCharacters } from "@/lib/api";
import { CharactersResponse } from "@/types/character";
import { getPageRange } from "@/lib/pagination";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [data, setData] = useState<CharactersResponse>();
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = data?.info?.pages || 1;

  useEffect(() => {
    fetchCharacters({ species: "human", page: currentPage }).then(setData);
  }, [currentPage]);

  const createPageLink = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams?.toString());
      if (page === 1) {
        params.delete("page");
      } else {
        params.set("page", page.toString());
      }
      return `${pathname}?${params.toString()}`;
    },
    [searchParams, pathname]
  );

  const renderPageLinks = () => {
    const pages = getPageRange(currentPage, totalPages);
  
    return pages.map((page, index) =>
      page === -1 ? (
        <PaginationItem key={`ellipsis-${index}`}>
          <PaginationEllipsis />
        </PaginationItem>
      ) : (
        <PaginationItem key={page}>
          <PaginationLink
            href={createPageLink(page)}
            isActive={currentPage === page}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      )
    );
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <header>Rick and Morty Characters</header>

        <Table>
          <TableCaption>A list of Rick and Morty characters.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"><b>Name</b></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.results.map((character) => (
              <TableRow key={character.id}>
                <TableCell
                  className="font-medium cursor-pointer"
                  onClick={() => router.push(`/character/${character.id}`)}
                >
                  {character.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={createPageLink(Math.max(currentPage - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {renderPageLinks()}
            <PaginationItem>
              <PaginationNext
                href={createPageLink(Math.min(currentPage + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
}
