"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function HeaderSearchLink() {
  const router = useRouter();

  useEffect(() => {
    function openSearch(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>("#docs-search-input");
        if (searchInput) {
          searchInput.focus();
          return;
        }
        router.push("/search");
      }
    }

    window.addEventListener("keydown", openSearch);
    return () => window.removeEventListener("keydown", openSearch);
  }, [router]);

  return (
    <Link className="header-search" href="/search" aria-label="Искать в документации">
      <span aria-hidden="true">⌕</span>
      <span>Поиск по докам</span>
      <kbd>⌘ K</kbd>
    </Link>
  );
}
