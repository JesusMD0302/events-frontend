/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/app",
        permanent: true,
      },
      {
        source: "/app/events",
        destination: "/app/events/calendar",
        permanent: true,
      },
      {
        source: "/app/create",
        destination: "/app/create/event",
        permanent: true,
      },
      {
        source: "/app/user",
        destination: "/app/user/events",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
