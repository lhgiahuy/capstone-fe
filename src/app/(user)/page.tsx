import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  // const [user] = useAtom(userAtom);
  return <>{JSON.stringify(session?.user.username)}</>;
}
