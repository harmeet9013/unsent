import { NextResponse } from "next/server";
//
import { cardModel } from "@/server";
import ShortUniqueId from "short-unique-id";

export async function POST(req) {
    const data = await req.json();

    const uid = new ShortUniqueId({ length: 10 });

    const { to, message, color } = data;

    const newCard = new cardModel({
        to: to,
        message: message,
        color: color,
        key: uid.rnd(),
    });

    try {
        const response = await newCard.save();

        return NextResponse.json({
            status: true,
            message: "Saved card!",
            data: response,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: false,
            message: "Error saving card!",
            data: [],
        });
    }
}
