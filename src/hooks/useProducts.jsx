'use client'

import { useQuery } from '@tanstack/react-query';

const useProducts = () => {
  const { isPending, error, data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () =>
      fetch('http://localhost:3001/products').then((res) => res.json()),
  });

  return { products, isPending, error };
};

export default useProducts;