import { create } from "zustand";

// Define the store
export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,    
  successMessage: null, 

  
  setProducts: (newProducts) => set({ products: newProducts }),


  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Check your input. All fields are required." };
    }

    set({ loading: true, error: null, successMessage: null });

    try {
      const res = await fetch("/api/product/create", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create product.");
      }

      const data = await res.json();

      set((state) => ({
        products: [...state.products, data.data],
        successMessage: "Product created successfully.",
      }));

      return { success: true, message: "Product created successfully." };

    } catch (error) {
      console.error("Error creating product:", error);
      set({ error: error.message || "Something went wrong, please try again." });
      return { success: false, message: error.message || "Failed to create product." };
    } finally {
      set({ loading: false });
    }
  },
  
  fetchProducts : async() => {
     const res = await fetch("/api/product/getproduct");
     const data = await res.json();
     set({ products: data.data })
  },

  deleteProduct : async(pid) => {
     const res = await fetch(`/api/product/delete/${pid}` , {
      method:"DELETE"
     })
     const data = await res.json()
     if(!data.success){
      return {success : false , message : "Somthing went wrong while fetching data"}
     };
     set((state) => ({products : state.products.filter((product) => product._id !== pid)}))
     return ({success: true , message : "Product Deleted!"})
  },

  updatedProduct: async (pid, updatedData) => {
      const res = await fetch(`/api/product/update/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if(!data.success) return {success : false , message : data.message}

      set((state) => ({
        products : state.products.map((product) => (product._id === pid ? data.data : product))
      }))

  }
}));
