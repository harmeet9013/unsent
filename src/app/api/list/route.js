import { cardModel, connectDB, errorResponse, successResponse } from "@/server";

export async function GET(req) {
    const dbConnected = await connectDB();

    if (!!dbConnected) {
        const searchTerm = req?.nextUrl?.searchParams?.get("search");
        const pageOptions = {
            page: searchTerm
                ? 1
                : parseInt(req.nextUrl.searchParams.get("page")) || 1,
            limit: searchTerm
                ? 9
                : parseInt(req.nextUrl.searchParams.get("limit")) || 9,
        };

        try {
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

            return successResponse("Fetched cards", {
                data: response,
                pagination: {
                    ...pageOptions,
                    total_pages: Math.ceil(noteCounts / pageOptions?.limit),
                },
            });
        } catch (error) {
            return errorResponse("Error fetching data", {
                data: [],
                pagination: false,
            });
        }
    } else {
        return errorResponse("Error fetching data", {
            data: [],
            pagination: false,
        });
    }
}
