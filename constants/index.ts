import routes from "@/routes/routes";
import { FaAddressBook, FaBalanceScale, FaComment, FaEnvelopeOpenText, FaFileAlt, FaFolderOpen, FaStar, FaTags, FaThList, FaUsers } from "react-icons/fa";
import { GiCook, GiFruitBowl } from "react-icons/gi";

export const NAVIGATION_LINKS = [
  { key: "posts", label: "Posts", href: routes.posts.index, icon: FaFileAlt },
  {
    key: "post-categories",
    label: "Categorias de Post",
    href: routes.postCategories.index,
    icon: FaFolderOpen,
  },
  {
    key: "post-topics",
    label: "Tópicos de Post",
    href: routes.postTopics.index,
    icon: FaTags,
  },
  {
    key: "recipes",
    label: "Receitas",
    href: routes.recipes.index,
    icon: GiCook,
  },
  {
    key: "recipe-categories",
    label: "Categorias de Receita",
    href: routes.recipeCategories.index,
    icon: FaThList,
  },
  {
    key: "recipe-diets",
    label: "Dietas de Receita",
    href: routes.recipeDiets.index,
    icon: GiFruitBowl,
  },
  {
    key: "recipe-units",
    label: "Unidades de Receita",
    href: routes.recipeUnits.index,
    icon: FaBalanceScale,
  },
  {
    key: "users",
    label: "Usuários",
    href: routes.users.index,
    icon: FaUsers,
  },
  {
    key: "customer-contacts",
    label: "Contatos de Cliente",
    href: routes.customerContacts.index,
    icon: FaAddressBook,
  },
  {
    key: "newsletter-customers",
    label: "Clientes de Newsletter",
    href: routes.newsletterCustomers.index,
    icon: FaEnvelopeOpenText,
  },
  {
    key: "ratings",
    label: "Avaliações",
    href: routes.ratings.index,
    icon: FaStar,
  },
  {
    key: "comments",
    label: "Comentários",
    href: routes.comments.index,
    icon: FaComment
  },
];
