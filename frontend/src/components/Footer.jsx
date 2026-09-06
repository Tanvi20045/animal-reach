import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-pine text-paper mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <span className="font-display text-2xl font-semibold">Animal Reach</span>
          <p className="mt-3 max-w-sm text-paper/70 font-body text-sm leading-relaxed">
            A community network that turns a passer-by's phone camera into the first step
            of a rescue — connecting street animals with the people who can help them.
          </p>
        </div>
        <div>
          <h4 className="font-body font-semibold text-sm uppercase tracking-wide text-paper/50">Get involved</h4>
          <ul className="mt-4 space-y-2 font-body text-sm text-paper/80">
            <li><Link to="/report" className="hover:text-mustard">Report an animal</Link></li>
            <li><Link to="/adopt" className="hover:text-mustard">Adopt</Link></li>
            <li><Link to="/rescue" className="hover:text-mustard">Request a rescue</Link></li>
            <li><Link to="/volunteer" className="hover:text-mustard">Volunteer</Link></li>
            <li><Link to="/donate" className="hover:text-mustard">Donate</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-body font-semibold text-sm uppercase tracking-wide text-paper/50">Emergency</h4>
          <p className="mt-4 font-body text-sm text-paper/80 leading-relaxed">
            If an animal is in immediate danger, call your local animal control or vet
            emergency line before filing a report here.
          </p>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row justify-between gap-2 font-body text-xs text-paper/50">
          <span>© {new Date().getFullYear()} Animal Reach. Built for street animals everywhere.</span>
          <span>Made with care, one report at a time.</span>
        </div>
      </div>
    </footer>
  );
}
