import { Star, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Course {
  id: string;
  title: string;
  instructor: string;
  image: string;
  rating: number;
  students: number;
  duration: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  progress?: number;
}

interface CourseCardProps {
  course: Course;
  variant?: "default" | "enrolled";
  onAction?: () => void;
}

export function CourseCard({ course, variant = "default", onAction }: CourseCardProps) {
  const levelColors = {
    Beginner: "bg-success/10 text-success",
    Intermediate: "bg-warning/10 text-warning",
    Advanced: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="card-interactive group overflow-hidden rounded-xl border border-border bg-card">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <span className={cn("rounded-full px-3 py-1 text-xs font-medium", levelColors[course.level])}>
            {course.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {course.category}
        </p>
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="mb-3 text-sm text-muted-foreground">by {course.instructor}</p>

        {/* Stats */}
        <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="font-medium text-foreground">{course.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Progress bar for enrolled courses */}
        {variant === "enrolled" && course.progress !== undefined && (
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-primary">{course.progress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${course.progress}%` }} />
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button
          variant={variant === "enrolled" ? "gradient" : "outline"}
          className="w-full"
          onClick={onAction}
        >
          {variant === "enrolled" ? "Continue Learning" : "Enroll Now"}
        </Button>
      </div>
    </div>
  );
}
