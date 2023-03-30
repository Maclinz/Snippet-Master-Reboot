import Head from 'next/head'
import React from 'react'
import { UserProvider } from '../context/context'
import { CrudProvider } from '../context/crudContext'
import { SnipetProvider } from '../context/snippetContext'
import { CrudTagsProvider } from '../context/tagsContext'
import { ThemeProider } from '../context/themeContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head lang='en'>
          <title>Snippet Master</title>
          <meta name="description" content="Save and Download Code Snippets" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />        
      </Head>
      <UserProvider>
        <ThemeProider>
          <SnipetProvider>
            <CrudTagsProvider>
              <CrudProvider>
                  <Component {...pageProps} />
              </CrudProvider>
            </CrudTagsProvider>
          </SnipetProvider>
        </ThemeProider>
      </UserProvider>
    </React.Fragment>
  )
}

export default MyApp
