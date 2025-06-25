import Wrapper from "components/common/wrapper";
import { GetTokensFromCookies } from "utils/server-side-helper";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = GetTokensFromCookies();
  return <Wrapper user={user}>{children}</Wrapper>;
};

export default Layout;
