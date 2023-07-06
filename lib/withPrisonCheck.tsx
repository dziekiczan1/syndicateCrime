import {
  MiddlewareResponse,
  prisonMiddleware,
} from "@/pages/api/middleware/prisonMiddleware";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

export function withPrisonCheck(
  getPageProps: (context: GetServerSidePropsContext) => Promise<any>
) {
  return async function getServerSideProps(context: GetServerSidePropsContext) {
    const response: MiddlewareResponse = await prisonMiddleware(
      context.req as NextApiRequest,
      context.res as NextApiResponse
    );

    if (response.error) {
      return {
        redirect: {
          destination: "/actions/prison",
          permanent: false,
        },
      };
    }

    if (response.isPrisoner) {
      return {
        redirect: {
          destination: "/actions/prison",
          permanent: false,
        },
      };
    }

    return await getPageProps(context);
  };
}
