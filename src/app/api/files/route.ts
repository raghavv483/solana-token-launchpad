import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "../../../../utils/config"

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;
        const { cid } = await pinata.upload.public.file(file)
        console.log(cid);
        const url = await pinata.gateways.public.convert(cid);
        console.log(url);
        return NextResponse.json(url, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}