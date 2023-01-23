import Teacher from "../../models/teacher";
export const create = async (req, res) => {
    try {
        const { body } = req;
        const teacher = new Teacher(body);
        teacher.save();
  
        res.json({
            ok: true,
            data: teacher,
        });
    } catch (error) {
        res.json({
            ok: false,
            data: error.message,
        });
    }
  };