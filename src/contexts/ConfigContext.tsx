import { createContext, useContext, useState, type ReactNode } from 'react'

interface Config {
  immichApiKey: string
  setImmichApiKey: (key: string) => void
}

const ConfigContext = createContext<Config | undefined>(undefined)

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [immichApiKey, setImmichApiKey] = useState<string>('')

  return (
    <ConfigContext.Provider value={{ immichApiKey, setImmichApiKey }}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider')
  }
  return context
}
