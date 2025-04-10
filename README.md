# Cursor Driven Marketing

<p align="center">
  <img src="public/images/cursor-driven-marketing.svg" alt="Cursor Driven Marketing" width="800" />
</p>

## The Idea

This is an MVP that illustrates the concept of a marketing website that can be semi-automated via Cursor. It demonstrates how AI-powered content creation can streamline marketing workflows while maintaining quality through automated review processes.

The system utilizes Cursor's rules and tabs features to create two distinct AI agents that work collaboratively:

- One agent writes articles based on research
- Another agent reviews the content and provides suggestions
- The agents continue this loop until the content meets quality standards

What makes this approach powerful is Cursor's internet search functionality, enabling the creation of up-to-date articles with current information. This allows marketing teams to produce timely, relevant content without the typical research and editing bottlenecks.

**Current Limitations**: This is a proof of concept and not perfect - the agents sometimes break or stop in unexpected places. However, it effectively demonstrates what's possible with AI-assisted content creation workflows in marketing.

## How it Works

This project employs a collaborative AI system using two distinct agents defined in the `.cursor/rules/` directory: `writer.mdc` and `reviewer.mdc`.

1.  **`agent-writer`**:

    - Initiates the process.
    - Researches topics using web searches.
    - Writes articles in MDX format and saves them into the `src/content/` directory.
    - Communicates progress and filenames by writing to `agent_writer.txt`.
    - Reads feedback from `agent_reviewer.txt` and implements it directly.

2.  **`agent-reviewer`**:

    - Acts as an editor, reviewing the content provided by `agent-writer` via `agent_writer.txt`.
    - Provides specific feedback and suggestions by writing to `agent_reviewer.txt`.
    - Ensures the final article is sophisticated and comprehensive.

3.  **Communication & Workflow**:
    - Agents communicate asynchronously using `agent_writer.txt` and `agent_reviewer.txt`.
    - They use a polling mechanism (`sleep 5` and check) to wait for updates from each other.
    - The cycle of writing, reviewing, and refining continues autonomously until the article meets the required standard.
    - The final content resides in `src/content/` for use by the Next.js application.

This setup creates an automated pipeline for generating and refining website content.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
