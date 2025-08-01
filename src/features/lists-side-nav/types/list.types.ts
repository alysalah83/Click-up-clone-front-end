import z from "zod";
import { listSchema } from "../validations/listSchema";

interface List {
  id: string;
  name: string;
  workspaceId: string;
  createdAt: string;
}

type ClientList = z.infer<typeof listSchema>;

export type { List, ClientList };
