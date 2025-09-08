import { Session } from "@/app/api/session/route";
import { createContext } from "react";

export const SessionContext = createContext<Session | null>(null)