import withPWA from "next-pwa";

const baseConfig = {
  reactStrictMode: true,
  turbopack: {},
  webpack: (config) => config,
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(baseConfig);
