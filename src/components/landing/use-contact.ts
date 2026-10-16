"use client";

import { create } from "zustand";

type ContactSource = "button" | "vid";

interface ContactState {
  open: boolean;
  source: ContactSource;
  title?: string;
  /**
   * Open the contact modal. The source param drives analytics:
   *   "button" → reachGoal("button_click")
   *   "vid"    → reachGoal("widget_click")
   */
  openContact: (source?: ContactSource, title?: string) => void;
  closeContact: () => void;
}

export const useContactStore = create<ContactState>((set) => ({
  open: false,
  source: "button",
  title: undefined,
  openContact: (source = "button", title) =>
    set({ open: true, source, title }),
  closeContact: () => set({ open: false }),
}));
