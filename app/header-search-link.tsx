"use client";

import { useEffect } from "react";
import { Link } from "./plain-link";

export function HeaderSearchLink() {
  useEffect(() => {
    function openSearch(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>("#docs-search-input");
        if (searchInput) {
          searchInput.focus();
          return;
        }
        window.location.assign("/search");
      }
    }

    window.addEventListener("keydown", openSearch);
    return () => window.removeEventListener("keydown", openSearch);
  }, []);

  return (
    <Link className="header-search" href="/search" aria-label="Искать в документации">
      <span aria-hidden="true">⌕</span>
      <span>Поиск по докам</span>
      <kbd>⌘ K</kbd>
    </Link>
  );
}
