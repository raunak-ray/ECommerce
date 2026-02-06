import { useQuery } from "@tanstack/react-query";
import { productService } from "../../service/product.service";

const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await productService.getAllProducts();
      return res.data.data;
    },
  });
};

export default useProducts;
