/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
        if (!isServer) {
            config.watchOptions = {
                ignored: /node_modules/,
                poll: 1000, // Optional: Adjust polling interval
            };
        }
        return config;
    },
};

export default nextConfig;