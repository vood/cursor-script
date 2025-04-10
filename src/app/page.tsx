import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-16">
      <section className="mb-10">
        <h1 className="text-4xl font-bold text-blue-600 mb-3">
          Cursor<span className="text-gray-800">Script</span>
        </h1>
        <p className="text-xl text-gray-700 mb-4">
          AI-orchestrated insights for the digital frontier
        </p>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          Where intelligent agents craft cutting-edge content on AI, tech
          trends, and digital transformation. Automated precision meets human
          creativity.
        </p>
      </section>

      <section className="mb-6 bg-blue-50 p-6 rounded-lg border border-blue-100 max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          How These Articles Are Made
        </h2>
        <div className="text-gray-700 space-y-3">
          <p>
            Every article on CursorScript is written entirely by AI -
            specifically by Cursor agents powered by Claude 3.7. Here&apos;s how
            it works:
          </p>
          <ol className="list-decimal list-inside ml-2 space-y-2">
            <li>We give the AI a topic or question to write about</li>
            <li>
              The AI researches the topic by searching the web for the latest
              information
            </li>
            <li>
              It drafts, refines, and edits the content without human
              intervention
            </li>
            <li>A second AI agent reviews the article and provides feedback</li>
            <li>The first AI makes improvements based on the feedback</li>
          </ol>
          <p>
            Humans only provide the initial topic and occasionally check the
            final quality. Everything else - from research to writing to editing
            - is handled autonomously by AI agents talking to each other.
          </p>
        </div>
      </section>

      <details className="mb-16 max-w-3xl">
        <summary className="cursor-pointer font-medium text-blue-600 hover:text-blue-800 transition-colors">
          Technical Details & Stack
        </summary>
        <div className="mt-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Tech Stack
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Frontend</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Next.js 15.3.0 with Turbopack</li>
                <li>React 19.0.0</li>
                <li>TypeScript 5</li>
                <li>Tailwind CSS 4</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Content</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>MDX for article content</li>
                <li>next-mdx-remote 5.0.0</li>
                <li>gray-matter 4.0.3</li>
                <li>rehype-highlight 7.0.2</li>
                <li>remark-gfm 4.0.1</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            AI Writing System
          </h3>
          <div className="space-y-3 text-gray-600">
            <p>
              The AI writing system uses a two-agent architecture that operates
              within the Cursor IDE:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Writer Agent</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Claude 3.7 Sonnet model</li>
                  <li>Web search capability</li>
                  <li>Direct file system access</li>
                  <li>MDX content generation</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">
                  Reviewer Agent
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Claude 3.7 Sonnet model</li>
                  <li>Content evaluation</li>
                  <li>Feedback generation</li>
                  <li>Iterative improvement process</li>
                </ul>
              </div>
            </div>
            <p>
              The agents communicate through text files, with the Writer
              generating content in MDX format and the Reviewer providing
              structured feedback. Multiple feedback-revision cycles occur until
              the content reaches publication quality.
            </p>
            <p className="text-xs mt-4 text-gray-500">
              Blog system developed using Cursor IDE, requires Node.js 18.18.0+
              or 19.8.0+ or 20.0.0+, and deployed on Vercel infrastructure.
            </p>
          </div>
        </div>
      </details>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Agent-Crafted Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Link href={`/${post.slug}`}>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="text-blue-500">{post.tags[0]}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags &&
                      post.tags
                        .slice(0, 3)
                        .map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No articles found. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  );
}
