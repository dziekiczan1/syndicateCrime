import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export function withSessionCheck(
  getPageProps: (context: GetServerSidePropsContext) => Promise<any>
) {
  return async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);

    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return await getPageProps(context);
  };
}
