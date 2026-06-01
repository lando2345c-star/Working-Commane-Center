export const metadata = {
  title: 'Command Center',
  description: 'My personal command center',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#0B0D12" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Command Center" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#0B0D12' }}>
        {children}
      </body>
    </html>
  )
}
