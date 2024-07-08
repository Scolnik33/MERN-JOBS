import Job from "../models/Job.js";
import { validationResult } from "express-validator";
import User from "../models/User.js";
import Company from "../models/Company.js";

export const getAll = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 5,
      location = "",
      employment = "",
      experience = "",
      category = "",
      filter,
    } = req.query;

    const Jobs = await Job.find({
      location: { $regex: location },
      employment: { $regex: employment },
      experience: { $regex: experience },
      category: { $regex: category },
      salary: {
        $gte: req.query.priceFrom || 0,
        $lte: req.query.priceTo || 9999999999,
      },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(
        filter == "popular"
          ? "-quantityViews"
          : filter == "old"
          ? "createdAt"
          : "-createdAt"
      );

    res.json(Jobs);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось получить все вакансии",
    });
  }
};

export const getone = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findByIdAndUpdate(jobId, {
      $inc: { quantityViews: 1 },
    }).populate("user");

    res.json(job);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось получить вакансию",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(['favorities', 'company']);

    res.json(user);
  } catch (err) {
    console.log(err);
    res.json({
      message: 'Не удалось получить профиль'
    })
  }
}

export const getmyjobs = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const jobs = await Promise.all(
      user.jobs.map((item) => {
        return Job.findById(item._id);
      })
    );

    res.json(jobs);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось получить ваши вакансии",
    });
  }
};

export const getFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const jobs = await Promise.all(
      user.favorities.map((item) => {
        return Job.findById(item._id);
      })
    );

    res.json(jobs);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось получить желаемые вакансии",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("user");
    const company = await job.user.populate("company");

    await Job.findByIdAndDelete(req.params.id);

    await User.findByIdAndUpdate(req.userId, {
      $pull: { jobs: req.params.id },
    });

    await Company.findByIdAndUpdate(company.company[0], {
      $pull: { vacancies: req.params.id },
    });

    res.json({
      message: "Вакансия была успешно удалена",
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось удалить вакансию",
    });
  }
};

export const update = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const {
      vacancy,
      description,
      salary,
      location,
      employment,
      experience,
      category,
      image,
    } = req.body;

    await Job.updateOne(
      {
        _id: req.params.id,
      },
      {
        vacancy,
        description,
        salary,
        location,
        employment,
        experience,
        category,
        image,
        quantityViews: 0,
      }
    );

    res.json({
      message: "Вакансия была успешно обновлена",
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось обновить вакансию",
    });
  }
};

export const create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const user = await User.findById(req.userId);
    const {
      vacancy,
      description,
      salary,
      location,
      employment,
      experience,
      category,
      image,
    } = req.body;

    const job = await new Job({
      vacancy,
      description,
      salary,
      location,
      employment,
      experience,
      category,
      image,
      user: req.userId,
    }).save();

    await User.findByIdAndUpdate(req.userId, {
      $push: { jobs: job },
    });

    await Company.findByIdAndUpdate(user.company, {
      $push: { vacancies: job },
    });

    res.json(job);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось создать вакансию",
    });
  }
};

export const addFavorite = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    await User.findByIdAndUpdate(req.userId, {
      $push: { favorities: job },
    });

    res.json({
      message: "Вакансия успешно добавлена в желаемые",
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось добавить вакансию в желаемые",
    });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, {
      $pull: { favorities: req.params.id },
    });

    res.json({
      message: "Ваканасия успешно удалена из желаемых",
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось удалить вакансию из желаемых",
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Job.aggregate([
      { $group: { _id: "$category", sum: { $sum: 1 } } },
    ]).sort("-quantityViews");

    res.json(categories);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось посчитать количество категорий",
    });
  }
};
