export function webpack(config, { defaultloaders, dev, isServer }) {
    if (!dev && !isServer) {
        Object.assign(config.resolve.alias, {
            react: "preact/compat",
            "react-dom": "preact/compat",
        });
    }

    config.module.rules.push({
        test: /\.worker.js$/,
        use: ["worker-loader", defaultloaders.babel],
    });
    return config;
}
