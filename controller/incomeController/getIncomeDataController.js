import { paginate } from "../../utils/paginate.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const modelName = "Income_Data";
const pageSize = 10;

const getIncomeDataController = async (req, res) => {
  const userId = req.uid;
  const page = req.query.page || 1;
  const category = req.query.category;
  const sortType = req.query.sort || "asc";
  const incomeSourceFilter = category?{incomeSourceId:category}:null;
  const paginatedResponse = await paginate(
    page,
    pageSize,
    modelName,
    {
      userId: userId,
      ...incomeSourceFilter
    },
    {
        createdAt: sortType,
    },
    {
      incomeAmount: true,
      incomeSourceId: true,
      incomeId:true,
      createdAt: true,
    }
  );

    const response = await Promise.all(paginatedResponse.items.map(async (item) => {
    const incomeSource = await prisma.income_Source.findUnique({
      where: {
        id: item.incomeSourceId,
      },
      select:{
        incomeSource:true,
        isFixed:true,
      }
    });
    return { ...item, incomeSource: incomeSource };
  }));

  res.json({items:response, totalCount: paginatedResponse.totalCount});
};

export default getIncomeDataController;
