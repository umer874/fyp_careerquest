import Wrapper from "components/common/wrapper";
import { GetCookieUser } from "utils/server-side-helper";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = GetCookieUser();
  return <Wrapper user={user}>{children}</Wrapper>;
};

export default Layout;
