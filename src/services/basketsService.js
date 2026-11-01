import { mockBaskets } from "@/services/baskets.mock";

async function getBaskets() {
  return {
    status: true,
    message: "Liste des paniers",
    data: mockBaskets,
  };
}

function getBasketsById(id) {
  const basket = mockBaskets.find((item) => item.id === id);

  return basket
    ? {
        status: true,
        message: "Panier trouvé",
        data: basket,
      }
    : {
        status: false,
        message: "Panier non trouvé",
        data: null,
      };
}

export { getBaskets, getBasketsById };
