const routes = {
  home: "/",
  login: "/login",
  posts: {
    index: "/posts",
    create: "/posts/add",
    update: (id: string) => `/posts/update/${id}`,
  },
  postCategories: {
    index: "/post-categories",
    create: "/post-categories/add",
    update: (id: string) => `/post-categories/update/${id}`,
  },
  postTopics: {
    index: "/post-topics",
    create: "/post-topics/add",
    update: (id: string) => `/post-topics/update/${id}`,
  },
  recipes: {
    index: "/recipes",
    create: "/recipes/add",
    update: (id: string) => `/recipes/update/${id}`,
  },
  recipeCategories: {
    index: "/recipe-categories",
    create: "/recipes-categories/add",
    update: (id: string) => `/recipes-categories/update/${id}`,
  },
  recipeDiets: {
    index: "/recipe-diets",
    create: "/recipes-diets/add",
    update: (id: string) => `/recipes-diets/update/${id}`,
  },
  recipeUnits: {
    index: "/recipe-units",
    create: "/recipes-units/add",
    update: (id: string) => `/recipes-units/update/${id}`,
  },
  users: {
    index: "/users",
    create: "/users/add",
    update: (id: string) => `/users/update/${id}`,
  },
  customerContacts: {
    index: "/customer-contacts",
    update: (id: string) => `/customer-contacts/update/${id}`,
  },
  newsletterCustomers: {
    index: "/newsletter-customers",
    create: "/newsletter-customers/add",
    update: (id: string) => `/newsletter-customers/update/${id}`,
  },
};

export default routes;
