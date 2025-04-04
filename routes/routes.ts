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
    create: "/recipe-categories/add",
    update: (id: string) => `/recipe-categories/update/${id}`,
  },
  recipeDiets: {
    index: "/recipe-diets",
    create: "/recipe-diets/add",
    update: (id: string) => `/recipe-diets/update/${id}`,
  },
  recipeUnits: {
    index: "/recipe-units",
    create: "/recipe-units/add",
    update: (id: string) => `/recipe-units/update/${id}`,
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
