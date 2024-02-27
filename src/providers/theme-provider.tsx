import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#31304D",
            borderRadius: 2,
          },
          components: {
            Button: {
              controlHeight: 45,
              boxShadow: "none",
              colorPrimaryBgHover: "#31304D",
              colorPrimaryHover: "#31304D",
              controlOutline: "none",
              colorBorder: "#31304D",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </div>
  );
}

export default ThemeProvider;
