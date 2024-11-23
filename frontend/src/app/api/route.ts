import type { NextApiRequest, NextApiResponse } from 'next'

export async function GET(req:Request) {
  return Response.json(
    {
      success: true,
      message:"Hello World"
    },
    { status: 200 }
  );
}
