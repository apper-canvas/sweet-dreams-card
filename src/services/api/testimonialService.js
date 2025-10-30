import { getApperClient } from "@/services/apperClient";

const tableName = "testimonial_c";

// Helper to transform database testimonial to application format
const transformTestimonial = (dbTestimonial) => {
  return {
    Id: dbTestimonial.Id,
    customerName: dbTestimonial.customer_name_c,
    rating: parseInt(dbTestimonial.rating_c) || 0,
    review: dbTestimonial.review_c,
    date: dbTestimonial.date_c,
    orderType: dbTestimonial.order_type_c,
    featured: dbTestimonial.featured_c || false
  };
};

export const testimonialService = {
  getAll: async () => {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords(tableName, {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "customer_name_c" } },
          { field: { Name: "rating_c" } },
          { field: { Name: "review_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "order_type_c" } },
          { field: { Name: "featured_c" } }
        ]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data?.map(transformTestimonial) || [];
    } catch (error) {
      console.error("Error fetching testimonials:", error?.message || error);
      throw error;
    }
  },

  getFeatured: async () => {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords(tableName, {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "customer_name_c" } },
          { field: { Name: "rating_c" } },
          { field: { Name: "review_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "order_type_c" } },
          { field: { Name: "featured_c" } }
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

      return response.data?.map(transformTestimonial) || [];
    } catch (error) {
      console.error("Error fetching featured testimonials:", error?.message || error);
      throw error;
    }
  }
};