import { NextjsSite, StackContext, Table } from "sst/constructs";
import { z } from "zod";

export function ExampleStack({ stack, app }: StackContext) {
  interface EnvVars {
    NEXT_PUBLIC_GTM_ID: string;
    NEXT_PUBLIC_FRONTEND_DOMAIN: string;
    NEXT_PUBLIC_STRAPI_API_URL: string;
    NEXT_PUBLIC_USERCENTRICS_SETTINGS_ID: string;
    SENDGRID_API_KEY: string;
  }

  const myEnvVars = z.object({
    NEXT_PUBLIC_GTM_ID: z.string(),
    NEXT_PUBLIC_FRONTEND_DOMAIN: z.string(),
    NEXT_PUBLIC_STRAPI_API_URL: z.string(),
    NEXT_PUBLIC_USERCENTRICS_SETTINGS_ID: z.string(),
    SENDGRID_API_KEY: z.string(),
  });

  const envVars: EnvVars = myEnvVars.parse(process.env);

  // Create a Next.js site
  const site = new NextjsSite(stack, "Site", {
    path: "packages/frontend",
    runtime: "nodejs14.x",
    timeout: "5 seconds",
    memorySize: "2048 MB",
    imageOptimization: {
      memorySize: "2048 MB",
    },
    // customDomain: process.env.NEXT_PUBLIC_FRONTEND_DOMAIN,
    environment: {
      REGION: app.region,
      NEXT_PUBLIC_GTM_ID: envVars.NEXT_PUBLIC_GTM_ID,
      NEXT_PUBLIC_FRONTEND_DOMAIN: envVars.NEXT_PUBLIC_FRONTEND_DOMAIN,
      NEXT_PUBLIC_STRAPI_API_URL: envVars.NEXT_PUBLIC_STRAPI_API_URL,
      NEXT_PUBLIC_USERCENTRICS_SETTINGS_ID:
        envVars.NEXT_PUBLIC_USERCENTRICS_SETTINGS_ID,
      SENDGRID_API_KEY: envVars.SENDGRID_API_KEY,
    },
  });

  // Show the site URL in the output
  stack.addOutputs({
    URL: site.url || "http://localhost:3000",
  });
}
