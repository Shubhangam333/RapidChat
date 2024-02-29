import Content from "./layout-components/content";
import Header from "./layout-components/header";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <Content>{children}</Content>
    </div>
  );
}

export default LayoutProvider;
