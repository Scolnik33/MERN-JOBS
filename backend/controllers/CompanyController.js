import { validationResult } from "express-validator";
import Company from "../models/Company.js";
import User from "../models/User.js";
import Job from "../models/Job.js";

export const createCompany = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const user = await User.findById(req.userId);
    const { name, description, image } = req.body;

    const company = new Company({
      name,
      description,
      image,
    });

    await company.save();

    await User.findByIdAndUpdate(req.userId, {
      $push: { company: company },
    });

    await Company.findOneAndUpdate(company, {
      $push: { representatives: user },
    });

    res.json(company);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось зарегистрировать компанию",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const { limit = 4, page = 1 } = req.query;

    const companies = await Company.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort("-rating");

    res.json(companies);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось получить все компании",
    });
  }
};

export const getOneCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate([
      "vacancies",
      "representatives",
      "voters",
    ]);

    res.json(company);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось получить определнную компанию",
    });
  }
};

export const getOneForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("user");
    const company = await job.user.populate("company");

    res.json(company.company);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось получить определенную компанию",
    });
  }
};

export const addRating = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    await Company.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { rating: req.body.rating },
        $push: { voters: user },
      },
      {
        returnDocument: "after",
      }
    );
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось поставить рейтинг компании",
    });
  }
};
