import {
  PrisonMiddlewareResponse,
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
    const prisonResponse: PrisonMiddlewareResponse = await prisonMiddleware(
      context.req as NextApiRequest,
      context.res as NextApiResponse
    );

    if (prisonResponse.error || prisonResponse.isPrisoner) {
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
