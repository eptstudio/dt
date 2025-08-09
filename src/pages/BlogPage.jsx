import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/components/I18nProvider';
import { getBlogPosts } from '@/data/blogPosts';
import { CalendarDays, UserCircle, Tag, ArrowRight, Rss } from 'lucide-react';

const BlogPostCard = React.memo(({ post, lang, t, delay }) => {
  const title = t(post.titleKey);
  const summary = t(post.summaryKey);
  const slug = t(post.slugKey);
  const category = t(post.categoryKey);
  const date = t(post.dateKey);
  const author = t(post.authorKey);
  const image = `/images/blog/${t(post.imageKey)}`;
  const altText = t(post.altKey);

  const motionProps = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, delay }
  }), [delay]);

  return (
    <motion.div {...motionProps}>
      <Card className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 h-full flex flex-col bg-card dark:bg-card/80">
        <Link to={`/blog/${slug}`} className="block">
          <img 
            src={image}
            alt={altText}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            width="400"
            height="192"
           src="https://images.unsplash.com/photo-1625945771023-514c4a28ac02" />
        </Link>
        <CardHeader className="pb-3">
          <Link to={`/blog/${slug}`} className="hover:text-primary">
            <CardTitle className="text-xl font-bold leading-tight mb-1">{title}</CardTitle>
          </Link>
          <div className="flex flex-wrap items-center text-xs text-muted-foreground space-x-3">
            <span className="flex items-center"><CalendarDays className="w-3.5 h-3.5 mr-1" /> {new Date(date).toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="flex items-center"><UserCircle className="w-3.5 h-3.5 mr-1" /> {author}</span>
            <span className="flex items-center"><Tag className="w-3.5 h-3.5 mr-1" /> {category}</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
          <CardDescription className="text-sm text-foreground/80 mb-4 leading-relaxed">{summary}</CardDescription>
          <Button asChild variant="outline" className="mt-auto w-full sm:w-auto self-start border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to={`/blog/${slug}`}>
              {t('blog.readMore')} <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
});

const BlogPage = () => {
  const { t, language } = useI18n();
  const posts = useMemo(() => getBlogPosts(language), [language]);

  React.useEffect(() => {
    document.title = `${t('blog.title')} - Denizli Taksi Merkezi`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('blog.subtitle'));
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = "description";
      newMeta.content = t('blog.subtitle');
      document.head.appendChild(newMeta);
    }
  }, [t, language]);

  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 pt-[calc(var(--navbar-height,80px)+6rem)] min-h-screen text-center">
        <h1 className="text-4xl font-bold text-primary mb-6">{t('blog.title')}</h1>
        <p className="text-xl text-muted-foreground">{t('blog.noPostsFound')}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24 pt-[calc(var(--navbar-height,80px)+4rem)] md:pt-[calc(var(--navbar-height,80px)+6rem)] min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-6 flex items-center justify-center">
          <Rss className="w-10 h-10 md:w-12 md:h-12 mr-3" /> {t('blog.title')}
        </h1>
        <p className="text-lg md:text-xl text-center text-foreground/80 mb-12 max-w-2xl mx-auto">
          {t('blog.subtitle')}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} lang={language} t={t} delay={index * 0.1} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPage;