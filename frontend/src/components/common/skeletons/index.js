// frontend/src/components/common/skeletons/index.js

/**
 * Centralized exports for all skeleton components.
 * Import from this file for cleaner imports across the application.
 *
 * Usage example:
 * import { TaskCardSkeleton, NotificationItemSkeleton } from '@/components/common/skeletons';
 */

export { TaskCardSkeleton } from "./TaskCardSkeleton";
export {
  NotificationItemSkeleton,
  NotificationListSkeleton,
} from "./NotificationItemSkeleton";
export { TeamCardSkeleton, TeamGridSkeleton } from "./TeamCardSkeleton";
export {
  MessageSkeleton,
  ChatWindowSkeleton,
  ConversationItemSkeleton,
  ConversationListSkeleton,
} from "./MessageSkeleton";
