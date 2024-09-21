import { builder, Builder, withChildren } from "@builder.io/react";
import dynamic from "next/dynamic";
import ProductSlider from "./components/ProductSlider/ProductSlider";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(
  dynamic(() => import("./components/Counter/Counter")),
  {
    name: "Counter",
    inputs: [
      {
        name: "initialCount",
        type: "number",
      },
    ],
  }
);

Builder.registerComponent(
  withChildren(ProductSlider),
  {
    name: "ProductSlider",
    childRequirements: {
      message: 'You can only put a ProductSliderItem',
      query: {
        'component.name': { $in: ['ProductSliderItem'] },
      },
    }
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/ProductSlider/ProductSliderItem")),
  {
    name: "ProductSliderItem",
    inputs: [
      {
        name: "urlKey",
        type: "string",
      },
    ],
  }
);
