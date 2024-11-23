import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import User from '@/model/User'; 

export  async function GET(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
    try {
      const data = await User.find(); 
      return Response.json(
        {
          success: true,
          data:data
        },
        { status: 200 }
      );
    } catch (error:any) {
      return Response.json(
        {
          success: false,
          error:error
        },
        { status: error.status }
      );
    }
}
