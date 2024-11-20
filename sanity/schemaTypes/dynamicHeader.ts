export const dynamicHeader = {
  name: "dynamicHeader",
  title: "Dynamic Header",
  type: "document",
  fields: [
    {
      name: "replacableText",
      title: "Replaceable Text",
      type: "string",
    },
  ],
};

export interface DynamicHeader {
  replacableText: string;
  _id: string;
  _createdAt: string;
}
