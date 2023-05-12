import { ISvgIcon } from "./StrengthIcon";

const EnduranceIcon: React.FC<ISvgIcon> = ({
  fill = "#333333",
  width,
  height,
}) => {
  return (
    <svg
      fill={fill}
      width={width}
      height={height}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <polygon
          id="XMLID_6_"
          points="170.5,182.3 183.4,193.2 205.8,166.8 179.4,144.4 168.4,157.3 	"
        />
        <polygon
          id="XMLID_5_"
          points="244.2,199.1 194.5,199 194.4,249.7 228.3,249.7 244.2,232.5 	"
        />
        <polygon
          id="XMLID_4_"
          points="154.4,252.4 171.2,247.4 156.1,196.8 120.2,207.5 113.2,237.7 	"
        />
        <path
          id="XMLID_3_"
          d="M119.8,30.8C80.9,8,60.5,7.3,25.2,3.2l-1.3,6.6C67.8,20,78.9,30.3,109,48.6l4.2,19.9L13.6,232.6
		c-1,2-1.6,4.1-1.6,6.5c-0.1,8.1,6.3,14.8,14.4,14.9c5.3,0.1,10-2.7,12.7-6.9l98-160.3l39.9,25.5l20.5-33.8L119.8,30.8"
        />
      </g>
    </svg>
  );
};

export default EnduranceIcon;
