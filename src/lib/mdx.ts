import { readFileSync, readdirSync } from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx/MDXComponents";

// Define the structure of a post
export interface Post {
  slug: string;
  title: string;
  date: string; // Expecting 'YYYY-MM-DD' format in frontmatter
  excerpt: string;
  content: React.ReactElement; // Compiled MDX content
  tags?: string[]; // Optional tags array
  [key: string]: unknown; // Allow other frontmatter fields with unknown type
}

const postsDirectory = path.join(process.cwd(), "src/content/blog");

// Function to get all blog posts, sorted by date descending
export async function getAllPosts(): Promise<Post[]> {
  const filenames = readdirSync(postsDirectory);

  const posts = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith(".mdx"))
      .map(async (filename) => {
        const slug = filename.replace(/\.mdx$/, "");
        const postData = await getPostBySlug(slug);
        // Ensure postData is not null before returning
        return postData ? { ...postData, slug } : null;
      })
  );

  // Filter out any null results (e.g., if getPostBySlug failed)
  const validPosts = posts.filter((post): post is Post => post !== null);

  // Sort by date
  return validPosts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; // Descending order
  });
}

// Function to get a specific blog post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  try {
    const fileContents = readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Basic validation for required frontmatter
    if (!data.title || !data.date || !data.excerpt) {
      console.warn(
        `Post "${slug}" is missing required frontmatter (title, date, excerpt).`
      );
      // Decide if you want to return null or a partial post
      // return null;
    }

    const result = await compileMDX<{
      title?: string;
      date?: string;
      excerpt?: string;
      tags?: string[];
    }>({
      source: content,
      options: {
        parseFrontmatter: false, // We already parsed it with gray-matter
        mdxOptions: {
          rehypePlugins: [rehypeHighlight],
          remarkPlugins: [remarkGfm],
          // You might need to configure rehypeHighlight styles separately
        },
      },
      components: mdxComponents,
    });

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || "",
      excerpt: data.excerpt || "",
      content: result.content,
      tags: data.tags,
      ...data,
    };
  } catch (error) {
    // More specific error handling (e.g., file not found)
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.error(
        `Error: MDX file not found for slug: ${slug} at ${fullPath}`
      );
    } else {
      console.error(`Error processing MDX file for slug: ${slug}`, error);
    }
    return null;
  }
}
