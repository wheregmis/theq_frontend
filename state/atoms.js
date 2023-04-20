import { atom } from "recoil";

export const organizationAtom = atom({
  key: "organizationAtom",
  default: null,
});

export const organizationsAtom = atom({
  key: "organizationsAtom",
  default: null,
});

export const estimatedWaitingTimeAtom = atom({
  key: "estimatedWaitingTimeAtom",
  default: 0,
});

export const currentQueueOrganizationAtom = atom({
  key: "currentQueueOrganization",
  default: null,
});

export const searchFilterAtom = atom({
  key: "searchFilterAtom",
  default: "",
});
