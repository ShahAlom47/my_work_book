import withPWA from "next-pwa";

const baseConfig = {
  reactStrictMode: true,

  // This disables Turbopack-based config requirement
  turbopack: {},

  webpack: (config) => {
    return config;
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(baseConfig);
