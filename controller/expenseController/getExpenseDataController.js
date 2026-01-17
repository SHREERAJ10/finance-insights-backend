import { paginate } from "../../utils/paginate.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const modelName = "Expense_Data";
const pageSize = 10;

const getExpenseDataController = async (req, res) => {
  const userId = req.uid;
  const page = req.query.page || 1;
  const category = req.query.category;
  const sortType = req.query.sort || "asc";
  const categoryFilter = category?{expenseCategoryId:category}:null;
  const paginatedResponse = await paginate(
    page,
    pageSize,
    modelName,
    {
      userId: userId,
      ...categoryFilter
    },
    {
      createdAt: sortType,
    },
    {
      expenseAmount: true,
      expenseCategoryId: true,
      expenseDescription: true,
      expenseId: true,
      createdAt: true,
    }
  );

  const response = await Promise.all(paginatedResponse.items.map(async (item) => {
    const expenseCategory = await prisma.expense_Category.findUnique({
      where: {
        id: item.expenseCategoryId,
      },
      select:{
        expenseCategory:true,
        isFixed:true,
      }
    });
    return { ...item, expenseCategory: expenseCategory };
  }));

  res.json({items:response, totalCount: paginatedResponse.totalCount});
};

export default getExpenseDataController;
