import type { GetKpisResponse, GetKpisResponseStringMock, GetProductsResponse, GetProductsResponseStringMock, GetTransactionsResponse, GetTransactionsResponseStringMock } from "@/state/types";

export const formatMockKpis = (mockData: GetKpisResponseStringMock[]): GetKpisResponse[] => {
  return mockData.map((kpi) => {
    return {
      id: kpi.id || `${Math.random()}`, // Assuming 'id' can be optional in mock but required in real
      _id: kpi._id,
      __v: kpi.__v || 0, // Assuming '__v' can be optional in mock but required in real
      createdAt: kpi.createdAt || new Date().toISOString(),
      updatedAt: kpi.updatedAt || new Date().toISOString(),

      // Convert string numbers to actual numbers
      totalProfit: parseFloat(kpi.totalProfit.replace("$", "")),
      totalRevenue: parseFloat(kpi.totalRevenue.replace("$", "")),
      totalExpenses: parseFloat(kpi.totalExpenses.replace("$", "")),

      expensesByCategory: {
        salaries: parseFloat(kpi.expensesByCategory.salaries.replace("$", "")),
        supplies: parseFloat(kpi.expensesByCategory.supplies.replace("$", "")),
        services: parseFloat(kpi.expensesByCategory.services.replace("$", "")),
      },

      monthlyData: kpi.monthlyData.map((monthData) => ({
        id: monthData.id || `${monthData.month}-${Math.random()}`,
        month: monthData.month,
        revenue: parseFloat(monthData.revenue.replace("$", "")),
        expenses: parseFloat(monthData.expenses.replace("$", "")),
        nonOperationalExpenses: parseFloat(monthData.nonOperationalExpenses.replace("$", "")),
        operationalExpenses: parseFloat(monthData.operationalExpenses.replace("$", "")),
      })),

      dailyData: kpi.dailyData.map((dayData) => ({
        id: dayData.id || `${dayData.date}-${Math.random()}`,
        date: dayData.date,
        revenue: parseFloat(dayData.revenue.replace("$", "")),
        expenses: parseFloat(dayData.expenses.replace("$", "")),
      })),
    };
  });
};

export const formatMockProducts = (
  mockData: GetProductsResponseStringMock[]
): GetProductsResponse[] => {
  return mockData.map((product) => {
    // Helper to clean and parse currency strings
    const parseCurrency = (value: string): number => {
      // Remove '$' and any commas, then parse to float
      return parseFloat(value.replace(/[^0-9.-]+/g, ""));
    };

    return {
      id: product._id, // Assuming _id serves as id
      _id: product._id,
      __v: 0, // Mock data does not have __v, setting to 0 or adjust as needed
      price: parseCurrency(product.price),
      expense: parseCurrency(product.expense),
      transactions: product.transactions,
      createdAt: new Date().toISOString(), // Mock data does not have these, set defaults
      updatedAt: new Date().toISOString(),
    };
  });
};

// New function to format mock transaction data
export const formatMockTransactions = (
  mockData: GetTransactionsResponseStringMock[]
): GetTransactionsResponse[] => {
  return mockData.map((transaction) => {
    // Helper to clean and parse currency strings
    const parseCurrency = (value: string): number => {
      // Remove '$' and any commas, then parse to float
      return parseFloat(value.replace(/[^0-9.-]+/g, ""));
    };

    return {
      id: transaction._id, // Assuming _id serves as id
      _id: transaction._id,
      __v: 0, // Mock data does not have __v, setting to 0 or adjust as needed
      buyer: transaction.buyer,
      amount: parseCurrency(transaction.amount),
      productIds: transaction.productIds,
      createdAt: new Date().toISOString(), // Mock data does not have these, set defaults
      updatedAt: new Date().toISOString(),
    };
  });
};
