import { createRoot } from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { AppProvider } from './routes/Router.tsx'
import './base_styles.scss'
import { Provider } from 'react-redux'
import { store } from './store/store.tsx'
import { CookiesProvider } from 'react-cookie'

createRoot(document.getElementById('root')!).render(
    <CssBaseline>
        {/* <CookiesProvider> */}
        <Provider store={store}>
            <AppProvider/>
        </Provider>
        {/* </CookiesProvider> */}
    </CssBaseline>
)
