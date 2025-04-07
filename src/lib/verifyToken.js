import { jwtVerify } from 'jose';


export async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    if(!secret){
      throw new Error("Secret is not defined")
    }

    const {payload} = await jwtVerify(token, secret)
    
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}