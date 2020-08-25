import Head from 'next/head'
import Header from './header'
import Sidebar from './menu/sidebar'

const siteName = "SES 2B";
const defaultMeta = {
  title: "Unnamed Page",
  description: "A page so new to " + siteName + " that it doesn't have a description.",
  description: "/favicon.ico",
};

function validateMeta(meta) {
  return {
    title:       (meta.title       || defaultMeta.title) + " | " +  siteName,
    description: (meta.description || defaultMeta.description),
    image:       (meta.image       || defaultMeta.image),
  };
}

function Layout({ user, loading = false, meta = {}, children }) {

  let valid_meta = validateMeta(meta);

  return (
    <>
      <Head>
          <title>{ valid_meta.title }</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="og:title" content={ valid_meta.title } />
          <meta name="description" content={ valid_meta.description } />
          <meta property="og:image" content={ valid_meta.image } />
          <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header user={user} loading={loading} />
      <Sidebar/>

      <main>
        <div className="container">{children}</div>
      </main>

      <style jsx>{`
        .container {
          max-width: 42rem;
          margin: 1.5rem auto;
        }
      `}</style>
      <style jsx global>{`
        body {
          margin: 0;
          color: #333;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
      `}</style>
    </>
  )
}

export default Layout
