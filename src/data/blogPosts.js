const blogPostsData = {
  en: [
    {
      id: 1,
      titleKey: "blog.samplePost1.title",
      slugKey: "blog.samplePost1.slug",
      authorKey: "blog.samplePost1.author",
      dateKey: "blog.samplePost1.date",
      categoryKey: "blog.samplePost1.category",
      imageKey: "blog.samplePost1.image",
      altKey: "blog.samplePost1.alt",
      summaryKey: "blog.samplePost1.summary",
      contentKey: "blog.samplePost1.content",
      metaKey: "blog.samplePost1.meta"
    },
    {
      id: 2,
      titleKey: "blog.samplePost2.title",
      slugKey: "blog.samplePost2.slug",
      authorKey: "blog.samplePost2.author",
      dateKey: "blog.samplePost2.date",
      categoryKey: "blog.samplePost2.category",
      imageKey: "blog.samplePost2.image",
      altKey: "blog.samplePost2.alt",
      summaryKey: "blog.samplePost2.summary",
      contentKey: "blog.samplePost2.content",
      metaKey: "blog.samplePost2.meta"
    },
    {
      id: 3,
      titleKey: "blog.samplePost3.title",
      slugKey: "blog.samplePost3.slug",
      authorKey: "blog.samplePost3.author",
      dateKey: "blog.samplePost3.date",
      categoryKey: "blog.samplePost3.category",
      imageKey: "blog.samplePost3.image",
      altKey: "blog.samplePost3.alt",
      summaryKey: "blog.samplePost3.summary",
      contentKey: "blog.samplePost3.content",
      metaKey: "blog.samplePost3.meta"
    }
  ],
  tr: [
    {
      id: 1,
      titleKey: "blog.samplePost1.title",
      slugKey: "blog.samplePost1.slug",
      authorKey: "blog.samplePost1.author",
      dateKey: "blog.samplePost1.date",
      categoryKey: "blog.samplePost1.category",
      imageKey: "blog.samplePost1.image",
      altKey: "blog.samplePost1.alt",
      summaryKey: "blog.samplePost1.summary",
      contentKey: "blog.samplePost1.content",
      metaKey: "blog.samplePost1.meta"
    },
    {
      id: 2,
      titleKey: "blog.samplePost2.title",
      slugKey: "blog.samplePost2.slug",
      authorKey: "blog.samplePost2.author",
      dateKey: "blog.samplePost2.date",
      categoryKey: "blog.samplePost2.category",
      imageKey: "blog.samplePost2.image",
      altKey: "blog.samplePost2.alt",
      summaryKey: "blog.samplePost2.summary",
      contentKey: "blog.samplePost2.content",
      metaKey: "blog.samplePost2.meta"
    },
    {
      id: 3,
      titleKey: "blog.samplePost3.title",
      slugKey: "blog.samplePost3.slug",
      authorKey: "blog.samplePost3.author",
      dateKey: "blog.samplePost3.date",
      categoryKey: "blog.samplePost3.category",
      imageKey: "blog.samplePost3.image",
      altKey: "blog.samplePost3.alt",
      summaryKey: "blog.samplePost3.summary",
      contentKey: "blog.samplePost3.content",
      metaKey: "blog.samplePost3.meta"
    }
  ]
};

export const getBlogPosts = (lang) => {
  return blogPostsData[lang] || blogPostsData.en;
};

export const getBlogPostBySlug = (slug, lang, t) => {
  const posts = getBlogPosts(lang);
  return posts.find(post => t(post.slugKey) === slug);
};