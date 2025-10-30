import { getApperClient } from "@/services/apperClient";

const tableName = "gallery_item_c";

// Helper to transform database gallery item to application format
const transformGalleryItem = (dbItem) => {
  return {
    Id: dbItem.Id,
    title: dbItem.title_c,
    category: dbItem.category_c,
    description: dbItem.description_c,
    image: dbItem.image_c,
    customerName: dbItem.customer_name_c,
    date: dbItem.date_c,
    featured: dbItem.featured_c || false
  };
};

export const galleryService = {
  getAll: async () => {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords(tableName, {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "title_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "image_c" } },
          { field: { Name: "customer_name_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "featured_c" } }
        ]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data?.map(transformGalleryItem) || [];
    } catch (error) {
      console.error("Error fetching gallery items:", error?.message || error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.getRecordById(tableName, parseInt(id), {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "title_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "image_c" } },
          { field: { Name: "customer_name_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "featured_c" } }
        ]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("Gallery item not found");
      }

      return transformGalleryItem(response.data);
    } catch (error) {
      console.error(`Error fetching gallery item ${id}:`, error?.message || error);
      throw error;
    }
  },

  getByCategory: async (category) => {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords(tableName, {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "title_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "image_c" } },
          { field: { Name: "customer_name_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "featured_c" } }
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

      return response.data?.map(transformGalleryItem) || [];
    } catch (error) {
      console.error("Error fetching gallery items by category:", error?.message || error);
      throw error;
    }
  }
};