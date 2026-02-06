import { useState } from "react";
import { Search, SlidersHorizontal, Star, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/courses/CourseCard";
import { allCourses, categories } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function TopCourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState<string>("All Levels");
  const [sortBy, setSortBy] = useState<"rating" | "students" | "newest">("rating");
  const { toast } = useToast();

  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = allCourses
    .filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All Categories" || course.category === selectedCategory;
      const matchesLevel = selectedLevel === "All Levels" || course.level === selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "students") return b.students - a.students;
      return 0;
    });

  const handleEnroll = (courseTitle: string) => {
    toast({
      title: "Enrolled successfully!",
      description: `You've been enrolled in "${courseTitle}"`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <section className="gradient-hero py-12 sm:py-16">
        <div className="page-container">
          <div className="animate-fade-in text-center">
            <h1 className="text-3xl font-bold text-primary-foreground sm:text-4xl md:text-5xl">
              Explore Top Courses
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              Discover courses taught by industry experts and accelerate your career growth
            </p>

            {/* Search Bar */}
            <div className="mx-auto mt-8 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for courses, topics, or instructors..."
                  className="input-styled w-full py-4 pl-12 pr-4 text-base"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-2 text-primary-foreground/90">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold">{allCourses.length}+ Courses</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/90">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-semibold">4.7 Avg Rating</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/90">
                <Users className="h-5 w-5" />
                <span className="font-semibold">1M+ Students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-container py-8">
        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  selectedCategory === category
                    ? "gradient-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Filters Row */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          {/* Level Filter */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Level:</span>
            <div className="flex gap-2">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    selectedLevel === level
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="rating">Highest Rated</option>
              <option value="students">Most Popular</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="mb-6 text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredCourses.length}</span> courses
        </p>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                className="animate-slide-up"
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                <CourseCard
                  course={course}
                  onAction={() => handleEnroll(course.title)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16">
            <Search className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">No courses found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Categories");
                setSelectedLevel("All Levels");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
