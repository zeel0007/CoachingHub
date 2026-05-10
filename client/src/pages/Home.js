import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, FileText, Bell, Sparkles } from 'lucide-react';

function Home() {
  const features = [
    {
      title: 'Topic-wise Notes',
      desc: 'Structured study material for Agriculture, Gujarat GK, Gujarati, and English.',
      icon: <BookOpen className="w-8 h-8" />,
      link: '/notes',
      color: 'bg-emerald-500/20 text-emerald-300'
    },
    {
      title: 'MCQ Practice Quiz',
      desc: 'Test your knowledge with chapter-wise quizzes and track your score.',
      icon: <CheckCircle className="w-8 h-8" />,
      link: '/quiz',
      color: 'bg-blue-500/20 text-blue-300'
    },
    {
      title: 'Previous Year Papers',
      desc: 'Download GPSSB Gram Sevak original questions papers from past exams.',
      icon: <FileText className="w-8 h-8" />,
      link: '/pyqs',
      color: 'bg-purple-500/20 text-purple-300'
    },
    {
      title: 'Govt Job Updates',
      desc: 'Get the latest notifications for Gujarat Panchayat and State Service jobs.',
      icon: <Bell className="w-8 h-8" />,
      link: '/jobs',
      color: 'bg-amber-500/20 text-amber-300'
    }
  ];

  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section className="relative bg-hero-gradient text-white py-20 lg:py-32 overflow-hidden border-b border-[var(--glass-border)]">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-500 blur-3xl"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-emerald-400 blur-3xl"></div>
        </div>

        <div className="section-container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--glass-bg)] backdrop-blur-md mb-8 border border-[var(--glass-border)] animate-fade-in text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
            <span className="text-sm font-medium tracking-wide">GPSSB Exam 2026-27 Preparation</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight animate-slide-up">
            Master the <span className="text-accent">Gram Sevak</span> Exam
          </h1>

          <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Your ultimate companion for Gujarat Gram Sevak and VSO exams. Comprehensive notes, mock quizzes, and previous year papers tailored to the GPSSB syllabus.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/notes" className="btn-primary text-lg px-8 py-4">
              Start Reading Notes
            </Link>
            <Link to="/quiz" className="btn-outline text-lg px-8 py-4">
              Take Free Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#0b1120] -z-10"></div>
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Everything You Need to Succeed</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We have compiled the best resources to make your preparation strategy simple, focused, and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="card p-8 flex flex-col items-start animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{feature.title}</h3>
                <p className="text-gray-400 mb-6 flex-grow">{feature.desc}</p>
                <Link
                  to={feature.link}
                  className="font-semibold text-primary-400 hover:text-primary-300 inline-flex items-center gap-1 group"
                >
                  Explore Now
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#0f172a] -z-10"></div>
        <div className="section-container">
          <div className="bg-gradient-to-br from-[#064e3b] to-[#022c22] border border-primary-500/30 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-glass-gradient opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Ready to crack the exam?</h2>
              <p className="text-primary-100 mb-8 max-w-2xl mx-auto text-lg">
                Join thousands of aspirants preparing for Gujarat government jobs. Track your progress, save your scores, and stay ahead.
              </p>
              <Link to="/login" className="btn-primary px-10 py-4 text-lg shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
