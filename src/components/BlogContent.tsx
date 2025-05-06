export default function BlogContent({ content }: { content: string }) {
    // Simple implementation - in a real app, you might use a markdown parser
    // or rich text editor to handle formatting
    return (
      <div className="prose max-w-none">
        {content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    )
  }