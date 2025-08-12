const SiteFooter = () => {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container grid gap-6 py-10 md:grid-cols-3">
        <div>
          <h3 className="display-title text-xl">Optimum Health Global (OPHEG)</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Motto: Clean health · Clean society.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Founded: 22 November 2022
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Head Office</h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Kumba, Meme Division, Southwest Region, Cameroon.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Get Involved</h4>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            <li><a href="#objectives" className="hover:text-foreground">Our Objectives</a></li>
            <li><a href="#values" className="hover:text-foreground">Our Values</a></li>
            <li><a href="/appointments" className="hover:text-foreground">Book an Appointment</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Optimum Health Global (OPHEG). All rights reserved.
      </div>
    </footer>
  );
};

export default SiteFooter;
