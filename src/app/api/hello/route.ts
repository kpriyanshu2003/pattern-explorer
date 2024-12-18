import { getGPTResponse, pingGPT } from "@/actions/GPT";

export async function GET() {
  // const data = await pingGPT();
  const data = await getGPTResponse("Why is the sky blue");
  return Response.json(data);
}
