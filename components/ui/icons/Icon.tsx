export interface IIconProps {
  fill?: string;
  width: number;
  height: number;
  viewBox: string;
  component: React.FC<{ fill?: string }>;
  componentProps?: any;
}

const Icon = ({
  fill,
  width,
  height,
  viewBox,
  component: Component,
  componentProps,
}: IIconProps) => {
  return (
    <svg
      fill={fill}
      width={width}
      height={height}
      viewBox={`0 0 ${viewBox}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Component fill={fill} {...componentProps} />
    </svg>
  );
};

export default Icon;
