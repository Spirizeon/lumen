import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import FileModel from '@/model/File';

export  async function GET(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  try {
    const files = await FileModel.find({});
    
    return Response.json(
      {
        success: true,
        data:files
      },
      { status: 200 }
    );
  } catch (error:any) {
    return Response.json(
      {
        success: false,
        error: "Error fetching files"
      },
      { status: error.status }
    );

  }
}

export async function POST(req: Request, res: NextApiResponse) {
  await dbConnect();

  try {
    const data=await req.json();

    const file = new FileModel(data);
    await file.save();
    return Response.json(
      {
        success: true,
        data:file
      },
      { status: 201 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
      error:error
      },
      { status: 400 }
    );
  }
}
