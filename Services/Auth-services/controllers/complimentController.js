import Compliment from "../models/Compliments.js";
import Profile from "../models/Profile.js";

export const getCompliments = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const compliments = await Compliment.find({
      profile: profile._id,
    }).sort({ year: -1 });

    const totalCompliments = compliments.reduce(
      (total, item) =>
        total +
        Number(item.membershipAmount || 0) +
        Number(item.specialContribution || 0) +
        Number(item.backlogAmount || 0),
      0
    );

    res.status(200).json({
      success: true,
      count: compliments.length,
      totalCompliments,
      compliments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};