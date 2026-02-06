import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Award, TrendingUp, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/courses/CourseCard";
import { allCourses } from "@/data/mockData";

export default function Index() {
  const featuredCourses = allCourses.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
        <div className="page-container relative py-20 sm:py-28 lg:py-36">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              Unlock Your Potential with{" "}
              <span className="text-accent">Expert-Led</span> Courses
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 sm:text-xl">
              Join millions of learners worldwide. Access thousands of courses from top instructors and transform your career today.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/signup">
                <Button variant="accent" size="xl" className="gap-2">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/top-courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Play className="h-5 w-5" />
                  Browse Courses
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-20">
            {[
              { icon: Users, value: "1M+", label: "Active Learners" },
              { icon: BookOpen, value: "500+", label: "Expert Courses" },
              { icon: Award, value: "50K+", label: "Certificates Issued" },
              { icon: Star, value: "4.8", label: "Average Rating" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="animate-slide-up rounded-xl bg-primary-foreground/10 p-6 text-center backdrop-blur-sm"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <stat.icon className="mx-auto h-8 w-8 text-accent" />
                <p className="mt-3 text-2xl font-bold text-primary-foreground sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="page-container py-16 sm:py-24">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Featured Courses
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              Start Learning Today
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Handpicked courses from our top instructors to help you master new skills
            </p>
          </div>
          <Link to="/top-courses">
            <Button variant="outline" className="gap-2">
              View All Courses
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCourses.map((course, index) => (
            <div
              key={course.id}
              className="animate-slide-up"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-secondary/50 py-16 sm:py-24">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Why LearnHub
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              Everything You Need to Succeed
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Expert-Led Courses",
                description:
                  "Learn from industry professionals with real-world experience and proven teaching methods.",
              },
              {
                icon: TrendingUp,
                title: "Career Growth",
                description:
                  "Gain in-demand skills and get certified to advance your career in today's competitive market.",
              },
              {
                icon: Users,
                title: "Vibrant Community",
                description:
                  "Connect with fellow learners, share insights, and grow together in our supportive community.",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="card-interactive rounded-xl border border-border bg-card p-8 animate-slide-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-3 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-container py-16 sm:py-24">
        <div className="relative overflow-hidden rounded-3xl gradient-hero px-8 py-16 text-center sm:px-16 sm:py-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
          </div>
          <div className="relative">
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">
              Ready to Start Learning?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
              Join over 1 million learners and take the first step towards achieving your goals.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/signup">
                <Button variant="accent" size="xl" className="gap-2">
                  Create Free Account
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/60">
              No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="page-container">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">LearnHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} LearnHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
