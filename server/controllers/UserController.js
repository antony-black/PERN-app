const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const { User, Basket } = require("../models/models");
const ApiError = require("../error/ApiError");

const generateToken = (id, email, role) => {
  const token = jwt.sign(
    { id, email, role },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return token;
}

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      return next(ApiError.badRequest(
        `UserController/registration: User with this email, ${email}, has been existed`
      )
    );
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const user = await User.create({ email, password: hashedPassword, role });
    const basket = await Basket.create({ userId: user.id });
    const token = generateToken(user.id, user.email, user.role);

    return res.json({token});
  }

  async login(req, res, next) {
    const { email, password, role } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return next(ApiError.internal(
          `UserController/login: User with this email, ${email}, hasn't been existed! Please get registration!`
        )
      );
    }

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
        return next(ApiError.internal(
          `UserController/login: wrong password!`
        )
      );
    }

    const token = generateToken(user.id, user.email, user.role);

    return res.json({token});
  }

  async checkAuth(req, res, next) {
    const token = generateToken(req.user.id, req.user.email, req.user.role);

    res.json({token});
  }
}

module.exports = new UserController();
