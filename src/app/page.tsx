'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  category: string;
  tags: string[];
  readTime: string;
}

export default function Home() {
  const posts: Post[] = [
    {
      id: 1,
      title: "The Ultimate Guide to Customer Acquisition in 2024",
      excerpt: "Customer acquisition costs are rising, but smart marketers are finding innovative ways to attract high-quality leads. Discover the proven strategies that top brands use to reduce CAC by 40% while increasing conversion rates...",
      date: "March 15, 2024",
      slug: "customer-acquisition-guide-2024",
      category: "Growth Marketing",
      tags: ["Customer Acquisition", "Digital Marketing", "Growth Strategy"],
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Why Your Email Marketing Campaign Is Failing (And How to Fix It)",
      excerpt: "Open rates dropping? Subscribers unsubscribing? You're not alone. Most email campaigns fail because of these 7 critical mistakes. Learn how to craft emails that convert and build lasting customer relationships...",
      date: "March 8, 2024",
      slug: "email-marketing-campaign-fixes",
      category: "Email Marketing",
      tags: ["Email Marketing", "Conversion Optimization", "Automation"],
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "Social Media ROI: How to Measure What Actually Matters",
      excerpt: "Vanity metrics like likes and followers don't pay the bills. Here's how to track the metrics that actually impact your bottom line and prove the real value of your social media marketing efforts...",
      date: "February 28, 2024",
      slug: "social-media-roi-measurement",
      category: "Social Media",
      tags: ["Social Media", "Analytics", "ROI Measurement"],
      readTime: "7 min read"
    },
    {
      id: 4,
      title: "Content Marketing That Converts: A Data-Driven Approach",
      excerpt: "Creating content that drives results requires more than just good writing. Discover the research-backed framework that helped our clients generate 300% more qualified leads through strategic content marketing...",
      date: "February 20, 2024",
      slug: "content-marketing-conversion-framework",
      category: "Content Marketing",
      tags: ["Content Marketing", "Conversion Optimization", "Lead Generation"],
      readTime: "10 min read"
    },
    {
      id: 5,
      title: "The Psychology of Pricing: What Your Customers Really Think",
      excerpt: "Price is more than just a number—it's a powerful psychological trigger. Learn how behavioral economics can help you optimize your pricing strategy to increase perceived value and boost conversions by 25%...",
      date: "February 12, 2024",
      slug: "psychology-of-pricing-strategy",
      category: "Pricing Strategy",
      tags: ["Pricing", "Psychology", "Conversion Optimization"],
      readTime: "9 min read"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(posts.map(post => post.category)))];
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Marketing Insights</h1>
            <div className="space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-16">
            <h2 className="text-4xl font-bold mb-4">Grow Your Business with Proven Marketing Strategies</h2>
            <p className="text-xl opacity-90 mb-4">Data-driven insights and actionable tactics to boost your ROI</p>
            <p className="text-lg opacity-80">Join 10,000+ marketers who get weekly tips on customer acquisition, conversion optimization, and growth marketing</p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-gray-500 text-sm">{post.readTime}</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{post.date}</p>
              <p className="text-gray-700 mb-4 leading-relaxed">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                    #{tag.toLowerCase().replace(' ', '')}
                  </span>
                ))}
              </div>
              <Link 
                href={`/posts/${post.slug}`}
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Read More
              </Link>
            </article>
          ))}
        </section>
      </main>

      <footer className="bg-gray-900 text-white text-center py-8 mt-16">
        <p>&copy; 2024 Marketing Insights. All rights reserved.</p>
      </footer>
    </div>
  );
}
