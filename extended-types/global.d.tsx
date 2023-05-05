declare namespace NodeJS {
  interface ProcessEnv {
    readonly CONNECTION_URL: string;
    readonly NEXTAUTH_URL: string;
    readonly NEXTAUTH_SECRET: string;
  }
}
