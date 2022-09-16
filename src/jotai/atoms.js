import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Socket } from "socket.io-client";

export const testAtom = atomWithStorage("test", "Hello");
export const userAtom = atomWithStorage("user", null);

//for modals
