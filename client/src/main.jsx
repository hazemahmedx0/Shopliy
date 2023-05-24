import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'

import { AuthProvider } from './context/auth'
import { CartProvider } from './context/cartctx'
import { BagProvider } from './context/BagContext.jsx'
import { CatProvider } from './context/catCtx.jsx'
import { WishListBagProvider } from './context/WishListContext.jsx'
import { WishListProvider } from './context/wishListCTX.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <React.StrictMode>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'light',
            focusRing: 'always',
            defaultRadius: 8,
            colors: {
              brand: [
                '#F6FEF9',
                '#ECFDF3',
                '#D1FADF',
                '#A6F4C5',
                '#6CE9A6',
                '#32D583',
                '#15BE53',
                '#027A48',
                '#05603A',
                '#054F31',
              ],
            },
            primaryColor: 'brand',
            primaryShade: 6,
            cursorType: 'pointer',

            fontFamily:
              'Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;',
          }}
        >
          <Notifications />
          <ModalsProvider>
            <CartProvider>
              <BagProvider>
                <CatProvider>
                  <WishListProvider>
                    <WishListBagProvider>
                      <App />
                    </WishListBagProvider>
                  </WishListProvider>
                </CatProvider>
              </BagProvider>
            </CartProvider>
          </ModalsProvider>
        </MantineProvider>
      </React.StrictMode>
    </BrowserRouter>
  </AuthProvider>
)
