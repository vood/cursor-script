# Cursor Driven Marketing

<p align="center">
  <img src="public/images/cursor-driven-marketing.svg" alt="Cursor Driven Marketing" width="800" />
</p>

## The Idea

This is a demo showing how Cursor can help create marketing websites with less manual work. It shows how AI can make content creation faster while still keeping quality high.

The original idea for this approach was found on Twitter: [https://x.com/hive_echo/status/1908052957926666376](https://x.com/hive_echo/status/1908052957926666376)

The system uses two AI assistants that work together:

- A writer that researches and creates articles
- A reviewer that checks the content and suggests improvements
- They go back and forth until the article is good enough

What makes this powerful is that Cursor can search the internet, so it creates articles with current information. This helps marketing teams make timely content without spending hours on research.

The best part is that Cursor is great at writing code. This means it can create fancy content with custom components, charts, graphs, and interactive elements. Your marketing content can be much more than just text, without needing a developer to help.

**Current Limitations**: This is just a demo and isn't perfect - sometimes the AI assistants get stuck or make mistakes. But it shows what's possible with AI-powered content creation for marketing.

## Creating a Custom Content Marketer Agent

You can easily create your own Content Marketer agent directly in Cursor using the custom models feature:

1. Enable custom models in the Features section in the Cursor Settings
2. Create a custom model from the models dropdown (as shown in the UI)
3. Paste content from the `prompt.txt` file into advanced instructions in the Advanced options setting
4. Make sure "All tools" are selected, and ensure that `claude-3.7-sonnet-thinking` is selected as the model
5. Name it "Content Marketer" and save
6. Select the created model from the model dropdown
7. Ask it to write an article
8. Profit!

This approach gives you a dedicated content creation assistant right in your editor, without needing to set up the more complex agent system described below.

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
