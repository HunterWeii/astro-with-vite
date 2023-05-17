import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@containers/App';
import './index.css';
import {
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
)

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       cacheTime: 1000 * 60 * 60 * 24, // 24 hours
//     },
//   },
// });

// const localStoragePersister = createSyncStoragePersister({ 
//   storage: window.localStorage 
// });

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <PersistQueryClientProvider 
//       client={queryClient}
//       persistOptions={{ persister: localStoragePersister }}
//     >
//       <App />
//       <ReactQueryDevtools />
//     </PersistQueryClientProvider>
//   </React.StrictMode>,
// )

