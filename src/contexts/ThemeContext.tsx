import React, { createContext, useContext, useState, ReactNode } from "react";
import { ConfigProvider, theme as AntDTheme } from "antd";

interface ThemeContextType {
  themeMode: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

export const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({
  children,
}) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const { defaultAlgorithm, darkAlgorithm } = AntDTheme;

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {/* Configure Ant Design theme based on themeMode */}
      <ConfigProvider
        theme={{
          algorithm: themeMode === "light" ? defaultAlgorithm : darkAlgorithm,
          token: {
            colorPrimary: "#1890ff",
            borderRadius: 8,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProviderWrapper");
  }
  return context;
};
