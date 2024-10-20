import { cardModel } from "@/server";
import { NextResponse } from "next/server";

export async function GET(req) {
    const searchTerm = req?.nextUrl?.searchParams?.get("search");
    const pageOptions = {
        page: searchTerm
            ? 1
            : parseInt(req.nextUrl.searchParams.get("page")) || 1,
        limit: searchTerm
            ? 9
            : parseInt(req.nextUrl.searchParams.get("limit")) || 9,
    };

    const response = await cardModel
        .find({
            ...(searchTerm
                ? {
                      $or: [
                          {
                              to: {
                                  $regex: ".*" + searchTerm + ".*",
                                  $options: "i",
                              },
                          },
                          {
                              message: {
                                  $regex: ".*" + searchTerm + ".*",
                                  $options: "i",
                              },
                          },
                      ],
                  }
                : {}),
        })
        .skip(pageOptions?.limit * (pageOptions?.page - 1))
        .limit(pageOptions?.limit)
        .sort("-updatedAt")
        .select("-_id -__v");

    const noteCounts = await cardModel.countDocuments({
        ...(searchTerm
            ? {
                  $or: [
                      {
                          to: {
                              $regex: ".*" + searchTerm + ".*",
                              $options: "i",
                          },
                      },
                      {
                          message: {
                              $regex: ".*" + searchTerm + ".*",
                              $options: "i",
                          },
                      },
                  ],
              }
            : {}),
    });

    return NextResponse.json({
        status: true,
        message: "Fetched cards",
        data: response,
        pagination: {
            ...pageOptions,
            total_pages: Math.ceil(noteCounts / pageOptions?.limit),
        },
    });
}
