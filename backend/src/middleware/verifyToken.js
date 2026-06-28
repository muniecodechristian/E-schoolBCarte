import { config } from "dotenv";
import jwt from "jsonwebtoken";

config

export const verifyToken = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
	try {
		const decoded = jwt.verify(token,"erfrftrvrvrvrvgvtgvrvrvrrrdcxcdsgjhkljl:tuyhtgezcdarehrjtililuyzraefarhy%%%%%%µµµµµ¨¨¨¨¨MMMMMVCBXBcvccbackendbilleterie");

		if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
		req.user=decoded
		req.userId = decoded.userId;
		next();
	} catch (error) {
		console.log("Error in verifyToken ", error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
};
