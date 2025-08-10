import type { GetKpisResponse, GetKpisResponseStringMock, GetProductsResponse, GetProductsResponseStringMock, GetTransactionsResponse, GetTransactionsResponseStringMock } from "@/state/types";

export const formatMockKpis = (mockData: GetKpisResponseStringMock[]): GetKpisResponse[] => {
  return mockData.map((kpi) => {
    return {
      // Properties that are already numbers or strings and don't need conversion
      id: kpi.id || '', // Assuming 'id' can be optional in mock but required in real
      _id: kpi._id,
      __v: kpi.__v || 0, // Assuming '__v' can be optional in mock but required in real
      createdAt: kpi.createdAt || '',
      updatedAt: kpi.updatedAt || '',

      // Convert string numbers to actual numbers
      totalProfit: parseFloat(kpi.totalProfit),
      totalRevenue: parseFloat(kpi.totalRevenue),
      totalExpenses: parseFloat(kpi.totalExpenses),

      expensesByCategory: {
        salaries: parseFloat(kpi.expensesByCategory.salaries),
        supplies: parseFloat(kpi.expensesByCategory.supplies),
        services: parseFloat(kpi.expensesByCategory.services),
      },

      monthlyData: kpi.monthlyData.map((monthData) => ({
        id: monthData.id || `${monthData.month}-${Math.random()}`, // Generate id if missing, or use existing
        month: monthData.month,
        revenue: parseFloat(monthData.revenue),
        expenses: parseFloat(monthData.expenses),
        nonOperationalExpenses: parseFloat(monthData.nonOperationalExpenses),
        operationalExpenses: parseFloat(monthData.operationalExpenses),
      })),

      dailyData: kpi.dailyData.map((dayData) => ({
        id: dayData.id || `${dayData.date}-${Math.random()}`, // Generate id if missing, or use existing
        date: dayData.date,
        revenue: parseFloat(dayData.revenue),
        expenses: parseFloat(dayData.expenses),
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
