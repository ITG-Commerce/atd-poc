import React from "react";
// import { useRouter } from "next/router";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { BuilderContent } from "@builder.io/sdk";
import { GetStaticProps } from "next";
import "../../builder-registry";
import { Product } from "@/components/ProductSlider/types";
import { ProductSliderProvider } from "@/components/ProductSlider/ProductSliderContext";
import { getProductsByUrlKey } from "../api/products";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Define a function that fetches the Builder
// content for a given page
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const contractId = params?.contractId as string;
  const pageSlug = (params?.page as string[]).pop();
  // Fetch the builder content for the given page

  const page = await builder.get("page-with-contract", {
    // We only need the URL field
    userAttributes: {
      slug: pageSlug,
    },
    options: { noTargeting: true },
  });

  const contract = await builder
    .get("contract-type", {
      userAttributes: {
        id: contractId,
      },
    })
    .toPromise();
    
  let products: Product[] = [];

  try {
    const urlKeys = contract.data.products as string[];
    const params = new URLSearchParams();
    urlKeys.forEach((urlKey) => {
      params.append("urlKeys", urlKey);
    });

    products = await getProductsByUrlKey(urlKeys);
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  // Return the page content as props
  return {
    props: {
      page: page || null,
      products,
      contract: contract?.data || null,
    },
    // Revalidate the content every 5 seconds
    revalidate: 5,
  };
};

// Define a function that generates the
// static paths for all pages in Builder
export async function getStaticPaths() {
  const contracts = await builder.getAll("contract-type", {
    fields: "data.id",
    options: { noTargeting: true },
  });

  // Get a list of all pages in Builder
  const pages = await builder.getAll("page-with-contract", {
    // We only need the URL field
    fields: "data.slug",
    options: { noTargeting: true },
  });

  const paths = contracts
    .map((contract) =>
      pages.map((page) => `/${contract.data?.id}/${page.data?.slug}`)
    )
    .flat();

  // Generate the static paths for all pages in Builder
  return {
    paths,
    fallback: "blocking",
  };
}

// Define the Page component
export default function Page({
  page,
  products,
  contract,
}: {
  page: BuilderContent | null;
  products: Product[];
  contract: unknown;
}) {
  // const router = useRouter();
  const isPreviewing = useIsPreviewing();

  // If the page content is not available
  // and not in preview mode, show a 404 error page
  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  console.log("page", page);
  console.log("contract", contract);
  console.log("products", products);

  // If the page content is available, render
  // the BuilderComponent with the page content
  return (
    <ProductSliderProvider products={products} loading={false}>
      <Head>
        <title>{page?.data?.title}</title>
      </Head>
      {/* Render the Builder page */}
      <BuilderComponent
        model="page"
        content={page || undefined}
        data={{
          contract,
        }}
      />
    </ProductSliderProvider>
  );
}
