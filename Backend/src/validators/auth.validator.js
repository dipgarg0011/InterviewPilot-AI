const { z } = require("zod");

const registerSchema = z.object({
  username: z.string().trim().min(2).max(60),
  email: z.string().trim().toLowerCase().email().max(255),
  password: z.string().min(8).max(128),
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
  password: z.string().min(1).max(128),
});

function validate(schema) {
  return (req, res, next) => {
    const r = schema.safeParse(req.body);
    if (!r.success) return res.status(400).json({ message: "Invalid input", errors: r.error.flatten().fieldErrors });
    req.body = r.data;
    next();
  };
}

module.exports = { validate, registerSchema, loginSchema };
