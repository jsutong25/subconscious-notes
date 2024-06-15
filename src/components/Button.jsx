const Button = ({ className, href, onClick, children, px, py }) => {
  const classes = `button bg-color-1 rounded-full text-color-1 border-[5px] border-[#ADEEF2] transition-colors hover:bg-blue-300 hover:border-blue-300 ${ px || "px-3" } ${ py || "py-1" } ${className || ""}`;

  const spanClasses = "relative z-10";

  const renderButton = () => (
    <button className={classes} onClick={onClick}>
      <span className={spanClasses}>{children}</span>
    </button>
  );

  const renderLink = () => (
    <a href={href} className={classes}>
      <span className={spanClasses}>{children}</span>
    </a>
  );

  return href ? renderLink() : renderButton();
};

export default Button;
