
import Providers from "./reduxToolkit/provider"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <Providers>
      <body >{children}</body>
        </Providers>
    </html>
  )
}
