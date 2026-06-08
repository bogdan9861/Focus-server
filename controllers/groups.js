const { prisma } = require("../prisma/prisma.client");

const getGroups = async (req, res) => {
  try {
    const { organizationId } = req.body;

    const groups = await prisma.group.findMany({
      where: {
        organizationId,
      },
    });

    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

module.exports = {
  getGroups,
};
