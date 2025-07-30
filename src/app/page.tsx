export default function Home() {
  const posts = [
    {
      id: 1,
      title: "The Ultimate Guide to Customer Acquisition in 2024",
      excerpt: "Customer acquisition costs are rising, but smart marketers are finding innovative ways to attract high-quality leads. Discover the proven strategies that top brands use to reduce CAC by 40% while increasing conversion rates...",
      date: "March 15, 2024",
      slug: "customer-acquisition-guide-2024"
    },
    {
      id: 2,
      title: "Why Your Email Marketing Campaign Is Failing (And How to Fix It)",
      excerpt: "Open rates dropping? Subscribers unsubscribing? You're not alone. Most email campaigns fail because of these 7 critical mistakes. Learn how to craft emails that convert and build lasting customer relationships...",
      date: "March 8, 2024",
      slug: "email-marketing-campaign-fixes"
    },
    {
      id: 3,
      title: "Social Media ROI: How to Measure What Actually Matters",
      excerpt: "Vanity metrics like likes and followers don't pay the bills. Here's how to track the metrics that actually impact your bottom line and prove the real value of your social media marketing efforts...",
      date: "February 28, 2024",
      slug: "social-media-roi-measurement"
    },
    {
      id: 4,
      title: "Content Marketing That Converts: A Data-Driven Approach",
      excerpt: "Creating content that drives results requires more than just good writing. Discover the research-backed framework that helped our clients generate 300% more qualified leads through strategic content marketing...",
      date: "February 20, 2024",
      slug: "content-marketing-conversion-framework"
    },
    {
      id: 5,
      title: "The Psychology of Pricing: What Your Customers Really Think",
      excerpt: "Price is more than just a number—it's a powerful psychological trigger. Learn how behavioral economics can help you optimize your pricing strategy to increase perceived value and boost conversions by 25%...",
      date: "February 12, 2024",
      slug: "psychology-of-pricing-strategy"
    }
  ];

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

        <section className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{post.date}</p>
              <p className="text-gray-700 mb-6 leading-relaxed">{post.excerpt}</p>
              <a 
                href={`/posts/${post.slug}`}
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Read More
              </a>
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
