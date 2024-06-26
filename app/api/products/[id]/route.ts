import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';

export const GET = async (req: Request, { params }: { params: { [key: string]: string } }) => {
  try {
    const { id } = params;
    const objectId = new ObjectId(id);

    const client = await clientPromise;
    const db = client.db();

    const collection = db.collection('products');
    const result = await collection.findOne({ _id: objectId });

    if (!result) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }

    console.log("Result is: ", result);

    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}


export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const objectId = new ObjectId(id);
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('products');

    const result = await collection.findOneAndUpdate(
      { _id: objectId },
      { $set: body },
      { returnDocument: 'after' } 
    );

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const objectId = new ObjectId(id);

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('products');

    const result = await collection.deleteOne({ _id: objectId });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}