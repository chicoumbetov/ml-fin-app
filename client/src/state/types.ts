export interface ExpensesByCategory {
  salaries: number;
  supplies: number;
  services: number;
}

export interface Month {
  id: string;
  month: string;
  revenue: number;
  expenses: number;
  nonOperationalExpenses: number;
  operationalExpenses: number;
}

export interface Day {
  id: string;
  date: string;
  revenue: number;
  expenses: number;
}

export interface GetKpisResponse {
  id: string;
  _id: string;
  __v: number;
  totalProfit: number;
  totalRevenue: number;
  totalExpenses: number;
  expensesByCategory: ExpensesByCategory;
  monthlyData: Array<Month>;
  dailyData: Array<Day>;
  createdAt: string;
  updatedAt: string;
}

export interface GetProductsResponse {
  id: string;
  _id: string;
  __v: number;
  price: number;
  expense: number;
  transactions: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export interface GetTransactionsResponse {
  id: string;
  _id: string;
  __v: number;
  buyer: string;
  amount: number;
  productIds: Array<string>;
  createdAt: string;
  updatedAt: string;
}

// * MOCK DATA
export interface ExpensesByCategoryStringMock {
  salaries: string;
  supplies: string;
  services: string;
}

export interface MonthStringMock {
  id?: string;
  month: string;
  revenue: string;
  expenses: string;
  nonOperationalExpenses: string;
  operationalExpenses: string;
}

export interface DayStringMock {
  id?: string;
  date: string;
  revenue: string;
  expenses: string;
}

export interface GetKpisResponseStringMock {
  id?: string;
  _id: string;
  __v?: number;
  totalProfit: string;
  totalRevenue: string;
  totalExpenses: string;
  expensesByCategory: ExpensesByCategoryStringMock;
  monthlyData: Array<MonthStringMock>;
  dailyData: Array<DayStringMock>;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetProductsResponseStringMock {
  _id: string;
  price: string;
  expense: string;
  transactions: Array<string>;
}

export interface GetTransactionsResponseStringMock {
  _id: string;
  amount: string;
  buyer: string;
  productIds: Array<string>;
}
