/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from 'react'

import { merge } from 'lodash'

import { MatxLayoutSettings } from "../components/MatxLayout/settings";

const SettingsContext = createContext({
    settings: MatxLayoutSettings,
    updateSettings: () => { },
})

export const SettingsProvider = ({ settings, children }: any) => {
    const [currentSettings, setCurrentSettings]: any = useState(
        settings || MatxLayoutSettings
    )

    const handleUpdateSettings = (update = {}) => {
        const marged = merge({}, currentSettings, update)
        setCurrentSettings(marged)
    }

    return (
        <SettingsContext.Provider
            value={{
                settings: currentSettings,
                updateSettings: handleUpdateSettings,
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsContext;