// src/components/SocialMediaPage.tsx
import React from "react";
import {
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  Twitter,
  Globe,
  Heart,
  Users,
  Sparkles,
  Award,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import logo from "/new-logo.png";

const SocialMediaPage = () => {
  const socialMediaPlatforms = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/share/1Ag88rKEHP/?mibextid=wwXIfr",
      description:
        "Daily health tips, community discussions, and live Q&A sessions",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      followers: "15.2K",
      category: "Community",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/company/optimum-health-global-opheg-org/",
      description:
        "Professional network, career opportunities, and industry insights",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      followers: "8.7K",
      category: "Professional",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@opheg22?si=g-XMmN3pmrBwnT_P",
      description:
        "Educational videos, workout tutorials, and expert interviews",
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600",
      followers: "25.4K",
      category: "Education",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/opheg22/",
      description: "Visual health tips, success stories, and daily inspiration",
      color: "bg-pink-500",
      hoverColor: "hover:bg-pink-600",
      followers: "32.8K",
      category: "Lifestyle",
    },
    // {
    //   name: "Twitter",
    //   icon: Twitter,
    //   url: "https://twitter.com/OptimumHealthG",
    //   description: "Quick health updates, trending topics, and expert threads",
    //   color: "bg-blue-400",
    //   hoverColor: "hover:bg-blue-500",
    //   followers: "12.3K",
    //   category: "News",
    // },
    {
      name: "TikTok",
      icon: (props: any) => (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.302-.002.603.055.89.17V9.4a6.33 6.33 0 0 0-.9-.13A6.67 6.67 0 0 0 5 20.1a6.67 6.67 0 0 0 11.76-4.43v-6.4a8.11 8.11 0 0 0 4.24 1.26v-3.45a4.85 4.85 0 0 1-1.41-.2z" />
        </svg>
      ),
      url: "https://www.tiktok.com/@healthflix22?_r=1&_t=ZM-924qyx9TWDU",
      description:
        "Short-form health videos, quick tips, and trending challenges",
      color: "bg-black",
      hoverColor: "hover:bg-gray-800",
      followers: "45.6K",
      category: "Entertainment",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://whatsapp.com/channel/0029Va9GFEw4inozEFm3a52N",
      description: "Updates about the Organization and activities",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      followers: "Direct Chat",
      category: "Channel",
    },
  ];

  //   const featuredContent = [
  //     {
  //       platform: "YouTube",
  //       title: "Morning Yoga Routine for Beginners",
  //       views: "125K views",
  //       duration: "15 min",
  //       thumbnailColor: "bg-red-100",
  //     },
  //     {
  //       platform: "Instagram",
  //       title: "Healthy Meal Prep Ideas",
  //       likes: "8.2K likes",
  //       duration: "Carousel",
  //       thumbnailColor: "bg-pink-100",
  //     },
  //     {
  //       platform: "TikTok",
  //       title: "5-Minute Desk Exercises",
  //       views: "850K views",
  //       duration: "60 sec",
  //       thumbnailColor: "bg-gray-100",
  //     },
  //   ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <img
                  src={logo}
                  alt="OPHEG Logo"
                  className="h-24 w-28 object-contain rounded-full"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join Our <span className="text-yellow-300">Health</span> Community
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Follow Optimum Health Global across platforms for daily
              inspiration, expert advice, and a supportive community
            </p>
            <div className="flex items-center justify-center gap-4 text-lg">
              <Users className="h-6 w-6" />
              <span>Join our health enthusiasts worldwide</span>
              <Sparkles className="h-6 w-6 text-yellow-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">100K+</p>
                <p className="text-gray-600">Total Followers</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Sparkles className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">6</p>
                <p className="text-gray-600">Active Platforms</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">Daily</p>
                <p className="text-gray-600">New Content</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Social Media Cards */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Connect With Us
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Choose your favorite platform to get daily health tips, connect with
            experts, and join our growing community
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialMediaPlatforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${platform.hoverColor}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${platform.color} text-white`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {platform.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-white">
                    {platform.name}
                  </h3>
                  <p className="text-gray-600 mb-4 group-hover:text-white/90">
                    {platform.description}
                  </p>

                  <div className="flex items-center justify-between mt-6">
                    {/* <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500 group-hover:text-white" />
                      <span className="font-semibold text-gray-900 group-hover:text-white">
                        {platform.followers} followers
                      </span>
                    </div> */}
                    <div className="flex items-center gap-2 text-blue-600 group-hover:text-white">
                      <span className="font-medium">Follow</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Featured Content */}
        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Featured Content
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Check out some of our most popular content across platforms
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredContent.map((content) => (
              <div
                key={content.title}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 group hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`${content.thumbnailColor} h-48 flex items-center justify-center`}
                >
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Youtube className="h-10 w-10 text-red-500" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-white rounded-full shadow-md">
                      <span className="text-sm font-medium text-gray-700">
                        {content.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {content.platform}
                    </span>
                    <span className="text-sm text-gray-500">
                      {content.views}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                    {content.title}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Sparkles className="h-4 w-4" />
                    Trending this week
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Newsletter CTA */}
        {/* <div className="bg-gradient-to-r from-blue-500 to-teal-400 rounded-2xl p-8 md:p-12 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Don't Miss Any Updates!</h3>
            <p className="text-lg mb-8 opacity-90">
              Subscribe to our weekly newsletter for the best content from all
              platforms delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm mt-4 opacity-75">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div> */}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center gap-6 mb-8">
              {socialMediaPlatforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                    aria-label={`Follow on ${platform.name}`}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
            <p className="text-gray-400">
              © {new Date().getFullYear()} Optimum Health Global. All rights
              reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Empowering healthier lives through education and community support
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SocialMediaPage;
