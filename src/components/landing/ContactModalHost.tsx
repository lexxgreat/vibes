"use client";

import { ContactModal } from "./ContactModal";
import { useContactStore } from "./use-contact";

/**
 * Single shared modal instance, mounted once near the page root.
 * Any <ContactButton /> or the <FloatingWidget /> can open it via the
 * Zustand store.
 */
export function ContactModalHost() {
  const open = useContactStore((s) => s.open);
  const source = useContactStore((s) => s.source);
  const title = useContactStore((s) => s.title);
  const close = useContactStore((s) => s.closeContact);

  return (
    <ContactModal open={open} onOpenChange={close} source={source} title={title} />
  );
}
