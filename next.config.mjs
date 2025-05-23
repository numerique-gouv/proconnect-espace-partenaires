import createMDX from "@next/mdx";
import { withSentryConfig } from "@sentry/nextjs";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import ContentSecurityPolicy from "./csp.config.mjs";
import remarkAlerts from "./src/lib/remark-alerts.mjs";
import { remarkRelativeLinks } from "./src/lib/remark-relative-links.mjs";
import remarkShiki from "./src/lib/remark-shiki.mjs";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkRelativeLinks, remarkShiki, remarkAlerts],
    rehypePlugins: [
      [
        rehypeRaw,
        {
          passThrough: ["mdxjsEsm", "mdxFlowExpression", "mdxJsxFlowElement", "mdxJsxTextElement"],
        },
      ],
      rehypeSlug,
    ],
  },
});

// const withBundleAnalyzer = bundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// });

const pkg = await import("./package.json", { with: { type: "json" } });
const version = pkg.default.version;

/** @type {import('next').NextConfig} */
const moduleExports = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  crossOrigin: "anonymous",
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx", "md"],
  poweredByHeader: false,
  bundlePagesRouterDependencies: true,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff2|webmanifest)$/,
      type: "asset/resource",
    });
    return config;
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
    NEXT_PUBLIC_APP_VERSION_COMMIT: process.env.GITHUB_SHA,
    CONTENT_SECURITY_POLICY: ContentSecurityPolicy,
  },
  transpilePackages: ["@codegouvfr/react-dsfr", "tss-react"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Cross-Origin-Opener-Policy", value: "same-origin" }],
      },
    ];
  },
};

export default withMDX(withSentryConfig(moduleExports, { silent: true }));
