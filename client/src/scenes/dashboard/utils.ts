import type { GetKpisResponse, GetKpisResponseStringMock } from "@/state/types";

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