import { Trophy, Award, Star } from "lucide-react";

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 px-4 bg-dark">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-12">
          <Trophy className="w-5 h-5 text-primary" />
          <h2 className="text-3xl font-bold text-white">Achievements</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-dark-light p-8 rounded-xl border border-primary/10">
            <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Hackathon Winner
            </h3>
            <p className="text-white/70">
              First place at the Regional Level Hackathon - Websprint'25 for
              developing an innovative website.
            </p>
          </div>

          <div className="bg-dark-light p-8 rounded-xl border border-primary/10">
            <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Microsoft Certificate of Completion
            </h3>
            <p className="text-white/70">
              Career Essentials in Software Development by Microsoft and
              LinkedIn
            </p>
          </div>

          {/* <div className="bg-dark-light p-8 rounded-xl border border-primary/10">
            <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Top Open Source Contributor
            </h3>
            <p className="text-white/70">
              Recognized among top 100 contributors to React.js ecosystem with
              multiple accepted PRs.
            </p>
          </div>

          <div className="bg-dark-light p-8 rounded-xl border border-primary/10">
            <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Best Tech Blog Award
            </h3>
            <p className="text-white/70">
              Awarded for outstanding technical content creation and education
              in web development.
            </p>
          </div>

          <div className="bg-dark-light p-8 rounded-xl border border-primary/10">
            <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Featured Developer
            </h3>
            <p className="text-white/70">
              Featured as an exemplary developer by GitHub in their annual
              developer spotlight.
            </p>
          </div>

          <div className="bg-dark-light p-8 rounded-xl border border-primary/10">
            <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              5-Star Freelancer
            </h3>
            <p className="text-white/70">
              Maintained perfect 5-star rating across 50+ client projects on
              Upwork and Fiverr.
            </p>
          </div>  */}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
