import { ChevronDownIcon } from "@/components/icons/UiIcons";
import CommentForm from "@/components/tasks/CommentForm";
import Avatar from "@/components/ui/Avatar";
import { formatDateTime } from "@/lib/format";
import type { TaskComment } from "@/lib/tasks";

type TaskCommentsProps = {
  comments: TaskComment[];
  projectId: string;
  taskId: string;
  taskTitle: string;
  currentUserName?: string;
};

export default function TaskComments({
  comments,
  projectId,
  taskId,
  taskTitle,
  currentUserName,
}: TaskCommentsProps) {
  return (
    <details className="group border-t border-grey-200">
      <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-body-s text-grey-950 [&::-webkit-details-marker]:hidden">
        Commentaires ({comments.length})
        <ChevronDownIcon className="text-grey-950 transition-transform group-open:rotate-180" />
      </summary>

      <div className="flex flex-col gap-4 pb-2">
        {comments.length === 0 ? (
          <p className="text-body-xs text-grey-600">Aucun commentaire.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {comments.map((comment) => (
              <li key={comment.id} className="flex items-start gap-2">
                <Avatar name={comment.author.name} />
                <span className="sr-only">{comment.author.name}</span>
                <div className="flex flex-1 flex-col gap-2 rounded-[10px] bg-grey-100 px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-body-s text-grey-950" aria-hidden="true">
                      {comment.author.name}
                    </p>
                    <time dateTime={comment.createdAt} className="text-body-2xs text-grey-600">
                      {formatDateTime(comment.createdAt)}
                    </time>
                  </div>
                  <p className="text-body-xs text-grey-950">{comment.content}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        <CommentForm
          projectId={projectId}
          taskId={taskId}
          taskTitle={taskTitle}
          currentUserName={currentUserName}
        />
      </div>
    </details>
  );
}
