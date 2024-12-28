// Tools
import UserReviewsAPI from "@/utils/api/pages/UserReviewsAPI";
// Types
import type { NextApiResponse, NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(404).end();

    try {
        const API = new UserReviewsAPI(req);
        await API.ensureThatUserExists();
        const data = await API.getReviews();

        return res.send(data);
    } catch (e: unknown) {
        res.status(500).end();
    }
}
