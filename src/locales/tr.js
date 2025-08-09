import common_tr from './tr/common.js';
import home_tr from './tr/home.js';
import about_tr from './tr/about.js';
import services_tr from './tr/services.js';
import contact_tr from './tr/contact.js';
import faq_tr from './tr/faq.js';
import blog_tr from './tr/blog.js';

const tr = {
  ...common_tr,
  home: home_tr,
  about: about_tr,
  services: services_tr,
  contact: contact_tr,
  faq: faq_tr,
  blog: blog_tr,
};

export default tr;