import React, { useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '@/components/I18nProvider';
import { getBlogPostBySlug, getBlogPosts } from '@/data/blogPosts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CalendarDays, UserCircle, Tag, Share2, Twitter, Facebook, Linkedin, Copy }
from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ContentRenderer = ({ contentItem, t }) => {
  switch (contentItem.type) {
    case 'paragraph':
      return <p className="mb-4 text-lg leading-relaxed text-foreground/90">{contentItem.text}</p>;
    case 'heading':
      const TagName = `h${contentItem.level}`;
      return <TagName className={`text-primary font-semibold my-6 ${contentItem.level === 2 ? 'text-2xl' : 'text-xl'}`}>{contentItem.text}</TagName>;
    case 'list':
      return (
        <ul className="list-disc list-inside mb-4 pl-4 space-y-1 text-lg text-foreground/90">
          {contentItem.items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      );
    case 'image':
      return (
        <div className="my-8 text-center">
          <img 
            src={`/images/blog/${contentItem.src}`}
            alt={contentItem.alt}
            className="max-w-full h-auto rounded-lg shadow-md mx-auto"
            width="700"
            height="450"
           src="https://images.unsplash.com/photo-1599472696777-95cab5e0f891" />
          {contentItem.caption && <p className="text-sm text-muted-foreground mt-2">{contentItem.caption}</p>}
        </div>
      );
    default:
      return null;
  }
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const { t, language } = useI18n();
  const navigate = useNavigate();
  const { toast } = useToast();

  const post = useMemo(() => getBlogPostBySlug(slug, language, t), [slug, language, t]);

  useEffect(() => {
    if (post) {
      const meta = t(post.metaKey);
      document.title = `${meta.title} - Denizli Taksi Merkezi`;
      
      let descriptionTag = document.querySelector('meta[name="description"]');
      if (!descriptionTag) {
        descriptionTag = document.createElement('meta');
        descriptionTag.name = "description";
        document.head.appendChild(descriptionTag);
      }
      descriptionTag.setAttribute('content', meta.description);

      let keywordsTag = document.querySelector('meta[name="keywords"]');
      if (!keywordsTag) {
        keywordsTag = document.createElement('meta');
        keywordsTag.name = "keywords";
        document.head.appendChild(keywordsTag);
      }
      keywordsTag.setAttribute('content', meta.keywords);

    } else {
      document.title = "Post Not Found - Denizli Taksi Merkezi";
    }
  }, [post, t, language]);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-24 pt-[calc(var(--navbar-height,80px)+6rem)] min-h-screen text-center">
        <h1 className="text-3xl font-bold text-destructive mb-4">{t('blog.noPostsFound')}</h1>
        <Button asChild variant="outline">
          <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> {t('blog.backToBlog')}</Link>
        </Button>
      </div>
    );
  }

  const title = t(post.titleKey);
  const content = t(post.contentKey);
  const category = t(post.categoryKey);
  const date = t(post.dateKey);
  const author = t(post.authorKey);
  const postUrl = window.location.href;

  const handleShare = (platform) => {
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(title)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(title)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(postUrl).then(() => {
          toast({ title: "Link Copied!", description: "Blog post URL copied to clipboard." });
        }).catch(err => {
          toast({ variant: "destructive", title: "Copy Failed", description: "Could not copy link." });
        });
        return; 
      default:
        return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  const relatedPosts = getBlogPosts(language)
    .filter(p => t(p.slugKey) !== slug && t(p.categoryKey) === category)
    .slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-24 pt-[calc(var(--navbar-height,80px)+4rem)] md:pt-[calc(var(--navbar-height,80px)+6rem)] min-h-screen">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Button onClick={() => navigate('/blog')} variant="outline" className="mb-8 group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> {t('blog.backToBlog')}
        </Button>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-4 leading-tight">{title}</h1>
          <div className="flex flex-wrap items-center text-sm text-muted-foreground space-x-4">
            <span className="flex items-center"><CalendarDays className="w-4 h-4 mr-1.5" /> {new Date(date).toLocaleDateString(language, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="flex items-center"><UserCircle className="w-4 h-4 mr-1.5" /> {author}</span>
            <span className="flex items-center"><Tag className="w-4 h-4 mr-1.5" /> {category}</span>
          </div>
        </header>

        <div className="prose dark:prose-invert max-w-none prose-lg prose-img:rounded-xl prose-headings:text-primary">
          {content.map((item, index) => (
            <ContentRenderer key={index} contentItem={item} t={t} />
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50">
          <h3 className="text-lg font-semibold mb-3 flex items-center"><Share2 className="mr-2 w-5 h-5 text-primary" />{t('blog.sharePost')}</h3>
          <div className="flex space-x-3">
            <Button variant="outline" size="icon" onClick={() => handleShare('twitter')} aria-label="Share on Twitter"><Twitter className="w-5 h-5" /></Button>
            <Button variant="outline" size="icon" onClick={() => handleShare('facebook')} aria-label="Share on Facebook"><Facebook className="w-5 h-5" /></Button>
            <Button variant="outline" size="icon" onClick={() => handleShare('linkedin')} aria-label="Share on LinkedIn"><Linkedin className="w-5 h-5" /></Button>
            <Button variant="outline" size="icon" onClick={() => handleShare('copy')} aria-label="Copy link"><Copy className="w-5 h-5" /></Button>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border/50">
            <h2 className="text-2xl font-bold text-primary mb-6">{t('blog.relatedPosts')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map(relatedPost => (
                <Card key={t(relatedPost.slugKey)} className="overflow-hidden shadow-md hover:shadow-primary/15 transition-shadow duration-300">
                   <Link to={`/blog/${t(relatedPost.slugKey)}`} className="block">
                    <img 
                      src={`/images/blog/${t(relatedPost.imageKey)}`}
                      alt={t(relatedPost.altKey)}
                      className="w-full h-40 object-cover"
                     src="https://images.unsplash.com/photo-1618163301023-c5bb1091b668" />
                  </Link>
                  <CardHeader className="pb-2">
                    <Link to={`/blog/${t(relatedPost.slugKey)}`} className="hover:text-primary">
                      <CardTitle className="text-lg font-semibold">{t(relatedPost.titleKey)}</CardTitle>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-2">
                      {new Date(t(relatedPost.dateKey)).toLocaleDateString(language, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-sm text-foreground/80 line-clamp-2">{t(relatedPost.summaryKey)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </motion.article>
    </div>
  );
};

export default BlogPostPage;