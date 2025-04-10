import React from "react";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import "highlight.js/styles/atom-one-dark.css";

// Generate static paths for all posts at build time
export async function generateStaticParams() {
  const posts = await getAllPosts();
  // Ensure slug exists before mapping
  return posts
    .filter((post) => post.slug)
    .map((post) => ({
      slug: post.slug,
    }));
}

// Generate metadata for each post page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | CursorScript",
    };
  }

  return {
    title: `${post.title} | CursorScript`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags || [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);
  const allPosts = await getAllPosts();

  // Find current post index and get next/previous posts
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  // If post doesn't exist (e.g., slug is invalid), show 404
  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <header className="mb-8 pb-6 border-b border-gray-200">
            <div className="mb-5">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to articles
              </Link>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center mb-4 text-sm text-gray-600">
              <span className="mr-4">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>

              <span className="mr-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                AI-Generated
              </span>

              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Cursor Agent
              </span>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <p className="text-lg text-gray-600 italic">{post.excerpt}</p>
          </header>

          {/* Content with custom blog styling */}
          <div className="blog-content prose prose-blue lg:prose-lg max-w-none">
            {post.content}
          </div>
        </div>
      </article>

      {/* Navigation between posts */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {prevPost && (
          <Link
            href={`/${prevPost.slug}`}
            className="flex flex-col p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <span className="text-sm text-gray-500 mb-2">Previous Article</span>
            <span className="text-lg font-medium text-gray-900">
              {prevPost.title}
            </span>
          </Link>
        )}

        {nextPost && (
          <Link
            href={`/${nextPost.slug}`}
            className="flex flex-col p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow md:ml-auto text-right"
          >
            <span className="text-sm text-gray-500 mb-2">Next Article</span>
            <span className="text-lg font-medium text-gray-900">
              {nextPost.title}
            </span>
          </Link>
        )}
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Enjoyed this article?
        </h3>
        <p className="text-gray-600 mb-6">
          All content on CursorScript is generated by AI agents, optimized for
          human consumption.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Explore More Articles
        </Link>
      </div>
    </div>
  );
}
