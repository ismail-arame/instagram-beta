//TODO: add to tailwind config
//text-blue-medium
//bg-blue-medium
//text-red-primary
//text-gray-base
//border-gray-primary

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    content: ["./src/**/*.js", "./src/**/**/*.js"],
  },
  theme: {
    extend: {
      maxHeight: {
        postModalHeight: "90vh",
        postModalWidth: "70vw",
        commentSectionHeight: "51vh",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-faster": "pulse 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg) scale(1)" },
          "33%": { transform: "rotate(42deg) scale(1.2)" },
          "66%": { transform: "rotate(-24deg) scale(1.07)" },
        },
        bounceModified: {
          "0%, 100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-25%)" },
          "50%": { transform: "translateY(0)" },
          "75%": { transform: "translateY(-25%)" },
        },
      },
    },
    fill: (theme) => ({
      red: theme("colors.red.primary"),
    }),
    container: {
      mdd: "900px",
    },
    colors: {
      white: "#ffffff",
      blue: {
        light: "#0095f6",
        medium: "#005c98",
      },
      black: {
        light: "#262626",
        faded: "#00000059",
      },
      gray: {
        base: "#616161",
        background: "#fafafa",
        primary: "#dbdbdb",
        light: "#868e96",
        transparent: "#b4b4b471",
        lightweight: "#e9ecef",
        lazy: "#ebe8e8",
        lazy2: "#f1f3f5",
        search: "#efefef",
        searchHover: "#f8f9fa",
      },
      red: {
        primary: "#ed4956",
        100: "#fee2e2",
        500: "#ef4444",
      },
    },
  },
  plugins: [],
};
