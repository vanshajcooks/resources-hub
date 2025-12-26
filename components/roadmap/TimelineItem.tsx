interface TimelineItemProps {
  index: number;
  title: string;
  description?: string;
  resources: string[];
  completed: boolean;
  onToggle?: () => void;
}

export default function TimelineItem({
  index,
  title,
  description,
  resources,
  completed,
  onToggle,
}: TimelineItemProps) {
  return (
    <div className="relative">
      {/* Timeline dot */}
      <span className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-white border-2 border-neutral-400 flex items-center justify-center text-xs font-bold text-neutral-600">
        {index}
      </span>

      <div className="ml-4 space-y-2">
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            checked={completed}
            onChange={onToggle}
            className="mt-1 h-4 w-4 accent-blue-600 cursor-pointer"
          />

          <div className="space-y-2">
            <h3
              className={`text-lg font-semibold ${
                completed ? "line-through text-neutral-400" : ""
              }`}
            >
              {title}
            </h3>

            {description && (
              <p className="text-sm text-neutral-600">{description}</p>
            )}

            {resources.length > 0 && (
              <ul className="list-disc list-inside text-sm">
                {resources.map((url) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
