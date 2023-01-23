import Student from "../../models/student";

export const findAll = async (req, res) => {
    try {
        const students = await Student.find();

        res.json({
        ok: true,
        data: students,
        });
    } catch (error) {
        res.json({
        ok: false,
        data: error.message,
        });
    }
};


export const create = async (req, res) => {
  try {
      const { body } = req;
      const user = new Student(body);
      user.save();

      res.json({
          ok: true,
          data: user,
      });
  } catch (error) {
      res.json({
          ok: false,
          data: error.message,
      });
  }
};