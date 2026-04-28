import { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: "Careers | Build the Future of Industrial Automation",
  description: "Join an elite team of engineers, architects, and consultants at Prixgen. Current openings for Senior Python/Odoo Developers and Functional Consultants in Mysuru.",
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-prixgen-gray/30">
      {/* Header */}
      <section className="bg-prixgen-blue text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Build the Future of <span className="text-prixgen-lightblue">Industrial Automation.</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Join an elite team of engineers, architects, and consultants. We are currently seeking Senior Python/Odoo Developers, Project Managers, and Functional Consultants based in Mysuru.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Open Positions */}
        <div className="lg:col-span-2 space-y-12">
          <h2 className="text-3xl font-bold text-prixgen-blue border-b border-prixgen-gray pb-4">Current Openings</h2>
          
          {[
            { title: 'Senior Python/Odoo Developer', type: 'Full-time', location: 'Mysuru', team: 'Engineering' },
            { title: 'Functional Consultant (ERP)', type: 'Full-time', location: 'Mysuru', team: 'Consulting' },
            { title: 'Technical Project Manager', type: 'Full-time', location: 'Mysuru', team: 'Project Management' },
          ].map((job) => (
            <div key={job.title} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-prixgen-gray flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
              <div>
                <div className="text-sm font-bold text-prixgen-lightblue uppercase tracking-widest mb-1">{job.team}</div>
                <h3 className="text-2xl font-bold text-prixgen-blue mb-2 group-hover:text-prixgen-lightblue transition-colors">{job.title}</h3>
                <div className="flex gap-4 text-sm text-prixgen-dark/60">
                  <span>📍 {job.location}</span>
                  <span>🕒 {job.type}</span>
                </div>
              </div>
              <Button variant="outline" className="border-prixgen-blue text-prixgen-blue hover:bg-prixgen-blue hover:text-white px-8 h-12">
                Apply Now
              </Button>
            </div>
          ))}
        </div>

        {/* Quick Application */}
        <div className="lg:col-span-1">
          <div className="bg-white p-10 rounded-3xl shadow-2xl border border-prixgen-gray sticky top-24">
            <h3 className="text-2xl font-bold mb-6 text-prixgen-blue">Direct Application</h3>
            <p className="text-sm text-prixgen-dark/60 mb-8">
              Submit your resume for priority consideration.
            </p>
            <form className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-prixgen-dark/40">Full Name</label>
                <input type="text" className="w-full p-4 bg-prixgen-gray/50 rounded-xl border-none focus:ring-2 focus:ring-prixgen-blue transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-prixgen-dark/40">Email Address</label>
                <input type="email" className="w-full p-4 bg-prixgen-gray/50 rounded-xl border-none focus:ring-2 focus:ring-prixgen-blue transition-all" placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-prixgen-dark/40">Resume (PDF)</label>
                <div className="relative group cursor-pointer">
                  <div className="w-full p-8 border-2 border-dashed border-prixgen-gray rounded-xl group-hover:border-prixgen-blue transition-colors flex flex-col items-center justify-center text-prixgen-dark/40 group-hover:text-prixgen-blue">
                    <span className="text-3xl mb-2">📄</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Click to upload</span>
                  </div>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf" />
                </div>
              </div>
              <Button className="w-full py-7 text-lg rounded-xl shadow-lg shadow-prixgen-blue/20">Submit Resume</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
