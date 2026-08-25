import type { ComponentPropsWithoutRef } from "react";

export function Link({ children, ...props }: ComponentPropsWithoutRef<"a">) {
  return <a {...props}>{children}</a>;
}
