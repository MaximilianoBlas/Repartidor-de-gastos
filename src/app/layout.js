import Providers from "./reduxToolkit/provider";
import { lighttheme, darktheme } from "./style/style.module.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body className={lighttheme}>{children}</body>
      </Providers>
    </html>
  );
}
