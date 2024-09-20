import { builder, Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

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
  dynamic(() => import("./components/Product/Product")),
  {
    name: "Product",
    inputs: [
      {
        name: "urlKey",
        type: "string",
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/ProductSlider/ProductSlider")),
  {
    name: "ProductSlider",
    inputs: [
      {
        name: "urlKeys",
        type: "list",
      },
    ],
  }
);
