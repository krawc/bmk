export default {
  name: "about",
  type: "document",
  title: "About",
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "mainImage",
      type: "mainImage",
      title: "Portrait",
    },
  ],
};
