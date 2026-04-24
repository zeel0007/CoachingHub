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
      color: 'bg-emerald-100 text-emerald-800'
    },
    {
      title: 'MCQ Practice Quiz',
      desc: 'Test your knowledge with chapter-wise quizzes and track your score.',
      icon: <CheckCircle className="w-8 h-8" />,
      link: '/quiz',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Previous Year Papers',
      desc: 'Download GPSSB Gram Sevak original questions papers from past exams.',
      icon: <FileText className="w-8 h-8" />,
      link: '/pyqs',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      title: 'Govt Job Updates',
      desc: 'Get the latest notifications for Gujarat Panchayat and State Service jobs.',
      icon: <Bell className="w-8 h-8" />,
      link: '/jobs',
      color: 'bg-amber-100 text-amber-800'
    }
  ];

  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section className="relative bg-hero-gradient text-white py-20 lg:py-32 overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-accent blur-3xl"></div>
        </div>

        <div className="section-container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md mb-8 border border-white/20 animate-fade-in text-white">
            <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
            <span className="text-sm font-medium tracking-wide">GPSSB Exam 2024-25 Preparation</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight animate-slide-up">
            Master the <span className="text-accent">Gram Sevak</span> Exam
          </h1>
          
          <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Your ultimate companion for Gujarat Gram Sevak and VSO exams. Comprehensive notes, mock quizzes, and previous year papers tailored to the GPSSB syllabus.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/notes" className="btn-primary bg-white text-primary-800 hover:bg-gray-50 text-lg px-8 py-4">
              Start Reading Notes
            </Link>
            <Link to="/quiz" className="btn-outline border-white text-white hover:bg-white/10 text-lg px-8 py-4">
              Take Free Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Everything You Need to Succeed</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We have compiled the best resources to make your preparation strategy simple, focused, and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="card p-8 flex flex-col items-start bg-white animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{feature.desc}</p>
                <Link 
                  to={feature.link} 
                  className="font-semibold text-primary-600 hover:text-primary-800 inline-flex items-center gap-1 group"
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
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="section-container">
          <div className="bg-primary-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-card-gradient"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to crack the exam?</h2>
              <p className="text-primary-200 mb-8 max-w-2xl mx-auto">
                Join thousands of aspirants preparing for Gujarat government jobs. Track your progress, save your scores, and stay ahead.
              </p>
              <Link to="/login" className="btn-primary bg-accent text-primary-900 hover:bg-accent-light px-8 py-3 text-lg border-none shadow-lg shadow-accent/20">
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
