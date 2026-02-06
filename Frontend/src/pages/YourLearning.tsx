import { useState } from "react";
import { Search, Filter, BookOpen, Clock, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/courses/CourseCard";
import { enrolledCourses, categories } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function YourLearning() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [progressFilter, setProgressFilter] = useState<"all" | "in-progress" | "completed">("all");

  const filteredCourses = enrolledCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || course.category === selectedCategory;
    const matchesProgress = progressFilter === "all" ||
      (progressFilter === "completed" && course.progress === 100) ||
      (progressFilter === "in-progress" && (course.progress ?? 0) < 100);
    
    return matchesSearch && matchesCategory && matchesProgress;
  });

  const totalHours = enrolledCourses.reduce((acc, course) => {
    const hours = parseInt(course.duration) || 0;
    return acc + hours;
  }, 0);

  const completedCount = enrolledCourses.filter((c) => c.progress === 100).length;

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <section className="border-b border-border bg-card py-8 sm:py-12">
        <div className="page-container">
          <h1 className="section-title text-3xl sm:text-4xl">Your Learning</h1>
          <p className="section-subtitle mt-2">
            Track your progress and continue where you left off
          </p>

          {/* Stats */}
          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{enrolledCourses.length}</p>
                <p className="text-sm text-muted-foreground">Courses</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalHours}</p>
                <p className="text-sm text-muted-foreground">Hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <Trophy className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{completedCount}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-container py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar / Filters */}
          <aside className="w-full lg:w-64 lg:flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div>
                <label htmlFor="search" className="mb-2 block text-sm font-medium text-foreground">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses..."
                    className="input-styled w-full pl-10"
                  />
                </div>
              </div>

              {/* Progress Filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Progress
                </label>
                <div className="flex flex-col gap-2">
                  {(["all", "in-progress", "completed"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setProgressFilter(filter)}
                      className={cn(
                        "rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors",
                        progressFilter === filter
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      )}
                    >
                      {filter === "all" ? "All Courses" : filter === "in-progress" ? "In Progress" : "Completed"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Category
                </label>
                <div className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors",
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Course Grid */}
          <main className="flex-1">
            {filteredCourses.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${0.05 * index}s` }}
                  >
                    <CourseCard course={course} variant="enrolled" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16">
                <BookOpen className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">No courses found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Categories");
                    setProgressFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
