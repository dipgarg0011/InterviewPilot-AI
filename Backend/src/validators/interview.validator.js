const { z } = require("zod");

const createInterviewSchema = z.object({
  selfdescription: z.string().trim().min(10).max(5000),
  jobdescription: z.string().trim().min(10).max(5000),
});


function validateCreateInterview(req, res, next) {
  const result = createInterviewSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: result.error.flatten().fieldErrors,
    });
  }
  req.body = result.data; // use sanitized/coerced data
  next();
}

module.exports = { validateCreateInterview };
