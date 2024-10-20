import { cardModel } from "@/server";
import { NextResponse } from "next/server";

export async function GET(req) {
    const response = await cardModel
        .find()
        .sort("-updatedAt")
        .select("-_id -__v");

    return NextResponse.json({
        status: true,
        message: "Fetched cards",
        data: response,
    });
}
