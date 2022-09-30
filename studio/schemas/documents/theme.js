export default {
  name: "theme",
  type: "document",
  title: "Theme",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "slug",
      type: "string",
      title: "Slug (lowercase and dashes only)",
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
  ],
};
