import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'

import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from 'react-toastify'
import Routes from './routes'
import { UseContextProvider } from './components/contexts/selected-level-context'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <UseContextProvider>
        <Routes />
      </UseContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
