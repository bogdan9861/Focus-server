const { prisma } = require("../prisma/prisma.client");

const getOrganizations = async (req, res) => {
  try {
    const organizations = await prisma.organization.findMany();

    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

module.exports = {
  getOrganizations,
};
