import {
  LifeMiddlewareResponse,
  lifeMiddleware,
} from "@/pages/api/middleware/lifeMiddleware";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

export function withLifeCheck(
  getPageProps: (context: GetServerSidePropsContext) => Promise<any>
) {
  return async function getServerSideProps(context: GetServerSidePropsContext) {
    const lifeResponse: LifeMiddlewareResponse = await lifeMiddleware(
      context.req as NextApiRequest,
      context.res as NextApiResponse
    );

    if (lifeResponse.error || lifeResponse.isPlayerDead) {
      return {
        redirect: {
          destination: "/actions/hospital",
          permanent: false,
        },
      };
    }

    return await getPageProps(context);
  };
}
