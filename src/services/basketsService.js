import { mockBaskets } from '@/services/baskets.mock';

async function getBaskets() {
  return mockBaskets;
};

function getBasketsId(id) {
  return mockBaskets.find((el) => el.id == id) || `Nous n'avons pas pu trouver de panier accordé à l'id : ${id}`;
}

export { getBaskets, getBasketsId };

