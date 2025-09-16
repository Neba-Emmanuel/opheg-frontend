const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-8">
      <div className="container mx-auto px-4 py-6 grid grid-cols-3 items-center text-sm text-muted-foreground">
        {/* Left empty (for balance) */}
        <div></div>

        {/* Centered copyright */}
        <div className="text-center">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-primary">OPHEG</span>. All rights
          reserved.
        </div>

        {/* Right link */}
        <div className="flex justify-end">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Visit Website
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
