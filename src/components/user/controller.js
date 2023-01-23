import { PrismaClient } from "@prisma/client";
import Pusher from "pusher";

const prisma = new PrismaClient();

const pusher = new Pusher({
  appId: "1542383",
  key: "b5ad2f998793b8d713c8",
  secret: "920ba37dcf179e67babd",
  cluster: "us2",
  useTLS: true
  });

export const findAll = async (_req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ ok: true, data: users });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      data: error.message,
    });
  }
};

const findOne = async (email) => {
  try {
    return await prisma.user.findFirst({
      where: { email },
    });
  } catch (error) {
    return null;
  }
};

export const findUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const user = await prisma.user.findUnique({
      where: { id: id},
    });

    res.json({ok:true, data: user});
  } catch (error) {
    return res.status(500).json({
      ok: false,
      data: error.message,
    });
  }
};

export const store = async (req, res) => {
  try {
    const { body } = req;
    const userByEmail = await findOne(body.email);

    if (userByEmail) {
      return res.json({
        ok: true,
        data: userByEmail,
      });
    }

    body.profile_url = `https://avatars.dicebear.com/api/avataaars/${body.name}.svg`;

    const user = await prisma.user.create({
      data: {
        ...body,
      },
    });
    pusher.trigger ("my-chat", "my-list-contacts",{
      message: "Call to update list contacts"
  });

    res.status(201).json({
      ok: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      data: error.message,
    });
  }
};
