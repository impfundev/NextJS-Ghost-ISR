export const metadata = {

  title: 'NextJs Ghost',

  description: 'NextJs with Ghost as a headless CMS',

};

export default function RootLayout({

  // Layouts must accept a children prop.

  // This will be populated with nested layouts or pages

  children,

}) {

  return (

    <html lang="en">

      <body>{children}</body>

    </html>

  );

}
