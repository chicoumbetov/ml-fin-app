// module augmentation
// https://mui.com/material-ui/customization/theming/
declare module "@mui/material" {
  interface PaletteColor {
    [key: number]: string;
  }

  interface Palette {
    tertiary: PaletteColor;
  }
}