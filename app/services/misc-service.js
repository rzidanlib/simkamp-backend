import { getNavigations, insertNavigations } from "../models/misc-model.js";

const formatNavigations = (navigations) => {
  const navigationMap = new Map();
  const rootNavs = [];

  // Pertama, buat peta dari navigasi
  navigations.forEach((nav) => {
    const { id, title, path, icon, parent_id } = nav;
    navigationMap.set(id, { id, title, path, icon, subNav: [] });
  });

  // Kedua, susun navigasi dengan subNav di bawah induk yang sesuai
  navigations.forEach((nav) => {
    const { id, parent_id } = nav;

    if (parent_id) {
      const parentNav = navigationMap.get(parent_id);
      if (parentNav) {
        parentNav.subNav.push(navigationMap.get(id));
      }
    } else {
      rootNavs.push(navigationMap.get(id));
    }
  });

  // Hilangkan subNav dari navigasi yang tidak memiliki anak
  const cleanNavigation = (navs) => {
    return navs.map((nav) => {
      if (nav.subNav.length === 0) {
        const { subNav, ...cleanedNav } = nav;
        return cleanedNav;
      }
      return {
        ...nav,
        subNav: cleanNavigation(nav.subNav),
      };
    });
  };

  return cleanNavigation(rootNavs);
};

const get = async () => {
  const nav = await getNavigations();
  const formattedNav = formatNavigations(nav);

  return formattedNav;
};

const create = async (request) => {
  const nav = await insertNavigations(request);

  return nav;
};

export default { get, create };
