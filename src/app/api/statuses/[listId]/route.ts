import { Status } from "@/features/status/types";
import { createServerAxios } from "@/shared/lib/axios/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { listId: string } },
) {
  const axios = await createServerAxios();
  const data = await axios.get<Status[]>(`/statuses/list/${params.listId}`);
  return NextResponse.json(data);
}
