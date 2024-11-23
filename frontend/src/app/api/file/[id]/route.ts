import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import FileModel from '@/model/File';


export async function GET(req: Request, {params}:{params:{id:string}})
{
  await dbConnect();
  try {
    const id  = params.id;
    console.log(id);
    const file = await FileModel.findById(id);
    if (!file) return Response.json(
      {
        success: false,
       error: 'File not found'
      },
      { status: 404 }
    );
    return Response.json(
      {
        success: true,
        data:file
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: 'Error fetching file'
      },
      { status: 400 }
    );
  }

}

export async function DELETE(req: Request, {params}:{params:{id:string}})
{
  await dbConnect();
  try {
    const id  = params.id;
    const result = await FileModel.deleteOne({ _id: id });
    console.log(result)
    if (!result)
      return Response.json(
      {
        success: false,
        error: 'File Not Found' 
      },
      { status: 404 }
    );
    return Response.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error:any) {
    console.log(error);
    return Response.json(
      {
        success: false,
        error: error 
      },
      { status: 400 }
    );
  }
} 
