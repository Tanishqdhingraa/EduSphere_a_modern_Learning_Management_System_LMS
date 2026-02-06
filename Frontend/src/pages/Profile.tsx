import { useState } from "react";
import { User, Mail, Lock, Bell, Shield, Camera, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { userData } from "@/data/mockData";

type TabType = "profile" | "account" | "notifications" | "privacy";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const { toast } = useToast();

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "account" as const, label: "Account", icon: Lock },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "privacy" as const, label: "Privacy", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <section className="border-b border-border bg-card py-8">
        <div className="page-container">
          <h1 className="section-title text-3xl">Settings</h1>
          <p className="section-subtitle mt-2">
            Manage your account settings and preferences
          </p>
        </div>
      </section>

      <div className="page-container py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-64 lg:flex-shrink-0">
            <nav className="sticky top-24 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1">
            <div className="rounded-xl border border-border bg-card">
              {activeTab === "profile" && <ProfileTab toast={toast} />}
              {activeTab === "account" && <AccountTab toast={toast} />}
              {activeTab === "notifications" && <NotificationsTab toast={toast} />}
              {activeTab === "privacy" && <PrivacyTab toast={toast} />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) {
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    bio: "Passionate learner exploring web development and data science.",
    location: "San Francisco, CA",
    website: "https://alexjohnson.dev",
  });

  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
    });
  };

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Update your profile details and public information
      </p>

      <div className="mt-8">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary">
              {formData.name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform hover:scale-105">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div>
            <h3 className="font-medium text-foreground">{formData.name}</h3>
            <p className="text-sm text-muted-foreground">{formData.email}</p>
          </div>
        </div>

        {/* Form */}
        <div className="mt-8 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-styled w-full"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-styled w-full"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              className="input-styled w-full resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input-styled w-full"
                placeholder="City, Country"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="input-styled w-full"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button variant="gradient" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

function AccountTab({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your new passwords match.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-foreground">Account Settings</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage your account security and preferences
      </p>

      {/* Change Password */}
      <div className="mt-8">
        <h3 className="flex items-center gap-2 text-lg font-medium text-foreground">
          <Lock className="h-5 w-5 text-muted-foreground" />
          Change Password
        </h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="input-styled w-full max-w-md"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-styled w-full max-w-md"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-styled w-full max-w-md"
              placeholder="Confirm new password"
            />
          </div>
          <Button variant="gradient" onClick={handlePasswordChange}>
            Update Password
          </Button>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="mt-10 border-t border-border pt-8">
        <h3 className="flex items-center gap-2 text-lg font-medium text-foreground">
          <Mail className="h-5 w-5 text-muted-foreground" />
          Connected Accounts
        </h3>
        <div className="mt-4 space-y-3">
          {[
            { name: "Google", email: "alex.johnson@gmail.com", connected: true },
            { name: "GitHub", email: "Not connected", connected: false },
            { name: "LinkedIn", email: "Not connected", connected: false },
          ].map((account) => (
            <div
              key={account.name}
              className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4"
            >
              <div>
                <p className="font-medium text-foreground">{account.name}</p>
                <p className="text-sm text-muted-foreground">{account.email}</p>
              </div>
              <Button
                variant={account.connected ? "outline" : "default"}
                size="sm"
              >
                {account.connected ? "Disconnect" : "Connect"}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-10 border-t border-border pt-8">
        <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Irreversible and destructive actions
        </p>
        <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-foreground">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationsTab({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) {
  const [notifications, setNotifications] = useState({
    emailCourseUpdates: true,
    emailNewCourses: true,
    emailPromotions: false,
    emailWeeklyDigest: true,
    pushCourseReminders: true,
    pushAchievements: true,
    pushCommunity: false,
    pushAnnouncements: true,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    toast({
      title: "Preferences saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-foreground">Notification Preferences</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Choose how you want to receive notifications
      </p>

      {/* Email Notifications */}
      <div className="mt-8">
        <h3 className="flex items-center gap-2 text-lg font-medium text-foreground">
          <Mail className="h-5 w-5 text-muted-foreground" />
          Email Notifications
        </h3>
        <div className="mt-4 space-y-4">
          <NotificationToggle
            title="Course Updates"
            description="Get notified when your enrolled courses have new content"
            checked={notifications.emailCourseUpdates}
            onToggle={() => handleToggle("emailCourseUpdates")}
          />
          <NotificationToggle
            title="New Course Releases"
            description="Be the first to know about new courses in your interests"
            checked={notifications.emailNewCourses}
            onToggle={() => handleToggle("emailNewCourses")}
          />
          <NotificationToggle
            title="Promotions & Offers"
            description="Receive special discounts and promotional offers"
            checked={notifications.emailPromotions}
            onToggle={() => handleToggle("emailPromotions")}
          />
          <NotificationToggle
            title="Weekly Learning Digest"
            description="Get a weekly summary of your learning progress"
            checked={notifications.emailWeeklyDigest}
            onToggle={() => handleToggle("emailWeeklyDigest")}
          />
        </div>
      </div>

      {/* Push Notifications */}
      <div className="mt-10 border-t border-border pt-8">
        <h3 className="flex items-center gap-2 text-lg font-medium text-foreground">
          <Bell className="h-5 w-5 text-muted-foreground" />
          Push Notifications
        </h3>
        <div className="mt-4 space-y-4">
          <NotificationToggle
            title="Course Reminders"
            description="Remind you to continue your learning streak"
            checked={notifications.pushCourseReminders}
            onToggle={() => handleToggle("pushCourseReminders")}
          />
          <NotificationToggle
            title="Achievements & Badges"
            description="Celebrate when you earn new achievements"
            checked={notifications.pushAchievements}
            onToggle={() => handleToggle("pushAchievements")}
          />
          <NotificationToggle
            title="Community Activity"
            description="Updates from discussions and Q&A"
            checked={notifications.pushCommunity}
            onToggle={() => handleToggle("pushCommunity")}
          />
          <NotificationToggle
            title="Important Announcements"
            description="Critical updates about the platform"
            checked={notifications.pushAnnouncements}
            onToggle={() => handleToggle("pushAnnouncements")}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button variant="gradient" onClick={handleSave}>
          Save Preferences
        </Button>
      </div>
    </div>
  );
}

function PrivacyTab({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) {
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showProgress: true,
    showCertificates: true,
    allowMessages: false,
  });

  const handleToggle = (key: keyof typeof privacy) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    toast({
      title: "Privacy settings saved",
      description: "Your privacy preferences have been updated.",
    });
  };

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-foreground">Privacy Settings</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Control your privacy and data sharing preferences
      </p>

      <div className="mt-8 space-y-4">
        <NotificationToggle
          title="Public Profile"
          description="Allow others to view your profile and bio"
          checked={privacy.profilePublic}
          onToggle={() => handleToggle("profilePublic")}
        />
        <NotificationToggle
          title="Show Learning Progress"
          description="Display your course progress on your public profile"
          checked={privacy.showProgress}
          onToggle={() => handleToggle("showProgress")}
        />
        <NotificationToggle
          title="Show Certificates"
          description="Display earned certificates on your profile"
          checked={privacy.showCertificates}
          onToggle={() => handleToggle("showCertificates")}
        />
        <NotificationToggle
          title="Allow Direct Messages"
          description="Let other learners send you messages"
          checked={privacy.allowMessages}
          onToggle={() => handleToggle("allowMessages")}
        />
      </div>

      {/* Data Export */}
      <div className="mt-10 border-t border-border pt-8">
        <h3 className="text-lg font-medium text-foreground">Your Data</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Download or manage your personal data
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="outline">Download My Data</Button>
          <Button variant="outline">Request Data Deletion</Button>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button variant="gradient" onClick={handleSave}>
          Save Settings
        </Button>
      </div>
    </div>
  );
}

function NotificationToggle({
  title,
  description,
  checked,
  onToggle,
}: {
  title: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onToggle} />
    </div>
  );
}
