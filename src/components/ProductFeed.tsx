import { FC } from "react";
import { IProduct } from "../domain/product";
import ProductTile from "./ProductTile";
import Image from "next/image";
import bannerImg from "../../public/images/banner.jpg";

type Props = {
  products: IProduct[];
};

const ProductFeed: FC<Props> = ({ products }) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl-grid-cols-4 md:-mt-52 mx-auto">
      {products.slice(0, 4).map((product) => (
        <ProductTile product={product} key={product.id} />
      ))}

      <div className="md:col-span-full">
        <Image src={bannerImg} alt="" />
      </div>

      <div className="md:col-span-2">
        {products.slice(4, 5).map((product) => (
          <ProductTile product={product} key={product.id} />
        ))}
      </div>

      {products.slice(5, products.length).map((product) => (
        <ProductTile product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductFeed;
