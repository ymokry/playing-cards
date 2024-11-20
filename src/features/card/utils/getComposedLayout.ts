import { type Layout } from "@/features/card/layout";

const getComposedLayout = (...layouts: Layout[]): Required<Layout> =>
  layouts.reduce<Required<Layout>>(
    (result, layout) => {
      if (layout.unique) {
        result.unique.push(...layout.unique);
      }

      if (layout.mirrored) {
        result.mirrored.push(...layout.mirrored);
      }

      return result;
    },
    {
      mirrored: [],
      unique: [],
    }
  );

export default getComposedLayout;
