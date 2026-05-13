import transactions from "../models/transactions.js";
export const getTransactions = async (req, res) => {
  try {
    const result = await transactions.find()
      .populate("member", "name")
      .sort({ year: -1, date: -1 });
    res.status(200).json({
      success: true,
      transactions: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};