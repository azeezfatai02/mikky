//  @type {import('next').NextConfig}

const nextConfig = {
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyCstzbpxjDjIM7o2gdfXvxkYvT1fKvF76Y",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "mikky-signup.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "mikky-signup",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "mikky-signup.appspot.com",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "378517903527",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:378517903527:web:8008e6b3e78dca1b772382",
  },
};

export default nextConfig;

// import { defineConfig } from "next/config";

// export default defineConfig({
//   reactStrictMode: true, // Enables React Strict Mode
//   swcMinify: true, // Enables SWC-based minification for faster builds
//   images: {
//     domains: ["your-image-domain.com"], // Configure domains for optimized images
//     formats: ["image/avif", "image/webp"], // Enable modern image formats
//   },
//   env: {
//     // Define environment variables
//     NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyCstzbpxjDjIM7o2gdfXvxkYvT1fKvF76Y",
//     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "mikky-signup.firebaseapp.com",
//     NEXT_PUBLIC_FIREBASE_PROJECT_ID: "mikky-signup",
//     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "mikky-signup.appspot.com",
//     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "378517903527",
//     NEXT_PUBLIC_FIREBASE_APP_ID: "1:378517903527:web:8008e6b3e78dca1b772382",
//   },
//   async redirects() {
//     return [
//       {
//         source: "/",
//         destination: "/home",
//         permanent: true, // Use a 308 status for permanent redirects
//       },
//     ];
//   },
//   webpack(config, { isServer }) {
//     // Example of adding a custom Webpack plugin
//     if (!isServer) {
//       config.resolve.fallback.fs = false;
//     }

//     // Other custom Webpack configurations can be added here

//     return config;
//   },
// });
