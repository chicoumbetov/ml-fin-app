import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { useMemo } from "react"
import { themeSettings } from "./theme"

function App() {
  const theme = useMemo(() => createTheme(themeSettings), [])
  return (
      <div className="app">
        <ThemeProvider theme={theme}>
          <CssBaseline/>
        </ThemeProvider>
      </div>
  )
}

export default App
