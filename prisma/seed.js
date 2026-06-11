import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const USER_ID = process.env.FIREBASE_UID || "test-firebase-uid";

await prisma.user.upsert({
  where: { id: USER_ID },
  update: {},
  create: {
    id: USER_ID,
    username: "Peter Parker",
  },
});

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getOrCreateCategory(name, isFixed = false) {
  const existing = await prisma.expense_Category.findFirst({
    where: { userId: USER_ID, expenseCategory: name },
  });

  if (existing) return existing.id;

  const created = await prisma.expense_Category.create({
    data: {
      userId: USER_ID,
      expenseCategory: name,
      isFixed,
    },
  });

  return created.id;
}

async function getOrCreateIncomeSource(name, isFixed = false) {
  const existing = await prisma.income_Source.findFirst({
    where: { userId: USER_ID, incomeSource: name },
  });

  if (existing) return existing.id;

  const created = await prisma.income_Source.create({
    data: {
      userId: USER_ID,
      incomeSource: name,
      isFixed,
    },
  });

  return created.id;
}

async function main() {
  if (!USER_ID) throw new Error("Missing Firebase UID");

  // -----------------------------
  // Sources + Categories
  // -----------------------------
  const internship = await getOrCreateIncomeSource(
    "Part-time Internship",
    true,
  );
  const freelance = await getOrCreateIncomeSource("Freelance Work", false);

  const food = await getOrCreateCategory("Food", false);
  const transport = await getOrCreateCategory("Transport", false);
  const education = await getOrCreateCategory("Education", true);
  const entertainment = await getOrCreateCategory("Entertainment", false);
  const health = await getOrCreateCategory("Health", false);
  const shopping = await getOrCreateCategory("Shopping", false);

  // -----------------------------
  // Income (1 month demo)
  // -----------------------------
  await prisma.income_Data.createMany({
    data: [
      {
        userId: USER_ID,
        incomeAmount: 15000,
        incomeSourceId: internship,
        createdAt: new Date(2026, 5, 1),
      },
      {
        userId: USER_ID,
        incomeAmount: 5000,
        incomeSourceId: freelance,
        createdAt: new Date(2026, 5, 7),
      },
      {
        userId: USER_ID,
        incomeAmount: 7000,
        incomeSourceId: freelance,
        createdAt: new Date(2026, 5, 14),
      },
      {
        userId: USER_ID,
        incomeAmount: 2000,
        incomeSourceId: internship,
        createdAt: new Date(2026, 5, 28),
      },
    ],
  });

  // -----------------------------
  // Expenses (realistic month)
  // -----------------------------
  const expenses = [];

  for (let day = 1; day <= 30; day++) {
    const date = new Date(2026, 5, day);
    const dow = date.getDay();

    // Food (frequent)
    if (Math.random() > 0.4) {
      expenses.push({
        userId: USER_ID,
        expenseAmount: random(200, 1200),
        expenseCategoryId: food,
        expenseDescription: "Food / groceries",
        createdAt: date,
      });
    }

    // Transport (weekdays)
    if (dow >= 1 && dow <= 5 && Math.random() > 0.5) {
      expenses.push({
        userId: USER_ID,
        expenseAmount: random(50, 200),
        expenseCategoryId: transport,
        expenseDescription: "Transport",
        createdAt: date,
      });
    }

    // Entertainment (weekend)
    if (dow >= 5 && Math.random() > 0.7) {
      expenses.push({
        userId: USER_ID,
        expenseAmount: random(300, 1500),
        expenseCategoryId: entertainment,
        expenseDescription: "Entertainment",
        createdAt: date,
      });
    }

    // Shopping (rare)
    if (Math.random() > 0.85) {
      expenses.push({
        userId: USER_ID,
        expenseAmount: random(500, 3000),
        expenseCategoryId: shopping,
        expenseDescription: "Shopping",
        createdAt: date,
      });
    }
  }

  // Fixed costs
  expenses.push(
    {
      userId: USER_ID,
      expenseAmount: 4000,
      expenseCategoryId: education,
      expenseDescription: "Course fee",
      createdAt: new Date(2026, 5, 5),
    },
    {
      userId: USER_ID,
      expenseAmount: 1000,
      expenseCategoryId: health,
      expenseDescription: "Medicines",
      createdAt: new Date(2026, 5, 18),
    },
  );

  await prisma.expense_Data.createMany({ data: expenses });

  // -----------------------------
  // Saving Goal
  // -----------------------------
  await prisma.saving_Goal.create({
    data: {
      userId: USER_ID,
      savingGoalAmount: 50000,
      createdAt: new Date(2026, 5, 1),
    },
  });

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
