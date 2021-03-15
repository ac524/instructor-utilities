export const RangeInput = ({
    id,
    name,
    value,
    color,
    light,
    size,
    ...props
  }) => {
    if (!id) id = `slider-${name}`;
  
    const classes = ["slider has-output is-fullwidth m-0"];
  
    if (color) classes.push(`is-${color}`);
    if (light) classes.push("is-light");
    if (size) classes.push(`is-${size}`);
  
    return (
      <div>
        <input
          id={id}
          className={classes.join(" ")}
          type='range'
          name={name}
          value={value || 0}
          {...props}
        />
        <output htmlFor={id}>{value}</output>
      </div>
    );
  };