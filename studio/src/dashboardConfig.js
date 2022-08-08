export default {
  widgets: [
    { name: "structure-menu" },
    {
      name: "project-info",
      options: {
        __experimental_before: [
          {
            name: "netlify",
            options: {
              description:
                "NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.",
              sites: [
                {
                  buildHookId:
                    "62f158b3bbb750063af3c124",
                  title: "Sanity Studio",
                  name: "bmk-studio",
                  apiId: "910947c4-9151-4214-b4f9-58e3951c5607",
                },
                {
                  buildHookId: "62f158b4255d8e08647ceda7",
                  title: "Blog Website",
                  name: "bmk-web-smx7eum1",
                  apiId: "75d6cc20-448f-407a-8c27-7b9fe2c36774",
                },
              ],
            },
          },
        ],
        data: [
          {
            title: "GitHub repo",
            value:
              "https://github.com/krawc/bmk",
            category: "Code",
          },
          {
            title: "Frontend",
            value: "https://bmk-web-smx7eum1.netlify.app",
            category: "apps",
          },
        ],
      },
    },
    { name: "project-users", layout: { height: "auto" } },
    {
      name: "document-list",
      options: {
        title: "Recent blog posts",
        order: "_createdAt desc",
        types: ["post"],
      },
      layout: { width: "medium" },
    },
  ],
};
