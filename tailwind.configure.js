export const future = {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
};
export const purge = ["./components/**/*.js", "./pages/**/*.js"];
export const theme = {
    fontFamily: {
        sans: [
            "Inter",
            "-apple-system",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Roboto",
            "Helvetica",
            "Arial",
            "sans-serif",
        ],
    },
};
export const variants = {
    animation: ({ after }) => after(["hover"]),
    backgroundColor: ({ after }) => after(["checked", "active"]),
    borderColor: ({ after }) => after(["checked"]),
    ringWidth: ({ after }) => after(["focus-visible"], "focus"),
    textDecoration: ({ after }) => after(["focus-visible"], "focus"),
};
