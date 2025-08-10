import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, type GridCellParams } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Cell, Pie, PieChart } from "recharts";

import { kpis as mockKpis, products as mockProducts, transactions as mockTransactions } from "@/assets/data/data";
import type { GetKpisResponse, GetProductsResponse, GetTransactionsResponse } from "@/state/types";
import { formatMockKpis, formatMockProducts, formatMockTransactions } from "./utils";


const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];

  const {
    data: serverKpiData,
    isFetching: isFetchingKpis,
    isError: isErrorKpis,
  } = useGetKpisQuery();
  const {
    data: serverProductData,
    isFetching: isFetchingProducts,
    isError: isErrorProducts,
  } = useGetProductsQuery();
  const {
    data: serverTransactionData,
    isFetching: isFetchingTransactions,
    isError: isErrorTransactions,
  } = useGetTransactionsQuery();

  // State to hold the displayed data, either from server or mock
  const [displayKpiData, setDisplayKpiData] = useState<GetKpisResponse[]>([]);
  const [displayProductData, setDisplayProductData] = useState<GetProductsResponse[]>([]);
  const [displayTransactionData, setDisplayTransactionData] = useState<GetTransactionsResponse[]>([]);

  useEffect(() => {
    if (!isFetchingKpis && serverKpiData) {
      setDisplayKpiData(serverKpiData);
    } else if (!isFetchingKpis && isErrorKpis) {
      toast.warn("Data is currently unavailable. The server might be starting up. Please wait around 2 minutes.");
      setDisplayKpiData(formatMockKpis(mockKpis));
    } // else if (!isFetchingKpis && !serverKpiData) {
      setDisplayKpiData(formatMockKpis(mockKpis));
    // }
  }, [serverKpiData, isFetchingKpis, isErrorKpis]);

  useEffect(() => {
    if (!isFetchingProducts && serverProductData) {
      setDisplayProductData(serverProductData);
    } else if (!isFetchingProducts && isErrorProducts) {
      toast.warn("The server is waking up to fetch product data.");
      setDisplayProductData(formatMockProducts(mockProducts));
    } // else if (!isFetchingProducts && !serverProductData) {
      setDisplayProductData(formatMockProducts(mockProducts));
    // }
  }, [serverProductData, isFetchingProducts, isErrorProducts]);

  useEffect(() => {
    if (!isFetchingTransactions && serverTransactionData) {
      setDisplayTransactionData(serverTransactionData);
    } else if (!isFetchingTransactions && isErrorTransactions) {
      toast.warn("The server is waking up to fetch transaction data.");
      setDisplayTransactionData(formatMockTransactions(mockTransactions));
    } // else if (!isFetchingTransactions && !serverTransactionData) {
      setDisplayTransactionData(formatMockTransactions(mockTransactions));
    // }
  }, [serverTransactionData, isFetchingTransactions, isErrorTransactions]);


  const pieChartData = useMemo(() => {
    /*
    if (kpiData) {
      const totalExpenses = kpiData[0]?.totalExpenses;
      return kpiData && Object.entries(kpiData[0]?.expensesByCategory)?.map(
    */
    if (displayKpiData.length > 0 && displayKpiData[0]) {
      const totalExpenses = displayKpiData[0].totalExpenses;
      return Object.entries(displayKpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
    return [];
  }, [displayKpiData]);
  // }, [kpiData]);

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          sideText={`${displayProductData?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={displayProductData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sideText={`${displayTransactionData?.length} latest transactions`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={displayTransactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="j">
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sideText="+15%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam
          ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas
          molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare
          sed. In volutpat nullam at est id cum pulvinar nunc.
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;
