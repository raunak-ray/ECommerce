import { useQuery } from "@tanstack/react-query";
import { productService } from "../../service/product.service";

const useProductsByCategory = (categoryId) => {
  return useQuery({
    queryKey: ["products", "category", categoryId],
    queryFn: async () => {
      const res = await productService.getProductByCategory(categoryId);
      return res.data.data;
    },
    enabled: !!categoryId,
  });
};

export default useProductsByCategory;
