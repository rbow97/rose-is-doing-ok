import { type SchemaTypeDefinition } from "sanity";

import { dynamicHeader } from "./dynamicHeader";
import { post } from "./post";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [dynamicHeader, post],
};
