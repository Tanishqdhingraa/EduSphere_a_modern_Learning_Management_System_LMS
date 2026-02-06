import { Link } from "react-router-dom";
import { BookOpen, Trophy, Clock, Flame, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { CourseCard } from "@/components/courses/CourseCard";
import { enrolledCourses, userData } from "@/data/mockData";

export default function Dashboard() {
  const recentCourses = enrolledCourses.slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Hero Section */}
      <section className="gradient-hero py-12 sm:py-16">
        <div className="page-container">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
              Welcome back, {userData.name}! 👋
            </h1>
            <p className="mt-3 text-lg text-primary-foreground/80">
              Ready to continue your learning journey? You're doing great!
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/your-learning">
                <Button variant="accent" size="lg" className="gap-2">
                  <Play className="h-5 w-5" />
                  Continue Learning
                </Button>
              </Link>
              <Link to="/top-courses">
                <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="page-container -mt-8 sm:-mt-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <StatCard
              title="Enrolled Courses"
              value={userData.enrolledCourses}
              icon={BookOpen}
              trend={{ value: 12, isPositive: true }}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <StatCard
              title="Completed"
              value={userData.completedCourses}
              icon={Trophy}
              variant="primary"
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <StatCard
              title="Hours Learned"
              value={userData.hoursLearned}
              description="This month"
              icon={Clock}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <StatCard
              title="Day Streak"
              value={userData.streak}
              description="Keep it up!"
              icon={Flame}
              variant="accent"
            />
          </div>
        </div>
      </section>

      {/* Continue Learning Section */}
      <section className="page-container mt-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="section-title">Continue Learning</h2>
            <p className="section-subtitle mt-1">Pick up where you left off</p>
          </div>
          <Link to="/your-learning">
            <Button variant="ghost" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentCourses.map((course, index) => (
            <div
              key={course.id}
              className="animate-slide-up"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <CourseCard course={course} variant="enrolled" />
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="page-container mt-12">
        <h2 className="section-title mb-6">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/your-learning"
            className="card-interactive flex items-center gap-4 rounded-xl border border-border bg-card p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Your Learning</h3>
              <p className="text-sm text-muted-foreground">
                {userData.enrolledCourses} courses in progress
              </p>
            </div>
          </Link>

          <Link
            to="/top-courses"
            className="card-interactive flex items-center gap-4 rounded-xl border border-border bg-card p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
              <Trophy className="h-6 w-6 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Top Courses</h3>
              <p className="text-sm text-muted-foreground">
                Discover trending courses
              </p>
            </div>
          </Link>

          <Link
            to="#"
            className="card-interactive flex items-center gap-4 rounded-xl border border-border bg-card p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
              <Flame className="h-6 w-6 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Certificates</h3>
              <p className="text-sm text-muted-foreground">
                {userData.certificates} earned
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
