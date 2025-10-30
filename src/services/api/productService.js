import { getApperClient } from "@/services/apperClient";

const tableName = "product_c";

// Helper to transform database product to application format
const transformProduct = (dbProduct) => {
  return {
    Id: dbProduct.Id,
    name: dbProduct.name_c,
    category: dbProduct.category_c,
    description: dbProduct.description_c,
    basePrice: parseFloat(dbProduct.base_price_c) || 0,
    images: dbProduct.images_c ? dbProduct.images_c.split('\n').filter(img => img.trim()) : [],
    sizes: dbProduct.sizes_c ? JSON.parse(dbProduct.sizes_c) : [],
    flavors: dbProduct.flavors_c ? dbProduct.flavors_c.split('\n').filter(f => f.trim()) : [],
    dietary: dbProduct.dietary_c ? dbProduct.dietary_c.split(',').filter(d => d.trim()) : [],
    customizable: dbProduct.customizable_c || false,
    leadTime: parseInt(dbProduct.lead_time_c) || 0,
    featured: dbProduct.featured_c || false,
    popular: dbProduct.popular_c || false
  };
};

export const productService = {
  getAll: async () => {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords(tableName, {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "name_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "base_price_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "sizes_c" } },
          { field: { Name: "flavors_c" } },
          { field: { Name: "dietary_c" } },
          { field: { Name: "customizable_c" } },
          { field: { Name: "lead_time_c" } },
          { field: { Name: "featured_c" } },
          { field: { Name: "popular_c" } }
        ]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data?.map(transformProduct) || [];
    } catch (error) {
      console.error("Error fetching products:", error?.message || error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.getRecordById(tableName, parseInt(id), {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "name_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "base_price_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "sizes_c" } },
          { field: { Name: "flavors_c" } },
          { field: { Name: "dietary_c" } },
          { field: { Name: "customizable_c" } },
          { field: { Name: "lead_time_c" } },
          { field: { Name: "featured_c" } },
          { field: { Name: "popular_c" } }
        ]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("Product not found");
      }

      return transformProduct(response.data);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error?.message || error);
      throw error;
    }
  },

  getByCategory: async (category) => {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords(tableName, {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "name_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "base_price_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "sizes_c" } },
          { field: { Name: "flavors_c" } },
          { field: { Name: "dietary_c" } },
          { field: { Name: "customizable_c" } },
          { field: { Name: "lead_time_c" } },
          { field: { Name: "featured_c" } },
          { field: { Name: "popular_c" } }
        ],
        where: [{
          FieldName: "category_c",
          Operator: "EqualTo",
          Values: [category]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data?.map(transformProduct) || [];
    } catch (error) {
      console.error("Error fetching products by category:", error?.message || error);
      throw error;
    }
  },

  search: async (query) => {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords(tableName, {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "name_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "base_price_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "sizes_c" } },
          { field: { Name: "flavors_c" } },
          { field: { Name: "dietary_c" } },
          { field: { Name: "customizable_c" } },
          { field: { Name: "lead_time_c" } },
          { field: { Name: "featured_c" } },
          { field: { Name: "popular_c" } }
        ],
        whereGroups: [{
          operator: "OR",
          subGroups: [
            {
              conditions: [
                { fieldName: "name_c", operator: "Contains", values: [query] },
                { fieldName: "description_c", operator: "Contains", values: [query] },
                { fieldName: "category_c", operator: "Contains", values: [query] }
              ],
              operator: "OR"
            }
          ]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data?.map(transformProduct) || [];
    } catch (error) {
      console.error("Error searching products:", error?.message || error);
      throw error;
    }
  },

  getFeatured: async () => {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords(tableName, {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "name_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "base_price_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "sizes_c" } },
          { field: { Name: "flavors_c" } },
          { field: { Name: "dietary_c" } },
          { field: { Name: "customizable_c" } },
          { field: { Name: "lead_time_c" } },
          { field: { Name: "featured_c" } },
          { field: { Name: "popular_c" } }
        ],
        where: [{
          FieldName: "featured_c",
          Operator: "EqualTo",
          Values: [true]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data?.map(transformProduct) || [];
    } catch (error) {
      console.error("Error fetching featured products:", error?.message || error);
      throw error;
    }
  },

  getPopular: async () => {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords(tableName, {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "name_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "base_price_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "sizes_c" } },
          { field: { Name: "flavors_c" } },
          { field: { Name: "dietary_c" } },
          { field: { Name: "customizable_c" } },
          { field: { Name: "lead_time_c" } },
          { field: { Name: "featured_c" } },
          { field: { Name: "popular_c" } }
        ],
        where: [{
          FieldName: "popular_c",
          Operator: "EqualTo",
          Values: [true]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data?.map(transformProduct) || [];
    } catch (error) {
      console.error("Error fetching popular products:", error?.message || error);
      throw error;
    }
  }
};